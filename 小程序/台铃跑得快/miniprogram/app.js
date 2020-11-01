//app.js
App({
  onLaunch: function(options) {
    const that = this;
    console.log(options)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
      const dbd = wx.cloud.database()
      const _ = dbd.command
      if (options.scene == 1047 || options.scene == 1017 || options.scene == 1011){
      dbd.collection('eee').doc('iddmss').set({
        data: {
          idd: '123'
        },
        success: res => {
          that.globalData.openflag = true;
          // 判断进入小程序方式
          wx.showLoading({
            title: '等待中'
          })
          if ( that.globalData.openflag == true) {
            wx.connectSocket({
              url: 'wss://service-iglu7zhc-1257873612.gz.apigw.tencentcs.com/release/websocket',
              header: {
                'content-type': 'application/json'
              },
              protocols: ['protocol1'],
              method: "GET",
              success: res => {
                console.log(res)
              }
            }),
              wx.onSocketOpen(function (res) {
                that.globalData.isclose = true;
                console.log('WebSocket连接已打开！!' + Date())
              })
            wx.onSocketMessage(function (res) {
              console.log('WebSocket发送信息！!')
            })
            wx.onSocketClose(function (res) {
              console.log('WebSocket 已关闭！!' + Date())
              console.log(res)
              if (res.code != 1000) {
                that.wsl()
              }
            })
            wx.hideLoading()
            // this.isflag(options)
          } 
          console.log(that.globalData)
          
        }
      })
      } else {
        console.log('dfdsdsg')
        that.globalData.typeflag = false;
        wx.hideLoading()
        // wx.redirectTo({
        //   url: '/pages/ranking/ranking'
        // })

      }
    
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    console.log(options.scene)
    
   console.log(that.globalData)
   
  },

  // websocket链接
  wsl: function() {
    wx.connectSocket({
      url: 'wss://service-iglu7zhc-1257873612.gz.apigw.tencentcs.com/release/websocket',
      header: {
        'content-type': 'application/json'
      },
      protocols: ['protocol1'],
      method: "GET",
      success: res => {
        console.log(res)
      }
    })
    wx.onSocketOpen(function(res) {
      console.log('WebSocket连接已打开！app' + Date())
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    index: "",
    typeflag:true,
    isclose:false,
    openflag:false
  }
})