const app = getApp()
Page({
    data: {
      avatarUrl: '',//头像路径
      openid: '',
      username: '',
      time:'',
      scale: 1.38,
      portrait_temp:''
    },
    onLoad: function () {
      const that =this;
        wx.cloud.callFunction({
          name: 'login',

          success: res => {
            console.log('[云函数] [login] user openid: ', res.result.openid)
            app.globalData.openid = res.result.openid
            that.setData({
              openid: res.result.openid
            })
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
          }
        });


     if(app.globalData.userInfo.avatarUrl==null){
       wx.showToast({
         title: '没有权限获取数据',
         icon:'none'
       })
       return false;
     }
        this.setData({
          avatarUrl:app.globalData.userInfo.avatarUrl
        })
  console.log(app.globalData)
        wx.downloadFile({
          url: that.data.avatarUrl,
          success: function (res1) {
            //缓存头像图片
            that.setData({
              avatarUrl: res1.tempFilePath
            })
            console.log('开始绘制图片');
            that.drawImage();

          }
        })
    },
    canvasToImage: function () {
        var that = this
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
          // width: wx.getSystemInfoSync().windowWidth*0.9,
          // height: wx.getSystemInfoSync().windowHeight*0.9,
            // destWidth: 310 * wx.getSystemInfoSync().pixelRatio,
            // destHeight: 495 * wx.getSystemInfoSync().pixelRatio,
            canvasId: 'myCanvas',
            fileType: 'jpg',
            success: function (res) {
                console.log('朋友圈分享图生成成功:' + res.tempFilePath)
                wx.previewImage({
                    current: res.tempFilePath, // 当前显示图片的http链接
                    urls: [res.tempFilePath] // 需要预览的图片http链接列表
                })
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function () {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                })
            },
            fail: function (err) {
                console.log('失败')
                console.log(err)
            }
        })
    },
    drawImage: function () {
        //绘制canvas图片
        var that = this;
        var portraitPath = that.data.portrait_temp
        const ctx = wx.createCanvasContext('myCanvas')
      const windowWidth = wx.getSystemInfoSync().windowWidth*0.9
        const avatarUrl=that.data.avatarUrl
        const hostNickname = app.globalData.userInfo.nickName

        //获取数据
        const db = wx.cloud.database()
        db.collection('counters').where({
          _id: app.globalData.openid
        }).get({
          success: function (res) {
            console.log(res.data)
            
            //生成图片背景颜色
            ctx.setFillStyle("#fff");
            ctx.fillRect(0, 0, 500,800)

            //绘制头像
            ctx.save();
            ctx.beginPath();
            ctx.arc(windowWidth / 2, 0.32 * windowWidth, 0.15 * windowWidth, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(avatarUrl, 0.7 * windowWidth / 2, 0.17 * windowWidth, 0.3 * windowWidth, 0.3 * windowWidth);
            ctx.restore();
            //绘制第一段文本
            ctx.setFillStyle('#000');
            ctx.setFontSize(16);
            ctx.setTextAlign('center');
            ctx.fillText(hostNickname + ' 你的成绩已新鲜出炉啦!!!', windowWidth / 2, 0.70 * windowWidth);

            //绘制第三段文本
            ctx.setFillStyle('#f00');
            ctx.setFontSize(30);
            ctx.setTextAlign('left');
            ctx.fillText('排名：' +app.globalData.index , windowWidth / 4, 0.86 * windowWidth);

          ctx.setFillStyle('#f00');
          ctx.setFontSize(30);
          ctx.setTextAlign('left');
            ctx.fillText('名字：' + res.data[0].username, windowWidth / 4, 0.99 * windowWidth);

          ctx.setFillStyle('#f00');
          ctx.setFontSize(30);
          ctx.setTextAlign('left');
          ctx.fillText('成绩：' + res.data[0].time+'s', windowWidth / 4, 1.12 * windowWidth);

          //绘制第二段文本
          ctx.setFillStyle('#000');
          ctx.setFontSize(14);
          ctx.setTextAlign('center');
          ctx.fillText('===跑跑成绩表===', windowWidth / 2, 1.25 * windowWidth);

          ctx.draw();
        }
      })
    },
    ShowCanvas: function (event) {
        wx.hideLoading();
        this.canvasToImage();
    },
})