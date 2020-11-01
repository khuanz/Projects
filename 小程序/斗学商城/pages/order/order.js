// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    currentTab: 1,
  },
//请求页面数据
  loadData: function () {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'order/showByStatus',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
        status: this.data.currentTab
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('请求成功')
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
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
//按钮事件
  swichNav: function (e) {
    this.setData({
      currentTab: e.target.dataset.current,
    })
    this.loadData();
  },
//预约详情页面跳转
  item_click: function (e) {
    var index = e.currentTarget.dataset.index;
    var orderNum = this.data.list[index].orderNum;
    wx.navigateTo({
      url: '../orderDetails/orderDetails?orderNum=' + orderNum,
    })
  },
//确认发货按钮事件
  confirm_click: function (e) {
    console.log(e);
    var index = e.target.dataset.index//当前索引
    var orderNum = this.data.list[index].orderNum
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'order/updateStatus',
      method: 'POST',
      data: {
        orderNum: orderNum,
        status: '3'
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('修改成功成功')
          wx.showToast({
            title: '发货成功',
            icon: 'none',
            duration: 1000
          })
          that.loadData();
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
//
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
      title: '订单列表'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list: []
    })
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