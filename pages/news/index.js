// pages/modules-list/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingMoreHidden: true,
    noDataHidden: true,
    newListData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
    this.page = 1;
    this.totalPage = 1;
  },

  requestData() {
    let that = this;

    let params = {
      pageIndex: this.page,
      sizePerPage: 10
    };

    wx.showLoading();

    wx.request({
      url: app.globalData.api + 'news/list.json',
      method: 'POST',
      data: params,
      success: function (res) {
        wx.hideLoading();

        if (res.data.recordCount) {
          that.totalPage = res.data.totalPage;

          that.data.newListData = that.data.newListData.concat(res.data.items);
          that.setData({
            loadingMoreHidden: true,
            noDataHidden: true,
            newListData: that.data.newListData
          });

          wx.setStorage({
            key: 'newsList',
            data: that.data.newListData
          });
        } else {
          that.setData({
            loadingMoreHidden: true,
            noDataHidden: false
          });
        }
      }
    });
  },

  goDetails: function (e) {
    wx.navigateTo({
      url: '/pages/news-details/index?id=' + e.currentTarget.dataset.id + ''
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.page && (this.page >= this.totalPage) && this.totalPage != 0) {
      this.setData({
        loadingMoreHidden: false,
        noDataHidden: true
      })
      return;
    }

    this.page++;

    this.requestData();
  }
})