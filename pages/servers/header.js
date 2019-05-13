import config from '../../config'

const cryptoJS = require('./crypto-js.min.js')
const appKey = config.appkey;
const appSecret = config.appSecret;
const accepts = config.accept;
console.log(appKey ,appSecret)
function get_signature(appKey, appSecret, stage, path, method, accept, content_type, timestamp, param, stream_data = '') {
  var method = method.toUpperCase();
  var content_md5 = '';
  var url = '';
  if (Object.keys(param).length > 0) {
    var str = '?';
    var arr = Object.keys(param).sort();
    for (var item in arr) {
      // console.log(item)
      str += arr[item];
      if (param[arr[item]]) {
        str += '=';
        str += param[arr[item]];
      }
      str += '&';
    }
    str = str.substr(0, str.length - 1);
    url = path + str;
  }else{
    url = path
  }

  if (stream_data != '' && !content_type.startsWith('application/x-www-form-urlencoded')) {
    var md5 = cryptoJS.MD5(stream_data);
    var content_md5 = md5.toString(cryptoJS.enc.Base64);
  }
  var headers = "\nX-Ca-Key" + ":" + appKey + "\n" + "X-Ca-Stage" + ":" + stage + "\n" + "X-Ca-Timestamp" + ":" + timestamp+"\n";
  // console.log('查看各个参数:', appKey, appSecret, stage, path, method, accept);
  var stringToSign = method + "\n" + accept + "\n" + content_md5 + "\n" + content_type + "\n" + headers + url
  // console.log('stringToSign为:',stringToSign);
  var hash = cryptoJS.HmacSHA256(stringToSign, appSecret);
  var sign = hash.toString(cryptoJS.enc.Base64);
  return sign;
}

function header(method, path, param) {
  var content_type = 'application/x-www-form-urlencoded; charset=UTF-8';
  var timestamp = (new Date()).getTime();
  var nonce = createUuid();
  var stage = 'RELEASE';
  var signature = get_signature(appKey, appSecret, stage, path, method, accepts, content_type, timestamp, param, '');
  var token=wx.getStorageSync('token')||"";
  return {
    "X-Ca-Timestamp": timestamp,
    "X-Ca-Key": appKey,
    "X-Ca-Stage": stage,
    "X-Ca-Nonce": nonce,
    "Content-Type": content_type,
    "X-Ca-Signature-Headers": "X-Ca-Key,X-Ca-Stage,X-Ca-Timestamp",
    "X-Ca-Signature": signature,
    "token":token
  }
}

function createUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default header

// module.exports = request
