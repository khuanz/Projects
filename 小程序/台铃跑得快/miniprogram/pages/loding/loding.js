// pages/loding/loding.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if(options.type){
    getApp().globalData.typeflag=options.type;
    }
    var that =this;
    console.log(getApp().globalData.typeflag)
    if (!getApp().globalData.typeflag) {
      this.setData({
        type: '查看排行榜',
        url: '/pages/ranking/ranking'
      })

    } else {
      // 判断首用户
      const dbd = wx.cloud.database()
      const _ = dbd.command
      dbd.collection('eee').doc('iddmss').get({
        success: res => {
          that.setData({
            type: '进入游戏',
            url: '/pages/index/index'
          })
          // app.globalData.openflag=true;
          wx.navigateTo({
            url: '/pages/index/index',
          })
        },
        fail: res => {
          dbd.collection('eee').doc('iddmss').set({
            data: {
              idd: '123'
            },
            success: res => {
              that.setData({
                type: '进入游戏',
                url: '/pages/index/index'
              })
              // app.globalData.openflag = true;
            },
            fail: error => {
              that.setData({
                type: '查看排行榜',
                url: '/pages/ranking/ranking'
              })
            }
          })
        }
      })
    }
  
  },
  btnUrl: function() {
    wx.redirectTo({
      url:this.data.url,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {

    console.log(getApp().globalData.typeflag)
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})