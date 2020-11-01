// pages/addBook/addBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_date: '',
    date: '',
    time: ''

  },
//时间，日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
//网络请求，提交表单
  submitData: function (value) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.request({
      url: getApp().globalData.host + 'book/add ',
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.userId,
        comeTime: value.date + " " + value.time + ":00",
        bookItem: value.name,
        message: value.message,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
          console.log('添加成功')
          wx.navigateBack()
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
//表单信息确认按钮，验证表单
  //为确认按钮添加formSubmit单击事件，获取页面表单数据，进行简单的表单验证，调用submitData方法，添加预约信息。
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var info = e.detail.value;
    if (info.name == '') {
      wx.showToast({
        title: "请输入服务项目名称",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (info.message == '') {
      wx.showToast({
        title: "请输入留言",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    this.submitData(info)
  },

//

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前时间，设置最早预约时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minite = date.getMinutes();
    var hour = date.getHours();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (minite >= 0 && minite <= 9) {
      minite = "0" + minite;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    this.setData({
      start_date: date.getFullYear() + seperator1 + month + seperator1 + strDate,
      date: date.getFullYear() + seperator1 + month + seperator1 + strDate,
      time: hour + seperator2 + minite
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '添加预约'
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