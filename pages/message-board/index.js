// pages/message-board/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesgVal: '',
    loadingMoreHidden: true,
    noDataHidden: true,
    messagesListData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
    this.page = 1;
    this.totalPage = 1;
  },

  requestData: function(){
    let that = this;
    let params = {
      pageIndex: this.page,
      sizePerPage: 10
    };

    wx.showLoading();

    wx.request({
      url: app.globalData.api + 'messageBoard/list.json',
      method: 'POST',
      data: params,
      success: function (res) {
        wx.hideLoading();
        if (res.data.recordCount) {
          that.totalPage = res.data.totalPage;

          that.data.messagesListData = that.data.messagesListData.concat(res.data.items);

          that.setData({
            loadingMoreHidden: true,
            noDataHidden: true,
            messagesListData: that.data.messagesListData
          });
        } else {
          that.setData({
            loadingMoreHidden: true,
            noDataHidden: false
          });
        }
      }
    })
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
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      method: 'POST',
      data: {
        wxUserNickName: JSON.parse(app.globalData.useInfo).nickName,
        wxUserOpenId: app.globalData.code,
        content: that.data.mesgVal
      },
      success: function(res) {
        wx.showToast({
          title: '留言成功'
        });

        that.requestData();

        that.setData({
          mesgVal: ''
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