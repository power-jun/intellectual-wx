// pages/message-board/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesgVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  submitMsg: function() {
    let that = this;
    if (!this.data.mesgVal) {
      wx.showToast({
        title: '请输入留言',
        icon: 'none'
      });
      return;
    }

    wx.request({
      url: app.globalData.api + 'messageBoard/add.json',
      method: 'POST',
      data: {
        wxUserNickName: JSON.parse(app.globalData.useInfo).nickName,
        wxUserOpenId: app.globalData.code,
        content: that.data.mesgVal
      },
      success: function(res) {
        debugger
        wx.showToast({
          title: res.meg
        });
      }
    });
  },

  msgInput: function(e) {
    let val = e.detail.value;
    this.setData({
      mesgVal: val
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})