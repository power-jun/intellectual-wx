// pages/modules-list/index.js
let app = getApp();
let timer = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingMoreHidden: true,
    noDataHidden: true,
    newListData: [],
    hasRefesh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.page = 1;
    this.totalPage = 1;
    this.requestData();
  },

  requestData() {
    let that = this;

    let params = {
      pageIndex: this.page,
      sizePerPage: 10
    };

    if (!this.data.hasRefesh) {
      wx.showLoading();
    }

    wx.request({
      url: app.globalData.api + 'news/list.json',
      method: 'POST',
      data: params,
      success: function (res) {
        if (!that.data.hasRefesh) {
          wx.hideLoading();
        }

        if (res.data.items.length) {
          that.totalPage = res.data.totalPage;
          if (!that.data.hasRefesh) {
            that.data.newListData = that.data.newListData.concat(res.data.items);
          } else {
            that.data.newListData = res.data.items;
          }
          
          that.setData({
            loadingMoreHidden: true,
            noDataHidden: true,
            hasRefesh: false,
            newListData: that.data.newListData
          });

          wx.setStorage({
            key: 'newsList',
            data: that.data.newListData
          });
        } else {
          that.setData({
            loadingMoreHidden: true,
            hasRefesh: false,
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
  },

  onPullDownRefresh: function() {
    this.page=1;
    this.setData({
      hasRefesh: true
    });

    clearTimeout(timer);
    timer = setTimeout(() => {
      this.requestData();
    }, 500)
  }
})