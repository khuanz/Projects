// pages/store/store.js
var currentPage = 1 //当前页数
var pageSize = 10 //每页显示数量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    total_money: 0,
    total_num: 0,
    cart: []
  },

//请求商品数据
  loadData: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'goods/getGoodsByPage',
      method: 'POST',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('查询成功')
          var result = res.data.data;
          var list_info = that.data.list;
          for (var i = 0; i < result.length; i++) {
            result[i].image = getApp().globalData.host + result[i].image;
            list_info.push(result[i]);
          }
          console.log(list_info)
          that.setData({
            list: list_info
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
//请求购物车数据
  loadCart: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'cart/getAll',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('查询成功')
          that.setData({
            total_money: res.data.data.total_money,
            total_num: res.data.data.total_num,
            cart: res.data.data.goods_list
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
//下拉刷新方法
  reflash: function () {
    console.log("reflash ------")
    currentPage = 1;
    this.setData({
      list: []
    })
    this.loadData();
  },
//上拉加载方法
  loadMore: function () {
    console.log("loadMore ------")
    currentPage++;
    this.loadData();
  },
//添加收货地址按钮
  item_click: function (e) {
    var index = e.currentTarget.dataset.index;
    var goodsId = this.data.list[index].goodsId;
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + goodsId,
    })
  },
//清空购物车网络请求方法
  clearData: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'cart/delete',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('删除成功')
          that.loadCart();
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
//clear单击事件，确认时调用网络请求清空购物车
  clear: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否清空购物车？',
      success: function (res) {
        if (res.confirm) {
          that.clearData()
        }
      }
    })
  },
//购买按钮add事件(先获取按钮上的index值，根据此值获取goodsId，然后进行网络接口请求)
  add: function (e) {
    var index = e.currentTarget.dataset.index;
    var goodsId = this.data.list[index].goodsId;
    console.log("goodsId:" + goodsId)
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
          that.loadCart();
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
  check_click: function (e) {
    if (this.data.cart.length == 0) {
      wx.showToast({
        title: "购物车为空",
        icon: 'none',
        duration: 1000
      })
      return
    }
    var cartBean = JSON.stringify(this.data.cart)
    wx.navigateTo({
      url: '../check/check?cart=' + cartBean + '&flag=0',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '商店'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    currentPage = 1;
    this.setData({
      list: []
    })
    this.loadData();
    this.loadCart();
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