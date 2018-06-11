// pages/modules-details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let type = options.type;
    let modulesList = wx.getStorageSync('newsList');

    let singleModules = modulesList.filter(function (v, k) {
      return v.id === id
    });

    this.setData({
      detailsData: singleModules[0]
    });
  }
})