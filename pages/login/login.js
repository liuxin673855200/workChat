// pages/login/login.js
const appData = getApp().globalData;
const baseUrl = getApp().globalData.carUrl;
const appState = getApp().globalData.state;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {

  },  
  methods:{
    bindgetphonenumber(e) {
      console.log(e)
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        wx.showLoading({
          title: '加载中',
        })
        console.log(1)
        wx.request({
          url: baseUrl + 'get_decrypt_data_signin',
          data: {
            iv: e.detail.iv,
            session_key: appData.sessionKey,
            encryptedData: e.detail.encryptedData
          },
          success: res => {
            console.log(res);
            let tel = res.data.data.phoneNumber;
            if (res.data.msg == "成功") {
              wx.request({
                method: "POST",
                url: baseUrl + 'add_mobile',
                data: {
                  mobile: tel,
                  open_id: appData.openId
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值  
                },
                success: (res) => {
                  wx.setStorageSync('phone', tel);
                  this.setData({
                    listT: false,
                    listO: true,
                    phone: tel
                  })
                  this.getData()
                },
                fail: (res) => {
                  console.log(2)
                }
              })

            }
          }
        })
      }
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})