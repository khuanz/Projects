// pages/goodsDetails/goodsDetails.js
var goodsId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: null
  },

//添加到购物车按钮
  add: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'cart/add',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
        goodsId: goodsId
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('添加成功')
          wx.showToast({
            title: "添加成功",
            icon: 'none',
            duration: 1000
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
//结算按钮方法
  check_click: function () {
    var list = [];
    list.push({
      goodsId: goodsId,
      num: 1,
      userId: getApp().globalData.userInfo.userId
    })
    var cartBean = JSON.stringify(list)
    wx.navigateTo({
      url: '../check/check?cart=' + cartBean + '&flag=0',
    })
  },



////

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.goodsId;
    console.log("goodsId:" + goodsId);
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'goods/goodsDetails',
      method: 'POST',
      data: {
        goodsId: goodsId,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('查询成功')
          var result = res.data.data;
          result.image = getApp().globalData.host + result.image;
          that.setData({
            goodsDetail: result
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
      title: '商品详情'
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