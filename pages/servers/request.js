import header from './header'
const baseUrl="api.chedianzhang.com"
/**
 * 创建活动 执行插入
 * @author liuxin
 * @param {String} type 请求类型
 * @param {String} path 接口路径
 * @param {Object} param 请求参数
 * @param {Boolen} hideLoading 是否隐藏loading  默认 0      不隐藏1
 * @param {Boolen} abort 是否废除接口  非必填
 * @return {Object} res  返回参数
 */
const request = (type = "GET",domain, path, param, hideLoading,abort) => {
  hideLoading=hideLoading||0;
  if(!hideLoading){
    wx.showLoading({
      title: '加载中',
    })
  }
  param = param || {};
  type=type.toUpperCase();

  let headers = header(type,path,param);

  switch(type)
    {
    case  'GET':
      break;
    case 'POST':
        break;
    default:
      console.warn("请求类型有误，请检查")
      return
    }
return new Promise(function(resolve,reject){
  let request = wx.request({
    url:'https://'+domain+baseUrl + path,
    data: param,
    header: headers,
    method: type,
    success: (res) => {
      wx.hideLoading()
      resolve(res.data)
    },
    error:(err)=>{
      if(!hideLoading){
        wx.hideLoading()
      }
      reject(err)
    }
})
if(abort){
  request.abort();
}

})

}

export default request
