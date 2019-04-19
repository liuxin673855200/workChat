// pages/login/login.js
const appData = getApp().globalData;
const baseUrl = getApp().globalData.carUrl;
const appState = getApp().globalData.state;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  wxLocal1 () {
    const requestTask = wx.request({
      url: 'https://lingyouhui.vip/main/v1/tb_tbk/optional',
      data: {
        q: '钢铁',
        platform: '2',
        adzone_id: 'A001',
        has_coupon: 'true',
        page_no: '1',
        page_size: '10'
      },
      header: {
        'content-type': 'application/json',
        'token': '!tokens1'
      },
      success(res) {
        console.log(res.data)
      }
    })
    requestTask.onHeadersReceived((headers) => {
      headers.header.text = '头部测试文本';
      
      console.log(headers)
      return headers;
    }) // 取消请求任务
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     console.log('位置', res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })
  },
  wxLocal2 () {
    wx.chooseLocation({
      success(res) {
        console.log('位置', res)

      }
    })

  },
  wxLocal3 () {
    wx.openLocation({

      latitude: 22.53332,
      
      longitude: 113.93041,
      
      })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  bindgetphonenumber: function (e) {
    console.log('e:',e)
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: res => {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: baseUrl + 'get_decrypt_data_signin',
            data: {
              iv: e.detail.iv,
              session_key: appData.sessionKey,
              encryptedData: e.detail.encryptedData
            },
            success: res => {
              console.log('res:',res);
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
      })
    }
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