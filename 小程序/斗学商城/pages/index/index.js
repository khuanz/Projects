//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isTrue:false,
    name:'Sir'
  },

  //1.登录请求方法
  login: function () {
    wx.getUserInfo({
      success: (u) => {
        console.log(u);
        var that = this;
        wx.login({
          success: function (res) {
            wx.request({
              url: getApp().globalData.host + 'user/login',
              method: 'POST',
              data: {
                code: res.code,
                name: that.data.name,
                headImage: u.userInfo.avatarUrl
              },
              success: function (res) {
                console.log(res);
                console.log(res.data)
                if (res.data.code == 200) {
                  getApp().globalData.userInfo = res.data.data
                  console.log('登录成功')
                  wx.switchTab({
                    url: '../store/store',
                  })
                } else {
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 1000
                  })
                  that.setData({
                    isTrue: false
                  })
                }
              },
              fail: function (res) {
                wx.showToast({
                  title: res.errMsg,
                  icon: 'none',
                  duration: 1000
                })
                that.setData({
                  isTrue: false
                })
              }
            })
          }
        })
      }
    });
  },

  //2.立即体验按钮事件
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo){
      this.setData({
        isTrue: true
      })
      this.login();
    }
  },

  //3.用户的自动登录
  onLoad:function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            isTrue: true
          })
          this.login();
        }
      }
    })
  },
})
