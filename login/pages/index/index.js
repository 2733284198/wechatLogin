//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    //接收数据
    this.setData({
      userName: options.userName,
      passWd: options.passWd,
      userPhone: options.userPhone
    })
    console.log('传递参数打印----------');
    console.log(options.userName);
    console.log(options.passWd);
    console.log(options.userPhone);






  }
})
