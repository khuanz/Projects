// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'recharge/getRecord',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
      },
      header: {
        'content-type': 'application/json' // 默认值
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '充值记录'
    })
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