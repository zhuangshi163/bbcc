<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<link rel="dns-prefetch" href="//static.weiba.com">
<meta name="apple-mobile-web-app-title" content="店铺推广图片">
<link rel="apple-touch-icon-precomposed"
	href="http://static.weiba.com/img/apple-touch-icon.png">
<link rel="apple-touch-icon"
	href="http://static.weiba.com/img/apple-touch-icon.png">
<!--
        <title></title>
            <title></title>
    -->
<title>二维码</title>
<meta name="viewport"
	content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<meta content="telephone=no" name="format-detection">
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!-- ▼ CSS -->
<link rel="stylesheet" type="text/css"
	href="assets/css/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/wap/mall/base-new.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/wap/mall/style-new.css">
</head>
<body wmall-title="米创微商城"
	wmall-icon="http://bbcc.meec.hk/m/images/logo.jpg"
	wmall-link="http://bbcc.meec.hk/m/index.php?did=1011"
	wmall-desc="米创电商为广大朋友提供指尖上的商机，分享即财富，快乐你我他，这里是老百姓当家做主的地盘，尽在米创微商城！！">

	<div id="views"
		style="z-index: 100; min-height: 500px; background-color: #efefef; padding-bottom: 70px;">
		<div class="ad-imgs" style="margin-bottom: 10px;">
			<img id="adImg" src="http://bbcc.meec.hk/data/upload/mobile/erweima/adImg1011.jpg"
				style="padding-bottom: 0px;">
				
				
			<div class="footer">
				<a class="btn btn-white js-share-link"><i class="iconfont"
					style="color: #ff7c22;"></i>链接分销</a> <a
					class="btn btn-white js-share-img"><i class="iconfont"
					style="color: #359999;"></i>图片分销</a>
			</div>
		</div>
		<div class="layout">
			<div class="item">
				<div class="row">
					<div class="hd" style="color: #000;">
						<i class="iconfont" style="font-size: 18px; color: #ff6600;"></i>分销如何赚钱
					</div>
					<div class="bd" style="padding: 4px 0 0;">
						<table cellpadding="0" cellspacing="0" style="margin-bottom: 6px;">
							<tbody>
								<tr>
									<th width="55" style="text-align: left; vertical-align: top;">第一步
									</th>
									<td class="deep-gray">转发店铺链接或店铺图片给微信好友；</td>
								</tr>
								<tr>
									<th width="55" style="text-align: left; vertical-align: top;">第二步
									</th>
									<td class="deep-gray">从您转发的链接或图片进入商城的好友，系统将自动锁定成为您的客户，他们在微信商城中购买任何商品，您都可以获得分销佣金。</td>
								</tr>
								<tr>
									<th width="55" style="text-align: left; vertical-align: top;">第三步
									</th>
									<td class="deep-gray">您可以在分销中查看【我的客户】和【分销订单】。好友确认收货后，佣金可提现。</td>
								</tr>
							</tbody>
						</table>
						<p style="background-color: #fe924a; color: #fff; padding: 10px;">
							说明：分享后会带有独有的推荐码，您的好友访问之后，系统会自动检测并记录客户关系。
							如果您的好友已被其他人抢先发展成了客户，他就不能成为您的客户。以最早发展成为客户为准。</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="pop-dialog js-dialog-link" style="display: none;">
		<div class="bg"></div>
		<div class="body">
			<img class="collect-img"
				src="http://rhztzw.shop.bama555.com/assets/img/wap/share_friend.png">
		</div>
	</div>

	<div class="dialog js-dialog-img">
		<div class="body">
			<div class="explain-text">
				<i class="iconfont" style="color: #ff9934;"></i> <span class="text">长按保存图片并将图片转发给您的好友。</span>
			</div>
			<a class="btn btn-green dialog-close">我知道了</a>
		</div>
	</div>
    <script type="text/javascript" src="js/config.js"></script>
    <script type="text/javascript" src="js/zepto.min.js"></script>
    <script type="text/javascript" src="js/template.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/erweima.js"></script>
	<script>

    $('.js-share-link').on('click', function(){
        $(".js-dialog-img").Dialog('hide');
        $(".js-dialog-link").show();
    });
    $('.js-dialog-link .body').on('click', function(){
        $(".js-dialog-link").hide();
    });
    $(".js-share-img").on('click', function(){
        $(".js-dialog-link").hide();
        $(".js-dialog-img").Dialog();
    });

</script>
	<script type="text/javascript"
		src="http://rhztzw.shop.bama555.com/assets/js/wap/dialog.js"></script>
		
<script type="text/javascript" src="js/jweixin-1.0.0.js"></script>
<?php 
require_once $_SERVER['DOCUMENT_ROOT']."/data/wxsdk/jssdk.php";
//print_r();die;
//echo $_SERVER['DOCUMENT_ROOT']."/data/wxsdk/jssdk.php";die;
$jssdk = new JSSDK("wx4049393d02de5fd0", "bcdd26a8569dd54ec66c05a8e65ca6ea");
$signPackage = $jssdk->GetSignPackage();
// print_r($signPackage);die;
?>
<script>
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
    debug: false,
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
      var $body = $('body'),
      title = $body.attr('wmall-title'),
      imgUrl = $body.attr('wmall-icon'),
      link = $body.attr('wmall-link') || window.location.href,
      desc = $body.attr('wmall-desc') || link;
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


</body>
<iframe id="__WeixinJSBridgeIframe_SetResult" style="display: none;"></iframe>
<iframe id="__WeixinJSBridgeIframe" style="display: none;"></iframe>
</html>