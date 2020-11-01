// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

// 加载数据
  loadData: function () {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'user/userInfo',
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
            userInfo: res.data.data
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
        wx.hideNavigationBarLoading()
      }
    })
  },

//页面跳转方法
//消费记录跳转方法
  consumption_click: function () {
    wx.navigateTo({
      url: '../consumption/consumption'
    })
  },
//充值记录跳转方法
  recharge_click: function(){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
//收货地址跳转方法
  address_click: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },



//充值按钮方法
  pay_click: function () {
    this.dialog.showDialog();
  },
//隐藏对话框方法
  cancelClick: function () {
    this.dialog.hideDialog();
  },
//确认按钮监听
  confirmClick: function (e) {
    var value = e.detail.data_value.detail.value.money;
    if (value > 0) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      var that = this;
      wx.request({
        url: getApp().globalData.host + 'recharge/record',
        method: 'POST',
        data: {
          userId: getApp().globalData.userInfo.userId,
          money: value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code == 200) {
            console.log('充值成功')
            that.dialog.hideDialog();
            wx.showToast({
              title: "充值成功",
              icon: 'success',
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
    } else {
      wx.showToast({
        title: '请输入正确金额',
        icon: 'none',
        duration: 1000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dialog = this.selectComponent("#dialog");
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