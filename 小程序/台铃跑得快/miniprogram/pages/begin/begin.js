//begin.js
const app = getApp()

Page({
  //开始跑步，倒数
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  data: {
    isImg: false,
    isOver: false

  },
  starRun: function() {
    var that = this;
    wx.sendSocketMessage({
      data: "start;" + app.globalData.openid,
      success: (data) => {
        console.log(data)
      }
    })
    this.setData({
      isImg: true,
    })
    var time = setTimeout(function() {
      clearInterval(time);
      that.setData({
        isOver: true
      })


    }, 3000);
    wx.onSocketMessage(function(res) {
      var runflag = 'run;'+app.globalData.openid
    
      if (res.data.split('(')[0] == runflag) {
        navTo();
      }
      console.log('WebSocket发送信息！')
    })

    function navTo() {
      wx.redirectTo({
        url: '../ranking/ranking',
        success: function(res) {
          console.log('成绩单已获取')
        },
        fail: function(res) {
          console.log('成绩单获取失败')
        },
        complete: function(res) {
          console.log('已完成')
        },
      })
    }


  },
  strToUint8: function(str) {
    for (var i = 0, arr = []; i < str.length; i++) {
      arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
  },
  Uint8ToStr: function(arr) {
    for (var i = 0, str = ''; i < arr.length; i++)
      str += String.fromCharCode(arr[i]);
    return str;
  },
  byteToString:function(arr) {
    if(typeof arr === 'string') {
  return arr;
}
var str = '',
  _arr = arr;
for (var i = 0; i < _arr.length; i++) {
  var one = _arr[i].toString(2),
    v = one.match(/^1+?(?=0)/);
  if (v && one.length == 8) {
    var bytesLength = v[0].length;
    var store = _arr[i].toString(2).slice(7 - bytesLength);
    for (var st = 1; st < bytesLength; st++) {
      store += _arr[st + i].toString(2).slice(2);
    }
    str += String.fromCharCode(parseInt(store, 2));
    i += bytesLength - 1;
  } else {
    str += String.fromCharCode(_arr[i]);
  }
}
return str;
		},
  onLoad: function() {

  }
});