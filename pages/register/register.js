//index.js
//获取应用实例
const appData = getApp().globalData;
const baseUrl = getApp().globalData.carUrl;
const appState = getApp().globalData.state;
Page({
 data:{
   uidState: true
 },
  onLoad: function () {
    let uid = wx.getStorageSync('unionid');
    if (uid == '') {
      this.setData({
        uidState: true && appState
      })
    } else {
      this.setData({
        uidState: false && appState
      })
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
        wx.getUserInfo({
          success: res => {
            console.log(res);
            // wx.setStorageSync('power', true)
            wx.request({
              url: baseUrl + 'register',
              method: "POST",
              data: {
                open_id: appData.openId,
                encryptedData: res.encryptedData,
                iv: res.iv,
                sessionKey: appData.sessionKey
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值  
              },
              success: res => {
                console.log(res)

                    wx.redirectTo({
                      url: '../login/login'
                    })
              },
              fail: res => {
                console.log(res);
              }
            })
          }
        })
    } else {
     // 用户按了拒绝按钮
      wx.showModal({
        title: '微信授权提醒',
        content: '小程序正常运行需要获取授权信息，请授权后放心使用',
        showCancel:false,
        confirmText:'知道了',
        confirmColor:'#6F85FF',
        success: res => {
          if(res.confirm){
            //this.onLoad()
          }
        }
      })
    }
  }
})
