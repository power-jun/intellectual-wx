// pages/modules-list/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: "0",
    searchVal: '',
    creditagencyName: '城市',
    creditagency: [],
    creditagencyCode: '',
    creditagencyNameArry: [],
    creditagencyCodeArry: [],
    loadingMoreHidden: true,
    noDataHidden: true,
    mername: '',
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.type = options.type;
    this.page = 1;
    this.totalPage = 1;
    this.requestData(this.type);
    this.requestCityData();

    let mername = '';

    if (this.type === 'copyright') {
      mername = '版权登记';
    } else if (this.type === 'court') {
      mername = '知识产权法院';
    } else if (this.type === 'lawyer') {
      mername = '知识产权律所';
    }

    wx.setNavigationBarTitle({
      title: mername
    });
    this.setData({
      mername: mername
    });
  },

  requestCityData() {
    let that = this;

    wx.request({
      url: app.globalData.api + 'city/list.json',
      method: 'GET',
      success: function (res) {
        let datas = res.data.data;
        let creditagencyNameArry = [];
        let creditagencyCodeArry = [];
        creditagencyNameArry.push('城市');
        creditagencyCodeArry.push('');
        
        for (let i = 0, len = datas.length; i < len; i++) {
          creditagencyNameArry.push(datas[i].name);
          creditagencyCodeArry.push(datas[i].id);
        }

        that.setData({
          creditagency: datas,
          creditagencyNameArry: creditagencyNameArry,
          creditagencyCodeArry: creditagencyCodeArry
        });
      }
    })
  },

  requestData(type) {
    let that = this;
    let url = '';


    if (type === 'copyright') {
      url = app.globalData.api + 'copyright/list.json';
    } else if (type === 'court') {
      url = app.globalData.api + 'court/list.json';
    } else if (type === 'lawyer') {
      url = app.globalData.api + 'lawyer/list.json';
    }
 
    let params = {
      pageIndex: this.page,
      sizePerPage: 10,
      title: this.data.searchVal,
      cityId: this.data.creditagencyCode
    };

    wx.showLoading();
    wx.request({
      url: url,
      method: 'GET',
      data: params,
      success: function (res) {
        wx.hideLoading();
        if (res.data.items.length) {
          that.totalPage = res.data.totalPage;

          that.data.listData = that.data.listData.concat(res.data.items);

          that.setData({
            loadingMoreHidden: true,
            noDataHidden: true,
            listData: that.data.listData
          });

          wx.setStorage({
            key: 'modulesList',
            data: that.data.listData
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

  bindCityChange: function (event) {
    let index = event.detail.value;
    let creditagencyName = this.data.creditagencyNameArry[index];
    let creditagencyCode = this.data.creditagencyCodeArry[index];
    let currentCreditagency = this.data.creditagency.filter(function (v, n) {
      return v.id === creditagencyCode
    });

    this.setData({
      creditagencyName: creditagencyName,
      creditagencyCode: creditagencyCode,
      listData: []
    });
    
    this.setData({
      listData: []
    });

    this.page = 1;
    this.requestData(this.type);
  },

  toSearch: function () {
    this.setData({
      listData: []
    });

    this.page = 1;
    this.requestData(this.type);
  },

  goDetail: function(e) {
    wx.navigateTo({
      url: '/pages/modules-details/index?id=' + e.currentTarget.dataset.id + '&type=' + this.type + ''
    });
  },

  listenerSearchInput: function(e) {
    let val = e.detail.value;
    this.setData({
      searchVal: val
    })
  },

  scroll: function (e) {
    //  console.log(e) ;
    var that = this, scrollTop = that.data.scrollTop;
    that.setData({
      scrollTop: e.detail.scrollTop
    })
    // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    // console.log('scrollTop:'+scrollTop)
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

    this.requestData(this.type);
  }
})