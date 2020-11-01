// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
//请求预约列表数据
  loadData: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'book/getAllById',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('查询成功')
          that.setData({
            list: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
//预约详情按钮跳转方法
  item_click: function (e) {
    var index = e.currentTarget.dataset.index;
    var bookId = this.data.list[index].bookId;
    wx.navigateTo({
      url: '../bookDetails/bookDetails?bookId=' + bookId,
    })
  },
//添加预约按钮页面跳转方法
  add_click: function () {
    wx.navigateTo({
      url: '../addBook/addBook',
    })
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
    wx.setNavigationBarTitle({
      title: '预约'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadData();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})