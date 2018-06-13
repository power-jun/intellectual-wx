var app = getApp();

Page({
  data: {
    imgUrls: [
      '../../assets/images/banner.jpg',
      '../../assets/images/banner1.jpeg',
      '../../assets/images/banner2.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    activeCategoryId: 0,
    latitude: 31.193236,
    longitude: 121.423062,
    markers: [{
      iconPath: "../../assets/images/marker_red.png",
      id: 0,
      latitude: 31.193236,
      longitude: 121.423062,
      width: 32,
      height: 32
    }]
  },

  swiperchange: function (e) {
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
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.useInfo = res.userInfo;
            }
          })
        }
      }
    });

  },

  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '021-64734071',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})