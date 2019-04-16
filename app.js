const Config = require('./config.js');
const Service = require('./pages/services.js')(Config);

App({
  onLaunch: function () {
  },
  globalData: {
    Service: Service,
    carUrl: 'https://s.chedianzhang.com/applet_api/applet_api/',
    //carUrl: 'https://inflexion.icarzoo.com/applet_api/applet_api/',
    state: true,
  },
  onShow: function () {
  },
  onUnload: function () {
  },
  onHide: function () {
  }
})
