//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    emailflag: false,
    numflag: false,
    openid: '',
    username: '',
    tel: '',
    email: '',
    btnflag: true
  },
  onLoad: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid
        })
        this.fd();
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  gunbu:function(){
    wx.closeSocket({
      url:'wss://service-iglu7zhc-1257873612.gz.apigw.tencentcs.com/release/websocket'
    })
  },
 
  // 表单提交函数
  formSubmit: function (e) {
    wx.sendSocketMessage({
      data: "ready;" + app.globalData.openid,
      success: (data) => {
        console.log(data)
      }
    })
    const that = this
    this.setData({
      username: e.detail.value.username,
      tel: e.detail.value.tel,
      email: e.detail.value.email
    })
    if (!this.data.numflag || !this.data.emailflag) {
      wx.showToast({
        title: '请检查您填写的信息',
        icon: 'none'
      })
      return false;
    }
    const db = wx.cloud.database();
    db.collection('counters').doc(app.globalData.openid).get({
      success: function (res) {
        that.newupdate(that.data)
      },
      fail: function (error) {
        that.addcol(that.data);
        // const _ = db.command
        that.newupdate(that.data)
      }
    })
  },
  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNumber = e.detail.value
    console.log(phoneNumber)
    if (phoneNumber.length >= 1) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
    }
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1[3456789]\d{9}$/
    if (str.test(phoneNumber)) {
      this.setData({
        numflag: true
      })
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
      this.setData({
        numflag: false
      })
      return false
    }
  },
  // 邮箱验证部分
  inputemail: function (e) {
    let email = e.detail.value
    if (email.length >= 1) {
      let checkedNum = this.checkEmail(email)
    }
  },
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      this.setData({
        emailflag: true
      })
      return true
    } else {
      wx.showToast({
        title: '邮箱号不正确',
        icon: 'none'
      })
      this.setData({
        emailflag: false
      })
      return false
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.addcol(this.data)
    } else {
      wx.showModal({
        title: '授权',
        content: '我们需要你的一些信息来提供更好的服务',
      })
    }
  },
  // 查询并填充数据
  fd: function () {
    var that =this;
    const db = wx.cloud.database()
    db.collection('counters').where({
      _openid: this.data.openid
    }).get({
      success: function (res) {
        // res.data 包含该记录的数
        // console.log(res.data)
        // wx.showLoading({
        //   title: '加载中...'
        // })
        console.log(res.data[0])
        if (res.data[0].username) {
          that.setData({
            username: res.data[0].username,
            tel: res.data[0].tel,
            email: res.data[0].email,
            numflag: true,
            emailflag: true
          })
        } 
        wx.hideLoading();
      },
      fail: err => {

        console.error(res.err)
      }
    })


    
  },
  // 初始化数据集
  addcol: function (datas) {
  
      const db = wx.cloud.database()
      db.collection('counters').add({
        data: {
          _id: datas.openid,
          nickname: datas.userInfo.nickName,
          avatarUrl: datas.userInfo.avatarUrl,
          username: '',
          tel: '',
          email: '',
          time: ''
        },
        success: res => {
          console.log(res)
        }
      })
    },
    //更新提交信息
    newupdate:function(datas){
      console.log(datas)
      const db = wx.cloud.database();
      const _ = db.command
      db.collection('counters').doc(datas.openid).update({
        data: {
          username: datas.username,
          tel: datas.tel,
          email: datas.email
        },
        success: res => {
          wx.redirectTo({
            url: '../begin/begin',
          })
          console.log(res)
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id,
            count: 1,
            redflag: true
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          })
        }
      })
    }
})