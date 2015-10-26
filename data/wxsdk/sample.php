<?php
require_once "samplejssdk.php";

$jssdk = new JSSDK("wx4049393d02de5fd0", "bcdd26a8569dd54ec66c05a8e65ca6ea");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
alert('<?php echo $signPackage["url"];?>');
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
  });
  wx.ready(function () {
    // 在这里调用 API
	  setForward();
  });

  function setForward() {
     // var $body = $('body'),
          title = 'wwwwwwqq',
          imgUrl = '',
          link = window.location.href,
          desc = link;
      if (title && link) {
          wx.onMenuShareAppMessage({
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl,
              success: function (res) {
/*                    $(document).trigger('wx_sendmessage_confirm');
                  $.ajax({
                      url : '/data/partner/share',
                      type : 'post',
                      dataType : 'json',
                      data : {},
                      success : function(result){
                          if( result.ret == 0 && result.data ){
                              var _url = window.location.href,
                                  wxid = window.localStorage.getItem('WXID');
                              $.get(result.data, { url: _url, from: wxid } );
                          }
                      }
                  });*/
              },cancel: function (res) {
                  //alert('已取消');
              },
              fail: function (res) {
                  if(appId =='wxe40f036501e26e17'){
                      //alert(JSON.stringify(res));
                  }
              }
          });

          wx.onMenuShareTimeline({
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl
          });


          wx.onMenuShareQQ({
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl
          });

          wx.onMenuShareWeibo({
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl
          });
          return true;
      }
      else {
          return false;
      }
  }
</script>
</html>
