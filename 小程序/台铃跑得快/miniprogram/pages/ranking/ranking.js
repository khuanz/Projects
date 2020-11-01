// pages/ranking.js
const app = getApp();
const db = wx.cloud.database({
  env: 'test-p2fft'
});
const todos = db.collection('counters');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultList: [],
    openid: 0,
    index:0,
    flag:false
  },
  onLoad: function (options) {
   
    //云函数获取当前用户的openid
    wx.cloud.callFunction({
      name: 'add',//云函数名称
      data: {},
      success: (res) => {
        var openid = res.result.openid
        this.setData({
          openid: res.result.openid
        })
      },
      fail: console.error
    });
   
    this.LoadData();
    setTimeout(()=>{this.LoadData()},2000)
    const dbd = wx.cloud.database()
    const _ = dbd.command
    dbd.collection('eee').doc('iddmss').get({
      success: res => {
        dbd.collection('eee').doc('iddmss').remove({
          success:res=>{
            console.log(res)
          }
        })
      }
    })
    console.log(app.globalData.isclose)
   
   if(app.globalData.isclose){
      wx.closeSocket() 
   }
  },
  //从数据库获取数据
  LoadData: function () {
    var that =this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'more',//云函数名称
      data: {},
      success: (res) => {
        wx.hideLoading();
        that.setData({
          resultList: res.result.data,
        })
        console.log(that.data.resultList)
        console.log(this.data.openid)
        // for(let i=0;i<that.data.resultList.length;i++){
        //   if(that.data.resultList[i]._openid==this.data.openid){
        //     that.data.index=i+1;
        //   }
        // }
        this.data.resultList.findIndex((item,index)=>{
          if(item._openid==this.data.openid){
            this.setData({
              flag:true,
              index:index+1       
            })
            app.globalData.index =index+1;
          }
          // console.log(index)
        })
        console.log(this.data.flag)
        console.log(that.data.index)
        // console.log(app.globalData.index)
      },
      fail: console.error
    });

  },
  angin: function () {
    wx.showModal({
      title: '温馨提示',
      content: '亲，请回到起点重新排队哦！',
      showCancel: false,
    })
  },
  ShareGo: function(){
    
    wx.navigateTo({
      url: '../share/share',
      // success: function (res) {
      //   console.log('成绩单已获取')
      // },
      // fail: function (res) {
      //   console.log('成绩单获取失败')
      // },
      // complete: function (res) {
      //   console.log('已完成')
      // },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.typeflag = true;
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