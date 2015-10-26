<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>专题</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" type="text/css" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" type="text/css" href="css/child.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body style="background-color: #ffffff;" wmall-title="米创微商城"
	wmall-icon="http://bbcc.meec.hk/m/images/logo.jpg"
	wmall-link="http://bbcc.meec.hk/m/index.php?did=1011"
	wmall-desc="米创电商为广大朋友提供指尖上的商机，分享即财富，快乐你我他，这里是老百姓当家做主的地盘，尽在米创微商城！！">
<header id="header" class="main"></header>
<!-- <h2 id="activity-name" class="main" style="margin-top: 18px; font-size: 24px;line-height: 1.4;">
                        黄晓明Baby明日大婚一定要知道的几件事情！ 
                    </h2>-->
 <style>
 #article img {
	height: 100%;
	width: 100%;
 }
</style>                
<div id="article" class="main" style="margin-top: 18px; padding: 20px 15px 15px;"></div>
<div class="main" id="main-container"></div>
<footer id="footer" class="main"></footer>

<script type="text/html" id="adv_list">
	<div class="adv_list">
		<div class="swipe-wrap">
		<% for (var i in item) { %>
			<div class="item">
				<a href="<%= item[i].url %>">
					<img src="<%= item[i].image %>" alt="">
				</a>
			</div>
		<% } %>
		</div>
	</div>
</script>
<script type="text/html" id="home1">
	<div class="index_block home1">
	<% if (title) { %>
		<div class="title"><%= title %></div>
	<% } %>
		<div class="content">
			<div class="item">
				<a href="<%= url %>">
					<img src="<%= image %>" alt="">
				</a>
			</div>
		</div>
	</div>
</script>
<script type="text/html" id="home2">
	<div class="index_block home2">
	<% if (title) { %>
		<div class="title"><%= title %></div>
	<% } %>
		<div class="content">
			<div class="item home2_1">
				<a href="<%= square_url %>"><img src="<%= square_image %>" alt=""></a>
			</div>
			<div class="item home2_2">
				<div class="border-left">
					<div class="border-bottom">
						<a href="<%= rectangle1_url %>"><img src="<%= rectangle1_image %>" alt=""></a>
					</div>
					<div>
						<a href="<%= rectangle2_url %>"><img src="<%= rectangle2_image %>" alt=""></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</script>
<script type="text/html" id="home3">
	<div class="index_block home3">
	<% if (title) { %>
		<div class="title"><%= title %></div>
	<% } %>
		<div class="content">
		<% for (var i in item) { %>
			<div class="item">
				<a href="<%= item[i].url %>"><img src="<%= item[i].image %>" alt=""></a>
			</div>
		<% } %>
		</div>
	</div>
</script>
<script type="text/html" id="home4">
	<div class="index_block home2">
	<% if (title) { %>
		<div class="title"><%= title %></div>
	<% } %>
		<div class="content">
			<div class="item home2_2">
				<div class="border-right">
					<div class="border-bottom">
						<a href="<%= rectangle1_url %>"><img src="<%= rectangle1_image %>" alt=""></a>
					</div>
					<div>
						<a href="<%= rectangle2_url %>"><img src="<%= rectangle2_image %>" alt=""></a>
					</div>
				</div>
			</div>
			<div class="item home2_1">
				<a href="<%= square_url %>"><img src="<%= square_image %>" alt=""></a>
			</div>
		</div>
	</div>
</script>
<script type="text/html" id="goods">
	<div class="index_block goods">
	<% if (title) { %>
		<div class="title"><%= title %></div>
	<% } %>
		<div class="content">
		<% for (var i in item) { %>
			<div class="goods-item">
				<a href="tmpl/product_detail.html?goods_id=<%= item[i].goods_id %>">
					<div class="goods-item-pic"><img src="<%= item[i].goods_image %>" alt=""></div>
					<div class="goods-item-name"><%= item[i].goods_name %></div>
					<div class="goods-item-price">￥<%= item[i].goods_promotion_price %></div>
				</a>
			</div>
		<% } %>
		</div>
	</div>
</script>
<script type="text/javascript" src="js/config.js"></script>
<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/template.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/swipe.js"></script>
<script type="text/javascript" src="js/tmpl/common-top.js"></script>
<script type="text/javascript" src="js/tmpl/footer.js"></script>
<script type="text/javascript" src="js/new.js"></script>

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
</html>
