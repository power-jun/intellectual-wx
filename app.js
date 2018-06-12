App({
  globalData: {
    version: "1.0.0",
    useInfo: {},
    api: 'https://www.zunshang001.cn/zscq/'
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    this.login();
  },

  login: function() {
    var that = this;
    wx.login({
      success: function (res) {
        that.globalData.code = res.code;
      }
    });

    wx.getUserInfo({
      success: function (res) {
        that.globalData.useInfo = JSON.parse(res.rawData);
      }
    });
  }
})
