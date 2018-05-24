var app = getApp();

Page({
  data: {
    imgUrls: [
      '../../assets/images/banner.jpg',
      '../../assets/images/banner1.jpg',
      '../../assets/images/banner2.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    activeCategoryId: 0
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})