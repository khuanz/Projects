// pages/addressDetail/addressDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    city: "请选择",
    region: [],
    isAdd: true,//是否是新增地址

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var addressBean = JSON.parse(options.address);
    var address_detail;
    var region_info = [];
    var isAdd_info = true;
    if (addressBean != null) {
      address_detail = addressBean.province + addressBean.city + addressBean.district
      region_info.push(addressBean.province);
      region_info.push(addressBean.city);
      region_info.push(addressBean.district);
      isAdd_info = false;
    } else {
      address_detail = '请选择'
      isAdd_info = true;
    }
    this.setData({
      address: addressBean,
      city: address_detail,
      region: region_info,
      isAdd: isAdd_info
    })
    console.log(this.data.address)
  },
//区域选择监听事件
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      city: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
  },
//提交所填地址信息
  submitData: function (value) {
    var type = this.data.isAdd;
    var addrId;
    if (this.data.isAdd) {
      type = 'add'
      addrId = ''
    } else {
      type = 'updateAddr'
      addrId = this.data.address.addrId;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'address/' + type,
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
        name: value.name,
        province: value.city[0],
        city: value.city[1],
        district: value.city[2],
        detail: value.address,
        phone: value.phone,
        defaultFlag: value.default,
        addrId: addrId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('操作成功')
          wx.navigateBack()
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
//验证表单地址信息
  subfn: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var info = e.detail.value;
    if (info.name == '') {
      wx.showToast({
        title: "请填写收货人",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (info.phone == '') {
      wx.showToast({
        title: "请填写联系电话",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (this.data.city == '请选择') {
      wx.showToast({
        title: "请选择所在地区",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (info.address == '') {
      wx.showToast({
        title: "请填写详细地址",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    this.submitData(info)
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