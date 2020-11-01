// pages/address/address.js
var isFromCheck = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },
//编辑地址信息页面跳转
  edit_click: function (e) {
    var index = e.currentTarget.dataset.index;
    var addressBean = JSON.stringify(this.data.list[index])
    wx.navigateTo({
      url: '../addressDetail/addressDetail?address=' + addressBean,
    })
  },
//添加新地址按钮事件
  add_click: function () {
    var addressBean = JSON.stringify(null)
    wx.navigateTo({
      url: '../addressDetail/addressDetail?address=' + addressBean,
    })
  },
//地址信息请求
  loadData: function () {
    wx.showNavigationBarLoading()
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'address/all',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        userId: getApp().globalData.userInfo.userId,
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
//默认地址请求方法
  changeDefault: function (index, id) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'address/changeDefault',
      method: 'POST',
      data: {
        addrId: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('请求成功')
          var listInfo = that.data.list;
          for (var i = 0; i < listInfo.length; i++) {
            listInfo[i].defaultFlag = false;
          }
          listInfo[index].defaultFlag = true;
          that.setData({
            list: listInfo
          })
          wx.showToast({
            title: "操作成功",
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
//删除地址的网络请求
  deleteAddress: function (id) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'address/delete ',
      method: 'POST',
      data: {
        addrId: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('删除成功')
          that.loadData();
          wx.showToast({
            title: "删除成功",
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

//设置默认地址按钮事件
  default_click: function (e) {
    var index = e.currentTarget.dataset.index;
    var id = this.data.list[index].addrId;
    var defaultFlag = this.data.list[index].defaultFlag;
    if (defaultFlag != true) {
      this.changeDefault(index, id);
    }
  },
//删除地址按钮事件
  delete_click: function (e) {
    var index = e.currentTarget.dataset.index;
    var id = this.data.list[index].addrId;
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否删除该条地址？',
      success: function (res) {
        if (res.confirm) {
          that.deleteAddress(id)
        }
      }
    })
  },
//地址信息列表点击事件(从结算页面跳转过来的)
  item_click: function (e) {
    if (isFromCheck != 1) {
      return;
    }
    var index = e.currentTarget.dataset.index;
    var address = this.data.list[index];
    console.log("item_click")
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]  //上一个页面
    prevPage.setData({
      address: address
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var checkBean = options.check;
    console.log("checkBean:" + checkBean)
    isFromCheck = checkBean;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '收货地址'
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