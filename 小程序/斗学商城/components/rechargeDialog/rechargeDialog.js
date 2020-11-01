// components/rechargeDialog/rechargeDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    confirmText: {
      type: String,
      value: '确认'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 0,
    isShown: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bt_click: function (e) {
      this.setData({
        value: e.target.dataset.value
      })
    },
    //对话框点击事件，无任何事件响应
    none_click: function () {

    },
    //取消按钮事件，点击非对话框区域事件
    cancel_click: function () {
      this.triggerEvent("cancelEvent")
    },
    //确认按钮事件
    formSubmit: function (e) {
      this.triggerEvent("confirmEvent", { data_value: e })
    },
    //隐藏弹框 
    hideDialog() {
      this.setData({
        isShown: !this.data.isShown,
        value: 0
      })
    },
    //展示弹框 
    showDialog: function () {
      this.setData({
        isShown: !this.data.isShown,
      })
    },

  }
})
