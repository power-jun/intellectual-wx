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
    let modulesList = wx.getStorageSync('modulesList');

    let singleModules = modulesList.filter(function (v, k) {
      return v.id === id
    });


    this.setData({
      detailsData: singleModules[0]
    });

    let mername = '';
    
    if (type === 'copyright') {
      mername = '版权登记中心详情';
    } else if (type === 'court') {
      mername = '知识产权法院详情';
    } else if (type === 'lawyer') {
      mername = '知识产权律师详情';
    }

    wx.setNavigationBarTitle({
      title: mername
    });
  }
})