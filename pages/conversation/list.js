const utils = require('../utils/utils');
const RequestApi=require('../servers/request.js')
const {globalData} = getApp();
const {Service: {Status, Conversation}} = globalData;
const requestUserAuth = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: function (res) {
        resolve(!!res.authSetting['scope.userInfo'])
      },
      fail: function (error) {
        console.log(error);
        reject(error)
      }
    })
  });
};

const watchConversation = (context) => {
  Conversation.watch((conversationList) => {
    context.setData({
      conversationList
    });
    console.log(conversationList)
  });
};

const watchStatus = (token) => {
 Status.watch((status) => {
   if (status == 3) {
     wx.getUserInfo({
       success: (user) => {
         console.log("token",token)
         Status.connect(user.userInfo,token);
       }
     });
   }
 })
}

const connect = (context) => {
  watchConversation(context);
  watchStatus(context.token);
  wx.getUserInfo({
    success: (user) => {
      // console.log(user.userInfo)
      let userData={
        nickname: user.userInfo.nickName,
        portrait: user.userInfo.avatarUrl,
        mobile: 17611410018,
        openid: '123'
      }
      // console.log('userData', userData)
      let newInfo = user.userInfo
  
      getUserToken(userData).then((res)=>{
          // console.log("token的值为",res)
        // newInfo.token =res
        context.token=res
        getConversationList(context.token).then((res)=>{
          console.log(res)
        })
        Status.connect(newInfo, context.token).then(() => {
          console.log('connect successfully');
        }, (error) => {
          console.log("connectError", error)
          // wx.showToast({
          //   title: "error",
          //   icon: 'none',
          //   duration: 3000
          // })
        })
      })
      console.log('newInfo', newInfo)
  
    },
    fail: (error) => {
      console.log(error);
      wx.showToast({
        title: '换个网络试试，只能帮你到这了～',
        icon: 'none',
        duration: 3000
      })
    }
  })
};
// liuxin 2019 5.13changed
const getUserToken=(data)=>{
  return new Promise(function(resolve,reject){
    RequestApi.default('POST', 'chatssh', '/chat/get_user_info', data).then(res => {
      // console.log(res.code)
      if (res.code == 200) {
        let token = res.data.token
        wx.setStorage({
          key: 'token',
          data: token,
          success: (res) => {
            console.log(res)
          }
        })
        resolve(token)
      }
    }).catch((error)=>{
      reject(error)
    })
  })
}
const getConversationList=(token)=>{
  return new Promise(function(resolve,reject){
    RequestApi.default('POST', 'chatssh', '/chat_customer/pro_chat_list', { token: token }).then(res => {
      console.log(res.code)
      if (res.code == 200) {
        // console.log(res.data)
        resolve(res.data)
      }
    }).catch((error) => {
        reject(error)
    })  
  })
}
//change End
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserAuth: true,
    conversationList: [],
    token:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestUserAuth().then((hasUserAuth) => {
      this.setData({
        hasUserAuth
      });
      if (hasUserAuth){
        connect(this);
      }
    });
  },
  onAuthCompleted: function(user){
    requestUserAuth().then((hasUserAuth) => {
      this.setData({
        hasUserAuth
      });
      if (hasUserAuth) {
        connect(this);
      }
    });
  },
  gotoChat: function(event){
    let { currentTarget: { dataset: { item } } } = event;
    let { conversationType: type, targetId, target } = item;
    
    let isSame = (conversation, another) => {
      let isSaveType = (conversation.conversationType == another.conversationType);
      let isSaveTarget = (conversation.targetId == another.targetId);
      return (isSaveType && isSaveTarget);
    };

    let url = './chat?type={type}&targetId={targetId}&title={title}';
    url = utils.tplEngine(url, {
      type,
      targetId,
      title: target.name
    });
    wx.navigateTo({
      url: url,
    });

    let { conversationList} = this.data;
    
    utils.map(conversationList, (conversation) => {
      if (isSame(conversation, item)){
        conversation.unReadCount = 0;
      }
      return conversation
    });
    Conversation.clearUnreadCount(item);

    this.setData({
      conversationList
    });
    
  }
})