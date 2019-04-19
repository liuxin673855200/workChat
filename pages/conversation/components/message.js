// pages/conversation/components/message.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    message: Object
  },
  relations: {
    './message/image': {
      type: 'child'
    },
    './message/text': {
      type: 'child'
    },
    './message/voice': {
      type: 'child'
    },
     './message/card': {
      type: 'child'
    },
    './message/map': {
      type: 'child'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlayVoice: function (event) {
      this.triggerEvent('onplay', event.detail)
    },
    onPlayMusic: function(event){
      this.triggerEvent('onplaymusic', event.detail)
    },
    onMusicStop: function (event){
      this.triggerEvent('onmusicstop', event.detail)
    },
    onPreviewImage: function(event){
      let {detail} = event;
      this.triggerEvent('onpreviewimage', detail);
    },
    toOtherPage:function(event){
      console.log("message.js")
      this.triggerEvent('tootherpage', event.detail)
    },
    opemMap:function(event){
      console.log("message.js")
      this.triggerEvent('opemMap', event.detail)
    }
  }
})
