// pages/conversation/components/message/other.js
Component({
  /**
    * 组件的属性列表
    */
  properties: {
    message: Object,
    
  },

  /**
   * 页面的初始数据
   */
  data: {
    cardType: 3,
    title:"【维修单】",
    carNumber:"苏A12348",
    carPic:""
  },
  methods:{
    toOtherView: function(event) {
      // console.log("1")
      console.log(this.data.cardType) 
      this.triggerEvent('tootherpage', { "msg": "跳转页面" })
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