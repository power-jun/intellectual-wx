var app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '../../assets/images/banner.jpg',
      '../../assets/images/banner1.jpg',
      '../../assets/images/banner2.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    activeCategoryId: 0,
    latitude: 40.002607,
    longitude: 116.487847,
    markers: [{
      iconPath: "../../img/marker_red.png",
      id: 0,
      latitude: 40.002607,
      longitude: 116.487847,
      width: 35,
      height: 45
    }]
  },

  swiperchange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  tabClick: function (e) {
    let id = e.currentTarget.dataset.id;

    this.setData({
      activeCategoryId: id
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})