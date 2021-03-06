const utils = require('../utils/utils.js');
const { adapterHeight } = utils.getAdapterheight();

const { globalData } = getApp();
const { Service: { Status, Message, File } } = globalData;

const RongEmoji = require('../lib/RongIMEmoji-2.2.6.js');
RongEmoji.init();

const softKeyboardHeight = 210;

const getToView = (context) => {
  let { messageList } = context.data;

  let index = messageList.length - 1;
  let message = messageList[index] || {};
  return message.uId || '';
};

const setKeyboardPos = (context, keyboardHeight, adapterHeight) => {
  keyboardHeight = keyboardHeight || 0;
  let data;
  let isScroll = (keyboardHeight > 0);
  if (isScroll){
    data = {
      bottom: adapterHeight + keyboardHeight,
      isShowEmojiSent: false,
      toView: getToView(context)
    };
  }else{
    data = {
      bottom: adapterHeight + keyboardHeight,
      isShowEmojiSent: false
    };
  }
  context.setData(data);
};

const showSoftKeyboard = (context, display) => {
  context.setData({
    display: display,
    bottom: softKeyboardHeight,
    isShowKeyboard: false,
    toView: getToView(context)
  });
};
const hideSoftKeyboard = (context) => {
  context.setData({
    display: {
      emoji: 'none',
      more: 'none'
    }
  });
};

const hideKeyboard = (context) => {
  let keyboardHeight = 0;
  let { adapterHeight } = context.data;
  setKeyboardPos(context, keyboardHeight, adapterHeight);
  hideSoftKeyboard(context);
};

const formatEmojis = () => {
  let list = RongEmoji.list;
  return utils.sliceArray(list, {size: 24});
};

const getMessageList = (context, params) => {
  let {position} = params;
  return Message.getList(params).then((result) => {
    let messages = result.messageList;
    let hasMore = result.hasMore;

    let { messageList, playingVoice, playingMusicComponent} = context.data;
    messageList = messages.concat(messageList);
    let toView = '';
    if(params.position == 0){
      let index = messageList.length - 1;
      let message = messageList[index] || {};
      toView = message.uId || '';
    }
    let isFirst = (position == 0);
    if (!hasMore && !isFirst){
      // 灰条提示
      toView = 'message-notify-without';
      context.setData({
        hasMore: hasMore
      });
    }

    if(isFirst){
      context.setData({
        messageList: messageList,
        isAllowScroll: true,
        toView: toView
      });
    }else{
      context.setData({
        messageList: messageList,
        isAllowScroll: true
      });
    } 
    
  });
};

const updatePlayStatus = (context, { newMusicComponent, isPlaying}, callback) => {
  let { data: { messageList, playingMusicComponent} } = context;
  callback = callback || utils.noop;
  messageList.map((message) => {
    callback(message);
    return message;
  });
  if (playingMusicComponent) {
    playingMusicComponent.setData({
      isPlaying
    });
  }
  if (newMusicComponent){
    context.setData({
      playingMusicComponent: newMusicComponent,
      messageList
    });
  }else{
    context.setData({
      messageList
    });
  }
  
};

const stopPlayMusic = (context) => {
  let newMusicComponent = null, isPlaying = false;
  updatePlayStatus(context, { newMusicComponent, isPlaying }, (message) => {
    utils.extend(message, { isPlaying });
  });
};

const getImageUrls = (context) => {
  let {messageList} = context.data;
  return messageList.filter(message => {
    return message.name == 'ImageMessage';
  }).map(message => {
    return message.content.imageUri;
  });
};

const onLoad = (context, query) => {
  let { title, type, targetId } = query;
  wx.setNavigationBarTitle({
    title
  });
  context.setData({
    adapterHeight: adapterHeight,
    type,
    targetId
  });
  let keyboardHeight = 0;
  setKeyboardPos(context, keyboardHeight, adapterHeight);

  let position = 0;
  let count = 15;
  getMessageList(context, { type, targetId, position, count });

  Message.watch((message) => {
    let { messageList } = context.data;
    messageList.push(message);
    context.setData({
      messageList,
      toView: message.uId
    });
  });
};

const onUnload = (context) => {
  let { playingVoice, playingMusicComponent } = context.data;
  if (playingVoice) {
    playingMusicComponent.stop();
  }
  if (playingMusicComponent) {
    playingMusicComponent.stop();
  }
};

const showVoice = (context) => {
  let { adapterHeight } = context.data;
  context.setData({
    isShowKeyboard: false
  });
  hideKeyboard(context);
};

const showKeyboard = (context) => {
  context.setData({
    isShowKeyboard: true
  });
  hideKeyboard(context);
};

const recorderManager = wx.getRecorderManager()

const startRecording = (context) => {
  context.setData({
    isRecording: true
  });
  let record = () => {
    recorderManager.start({
      format: 'mp3'
    });
  };
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.record']) {
        wx.authorize({
          scope: 'scope.record',
          success: record
        })
      } else {
        record();
      }
    }
  })
};

const stopRecording = (context) => {
  context.setData({
    isRecording: false
  });
  recorderManager.onStop((res) => {
    console.log('recorder stop', res)
    const { tempFilePath, duration } = res
    File.upload({
      path: tempFilePath
    }).then(file => {
      console.log(file)
      let content = {
        content: file.downloadUrl,
        duration: Math.ceil(duration / 1000)
      };
      let { type, targetId, messageList } = context.data;
      Message.sendVoice({
        type,
        targetId,
        content
      }).then(message => {
        messageList.push(message);
        context.setData({
          messageList,
          toView: message.uId
        });
      });
    });
  })
  recorderManager.stop();
};

const showEmojis = (context) => {
  showSoftKeyboard(context, {
    emoji: 'block',
    more: 'none'
  });
};

const showMore = (context) => {
  showSoftKeyboard(context, {
    emoji: 'none',
    more: 'block'
  });
};

const selectEmoji = (context, event) => {
  var content = context.data.content;
  var { emoji } = event.target.dataset;
  content = content + emoji;
  context.setData({
    content: content,
    isShowEmojiSent: true
  });
};

const sendText = (context) => {
  let { content, type, targetId, messageList } = context.data;
  context.setData({
    content: '',
    isShowEmojiSent: false
  });
  if (content.length == 0) {
    return;
  }
  Message.sendText({
    type,
    targetId,
    content
  }).then(message => {
    messageList.push(message);
    context.setData({
      messageList,
      toView: message.uId
    });
  });
};

const getMoreMessages = (context) => {
  let { type, targetId, hasMore } = context.data;
  let position = null;
  let count = 5;
  if (hasMore) {
    context.setData({
      isAllowScroll: false
    });
    getMessageList(context, { type, targetId, position, count });
  }
};

const sendImage =  (context) => {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      let { tempFilePaths } = res;
      let tempFilePath = tempFilePaths[0];
      wx.getImageInfo({
        src: tempFilePath,
        success: (res) => {
          let extra = utils.compress(res);
          let { type, targetId, messageList } = context.data;

          let name = 'ImageMessage';
          let content = {
            imageUri: tempFilePath,
            extra
          };
          let message = Message.create({
            type,
            targetId,
            name,
            content
          });

          messageList.push(message);
          context.setData({
            messageList,
            toView: message.uId
          });

          File.upload({
            path: tempFilePath
          }).then(result => {
            let { downloadUrl: imageUri } = result;
            Message.sendImage({
              type,
              targetId,
              imageUri,
              extra
            }).then(message => {
            });
          });
        }
      })
    }
  })
};

const sendMusic = (context) => {
  console.log(context.data)
  let { content, type, targetId, messageList } = context.data;
  Message.sendMusic({
    type,
    targetId
  }).then(message => {
    messageList.push(message);
    context.setData({
      messageList,
      toView: message.uId
    });
  });
};

const playVoice = (context, event) => {
  let voiceComponent = event.detail;
  let { playingVoice } = context.data;
  if (playingVoice) {
    let playingId = playingVoice.__wxExparserNodeId__;
    let voiceId = voiceComponent.__wxExparserNodeId__;
    // 两次播放为同个音频，状态保持不变
    if (playingId == voiceId) {
      return;
    }
    let { innerAudioContext } = playingVoice.data;
    playingVoice.setData({
      isPlaying: false
    });
    innerAudioContext.stop();
  }
  context.setData({
    playingVoice: voiceComponent
  });
};

const playMusic = (context, event) => {
  let newMusicComponent = event.detail;
  let { playingMusicComponent, messageList } = context.data;
  let { properties: { message: { messageUId: newPlayId } } } = newMusicComponent
  let playingId = '';

  // 连续点击播放不同音乐
  if (playingMusicComponent) {
    let { properties: { message } } = playingMusicComponent;
    playingId = message.messageUId;
    //先停止上一个，再播放
    let isDiffMusic = (playingId != newPlayId);
    if (isDiffMusic) {
      let { innerAudioContext } = playingMusicComponent.data;
      playingMusicComponent.setData({
        isPlaying: false
      });
      innerAudioContext.stop();
    }
  }
  let isPlaying = false;
  updatePlayStatus(context, { newMusicComponent, isPlaying }, (message) => {
    let { messageUId } = message;
    // 默认为未播放状态
    isPlaying = false;
    if (messageUId == newPlayId) {
      isPlaying = true;
    }
    utils.extend(message, { isPlaying });
  });
};

const previewImage = (context, event) => {
  let currentImageUrl = event.detail;
  let urls = getImageUrls(context);
  if (utils.isEmpty(urls)) {
    urls.push(currentImageUrl);
  }
  wx.previewImage({
    current: currentImageUrl,
    urls: urls
  })
};

const stopMusic = (context, event) => {
  let musicComponent = event.detail;
  let { properties: { message: { messageUId } } } = musicComponent;

  let { messageList, playingMusicComponent } = context.data;
  if (playingMusicComponent) {
    let { data: { innerAudioContext } } = playingMusicComponent;
    innerAudioContext.stop();
  }
  musicComponent.setData({
    isPlaying: false
  });
  stopPlayMusic(context);
};

Page({
  data: {
    content: '',
    messageList: [],
    bottom: 0,
    adapterHeight: 0,
    display: {
      emoji: 'none',
      more: 'none'
    },
    emojis: formatEmojis(),
    isShowEmojiSent: false,
    isRecording: false,
    isShowKeyboard: false,
    hasMore: true,
    toView: '',
    playingVoice: null,
    playingMusicComponent: null,
    isAllowScroll: true,
    scrollTop: 0
  },
  hideKeyboard: function () {
    hideKeyboard(this);
  },
  selectEmoji: function (event) {
    selectEmoji(this, event);
  },
  sendText: function () {
    sendText(this);
  },
  getMoreMessages: function (event) {
    getMoreMessages(this);
  },
  sendImage: function () {
    sendImage(this);
  },
  sendMusic: function () {
    sendMusic(this);
  },
  showVoice: function(){
    showVoice(this);
  },
  showKeyboard: function(){
    showKeyboard(this);
  },
  startRecording: function(){
    startRecording(this);
  },
  stopRecording: function(){
    stopRecording(this);
  },
  showEmojis: function(){
    showEmojis(this);
  },
  showMore: function(){
    showMore(this);
  },
  // 以下是事件
  onLoad: function (query) {
    onLoad(this, query)

  },
  onReady:function(){
    console.log(this.data.messageList)
    var n = this.data.messageList.length;
    let otherMessage={
      content:{          url:"https://rongcloud-file.cn.ronghub.com/o_1chvbvdq7k…pQ8QscLxbNLehwhHySnX:94Vxq8iU9AKya7Wj1hkBW5uy4f8=", name: "My Heart Will Go On", author: "Céline Dion", poster: "https://rongcloud-image.cn.ronghub.com/FpNGSIJHoyx…DNvo3-sL_SO1fSUBKV3H:-H3FiDuwQ-gylVTi-nsQY9UdQf4=" },
conversationType:1,
      direction:"receiver",
extra:undefined,
isLocalMessage:undefined,
messageDirection :2,
messageId: "1_13334023",
messageType:"CardMessage",
messageUId:"BA19-LK4F-VAG7-24V8",
name:"CardMessage",
objectName :"seal:card",
offLineMessage :true,
pos :0,
receiptResponse : undefined,
receivedStatus :1,
receivedTime:1554971685653,
      sender: { name: "楚霸王", type: 1, token: "BjfDVKpFIT2i27xjGOqiwPdZTx7PdYUozREvTAnwRf9J3bvOZz…KR3HOQUIAYj4mK0J7Vr9B93xowypKpsaTNmACcCkEArZafw==", id: "FmkoLWc8R45zAocuB9JKNn", avatar: "https://rongcloud-image.cn.ronghub.com/o_1chv06qgdb3r1bo52sd14121kos2g.png?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:D8XdePuWt2l_ocWPOciTv23A0ZM=" },
senderUserId  : "FmkoLWc8R45zAocuB9JKNn",
sentStatus :undefined,
sentTime :1554713331506,
targetId: "RrG9ip8kykDX8Ucb54o6RF",
uId :"B9VG-HCEC-M1S5-J8RA",
    }
    console.log(n)
    let list = this.data.messageList
    list.push(otherMessage)
    console.log(list)
    this.setData({
      messageList: list
    },()=>{
      console.log(this.data.messageList[3])
    }
    )
  },
  onUnload: function () {
    onUnload(this);
  },
  onInput: function(event){
    this.setData({
      content: event.detail.value
    });
  },
  onFocus: function(event){
    let { height} = event.detail;
    let adapterHeight = 0;
    setKeyboardPos(this, height, adapterHeight);
    hideSoftKeyboard(this);
  },
  onPlayVoice: function(event){
    playVoice(this, event);
  },
  onPlayMusic: function (event){
    playMusic(this, event);
  },
  onMusicStop: function(event){
    stopMusic(this, event);
  },
  toOtherPage:function(event){
    console.log(event,"跳转页面")
  },  
  onPreviewImage: function(event){
    previewImage(this, event);
  },
  onHide: function(){
    hideKeyboard(this);
    stopPlayMusic(this);
  },
  // 4.15
  showPhoneNumber:function(){
    let phoneNumber ="17611410018";
        wx.showModal({
          title: '联系商家',
          content: phoneNumber,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.makePhoneCall({
                phoneNumber: phoneNumber// 仅为示例，并非真实的电话号码
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
  },
  showBanned:function(){
    var that=this;
    console.log(2);
    var  banList = ['解除禁言','禁言7天', '禁言15天', '禁言30天'];
    wx.showActionSheet({
      itemList: banList,
      success(res) {
        console.log(res.tapIndex)
      that.bannedOperatioin(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  bannedOperatioin:function(index){
    console.log(index);
  }
})