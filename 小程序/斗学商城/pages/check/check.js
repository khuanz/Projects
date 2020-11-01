// pages/check/check.js
var cartBean;
var flag; //0 购物车 1 详情页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    address: null,
    total_price: 0,
    hasAddress: false

  },
//地址选择修改事件方法，跳转到收货地址列表
  address_click: function () {
    wx.navigateTo({
      url: '../address/address?check=1',
    })
  },
//结算确认按钮点击事件(首先获取备注输入框信息，请求成功以后返回上一页)
  formSubmit: function (e) {
    console.log(e)
    var mark = e.detail.value.mark;
    if (mark == '') {
      mark = '暂无备注'
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    console.log(cartBean)
    wx.request({
      url: getApp().globalData.host + 'order/create',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
        money: that.data.total_price + "",
        addrId: that.data.address.addrId,
        goods_list: cartBean,
        message: mark,
        flag: flag
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('结算成功')
          wx.navigateBack({
            delta: 1,
            success: () => {
              wx.showToast({
                title: "结算成功",
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
//

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    flag = options.flag;
    cartBean = JSON.parse(options.cart);
    console.log(cartBean)
    console.log(flag)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'order/settle',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
        goods_list: cartBean
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('查询成功')
          if (res.data.data.address == null) {
            that.setData({
              hasAddress: false
            })
          } else {
            that.setData({
              hasAddress: true,
              address: res.data.data.address
            })
          }
          var list_info = res.data.data.good_list;
          for (var i = 0; i < list_info.length; i++) {
            list_info[i].goods.image = getApp().globalData.host + list_info[i].goods.image
          }
          that.setData({
            list: list_info,
            total_price: res.data.data.total_money
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
      title: '结算'
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