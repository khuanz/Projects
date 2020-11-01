// pages/bookDetails/bookDetails.js
var bookId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: null
  },
//删除预约信息的网络请求
  delete_data: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'book/delete',
      method: 'POST',
      data: {
        bookId: bookId,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('删除成功')
          wx.navigateBack({
            delta: 1,
            success: () => {
              wx.showToast({
                title: "删除成功",
                icon: 'none',
                duration: 1000
              })
            }
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
//删除预约信息按钮事件
  delete_click: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该条预约信息？',
      success: function (res) {
        if (res.confirm) {
          that.delete_data()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookId = options.bookId;
    console.log("bookId:" + bookId)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'book/details',
      method: 'POST',
      data: {
        bookId: bookId,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('查询成功')
          var result = res.data.data;
          if (result.status == 0) {
            result.isHidden = false;
          } else {
            result.isHidden = true;
          }
          that.setData({
            details: result
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '预约详情'
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