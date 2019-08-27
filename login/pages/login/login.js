// pages/yiwo/login/login.js
//index.js
//获取应用实例
var app = getApp()

var rck = 'rememberCheck';
var rui = 'rememberUserInfo';
var loginList = 'loginList';
var rbFlag = false;

Page({
  data: {
    infoMess: '',
    userN: '',
    userP: '',
    passW: '',
    userName: '',
    passWd: '',
    userPhone: '',
    loginToast: true,
    showTipTxt: '',
    tipHidden: true,
    image: ''
  },

  onLoad: function (options) {
    // 判断是否记住密码
    try {
      rbFlag = wx.getStorageSync(rck);
      console.log('rbFlag', rbFlag);
      if (rbFlag) {
        this.setData({ image: '/image/ok.png' })
        var rif = wx.getStorageSync(rui);
        if (rui != null && rui != '') {
          var name = rif.name;
          var pswd = rif.pswd;
          var phone = rif.phone;
          console.log('name', name, 'pswd', pswd, 'phone', phone);
          this.setData({
            userN: name,
            userP: phone,
            passW: pswd,
            userName: name,
            passWd: pswd,
            userPhone: phone
          })
        }
      } else {
        this.setData({
          image: '/image/no.png',
        })
      }
    } catch (e) {
      console.log('Error')
    }
  },
  //用户名，手机号，密码输入框
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  userPhoneInput: function (e) {
    this.setData({
      userP: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      passW: e.detail.value
    })
  },
  // 记住密码
  rembUser: function (e) {
    if (rbFlag) {
      this.setData({ image: '/image/no.png' })
      rbFlag = false;
      console.log('rbFlag', rbFlag);
      wx.setStorageSync(rck, rbFlag);
    } else {
      this.setData({ image: '/image/ok.png' })
      rbFlag = true;
      console.log('rbFlag', rbFlag);
      wx.setStorageSync(rck, rbFlag);
    }
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  loginBtnClick: function () {
    console.log("点击-------------");
    var that = this;

    var userName = this.data.userN;
    var userPhone = this.data.userP;
    var passWd = this.data.passW;
    if (userName == '') {
      console.log("用户名不能为空");
      toast('用户名不能为空');
      return;
    }
    if (passWd == '') {
      console.log("密码不能为空");
      toast('密码不能为空');
      return;
    }
    if (userPhone == '') {
      console.log("手机号不能为空");
      toast('手机号不能为空');
      return;
    }

    console.log(userName, passWd, userPhone);

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })

    // 记住密码,你也可以放到请求数据成功的里面，这样用户输错信息，就不会记住错误的密码
    // 跳转带有tab的界面使用：wx.switchTab({ url: "../home/home" });
    var obj = new Object();
    obj.name = userName;
    obj.pswd = passWd;
    obj.phone = userPhone;
    console.log('obj', obj);
    wx.setStorageSync(rui, obj);

    // 最后再进行MD5加密，这里假设数据请求成功直接跳转界面
    var request = true;
     if(request){
        wx.navigateTo({
          url: "../index/index?" +
                  "userName=" + userName + "&" +
                  "passWd=" + passWd + "&" +
                  "userPhone=" + userPhone,
          success: function(res){

          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
     }

    // 发送网络请求
    // wx.request({
    //   url: XXX,XXX,XXX,
    //   data: { AGENTID: userName, PSWD: Md5(passWd), PHONE: userPhone, target: 1 },
    //   method: 'POST',
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     // success
    //     var loginInfo = res.data
    //     console.log(loginInfo);
    //     if (loginInfo.code == 1) {
    //     console.log(res.data);
           // 记住密码
    //     var obj = new Object();
    //     obj.name = userName;
    //     obj.pswd = passWd;
    //     obj.phone = userPhone;
    //     console.log('obj', obj);
    //     that.setSaveData(rui, obj);
    //       // 登录记录
    //       var logs = wx.getStorageSync(loginList) || []
    //       logs.unshift(Date.now())
    //       wx.setStorageSync(loginList, logs)

    //       // 至主页
    //       wx.switchTab({ url: "../home/home" });
    //       toast(loginInfo.msg);
    //     } else {
    //       var msg = loginInfo.msg;
    //       toast(loginInfo.msg);
    //     }
    //   },
    //   fail: function (res) {
    //     // fail
    //     toast('登录失败,请重试');
    //     console.log('登录失败:', res);
    //   },
    //   complete: function () {
    //     // complete
    //     console.log('comlete');
    //   }
    // })
  },

})
function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}
