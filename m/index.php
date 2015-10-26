<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="format-detection" content="telephone=no,date=no">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>首页</title>
<meta name="description" content="">
<meta name="author" content="WEIBA.INC">
<link rel="stylesheet" type="text/css"
	href="assets/css/wap/base.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/wap/common.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/wap/zAlert.css">
<link rel="stylesheet" type="text/css" href="assets/css/iconfont/iconfont.css">


</head>

<body wmall-title="米创微商城"
	wmall-icon="http://bbcc.meec.hk/m/images/logo.jpg"
	wmall-link="http://bbcc.meec.hk/m/index.php?did=1011"
	wmall-desc="米创电商为广大朋友提供指尖上的商机，分享即财富，快乐你我他，这里是老百姓当家做主的地盘，尽在米创微商城！！"
	style="padding: 0px 0px 0px;">
	<!--直销版页头-->
	<style type="text/css">
#wrap {
	padding-top: 0 !important;
}
</style>
	<header class="header_edit_1">
		<div class="top_img">
			<img
				src="images/head_banner_img.jpg">
		</div>
		<ul class="menu-list">
			<li>
				<div class="portrait">
					<img class="outlet-header-img"
						src="images/logo.jpg">
				</div>
				<div class="shop-name">
					<span>宏哥的小店</span> <i class="iconfont" style="font-size: 18px;"></i>
				</div>
			</li>
			<li><a href="tmpl/product_first_categroy.html"> <i class="iconfont"><label
						class="shop-goods-count">72</label></i> <span>全部商品</span>
			</a></li>
			<li><a class="collect"> <i class="iconfont"></i> <span>收藏本店</span>
			</a></li>
			<li><a class="code"
				href="http://bbcc.meec.hk/m/share.php">
					<i class="iconfont"></i> <span>二维码</span>
			</a></li>
		</ul>
	</header>

	<link rel="stylesheet" type="text/css" href="assets/template/default/css/style.css">
	
	<div id="wrap">
<div listorder="2" class="nav-list clearfix nav-style4">
			<ul>
				<li class="nav-item nav-lh1" style="background-color: #FFFFFF">
					<a href="http://bbcc.meec.hk/m/tmpl/product_list.html?gc_id=1057"> <i><img
							class=""
							src="http://4.s.bama555.com/4/wbmall/design/1509/09/55ef842510f2e.jpg"
							data-original="http://4.s.bama555.com/4/wbmall/design/1509/09/55ef842510f2e.jpg"
							style="display: block;"></i>
						<div class="nav-title" style="color: #000000">天然水晶</div>
				</a>
				</li>
				<li class="nav-item nav-lh1" style="background-color: #FFFFFF">
					<a href="http://bbcc.meec.hk/m/tmpl/product_list.html?gc_id=9"> <i><img
							class=""
							src="http://7.s.bama555.com/7/wbmall/design/1509/09/55ef8449c405a.jpg"
							data-original="http://7.s.bama555.com/7/wbmall/design/1509/09/55ef8449c405a.jpg"
							style="display: block;"></i>
						<div class="nav-title" style="color: #000000">爵士男鞋</div>
				</a>
				</li>
				<li class="nav-item nav-lh1" style="background-color: #FFFFFF">
					<a href="http://bbcc.meec.hk/m/tmpl/product_list.html?gc_id=4"> <i><img
							class=""
							src="http://6.s.bama555.com/6/wbmall/design/1509/09/55ef84a0e1489.jpg"
							data-original="http://6.s.bama555.com/6/wbmall/design/1509/09/55ef84a0e1489.jpg"
							style="display: block;"></i>
						<div class="nav-title" style="color: #000000">时尚女装</div>
				</a>
				</li>
				<li class="nav-item nav-lh1" style="background-color: #FFFFFF">
					<a href="special.html?special_id=1"> <i><img
							class=""
							src="http://5.s.bama555.com/5/wbmall/design/1509/09/55ef848a2a0e0.jpg"
							data-original="http://5.s.bama555.com/5/wbmall/design/1509/09/55ef848a2a0e0.jpg"
							style="display: block;"></i>
						<div class="nav-title" style="color: #000000">分销商政策</div>
				</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="loading">
		<div class="loader">
			<i class="dot-pink"></i> <i class="dot-blue"></i>
		</div>
	</div>
<script type="template/javascript" id="goods">
    <div  class="goods-list style-small">
        <% if (title) { %><h3><a href="javacript:void(0)"><%= title %><span>更多</span></a></h3><% } %>
        <ul class="clearfix">
            <% for (var i in item) { %>
            <li>
                <div class="goods-inner">
                    <a href="tmpl/product_detail.html?goods_id=<%= item[i].goods_id %>">
                        <div class="goods-img">
                            <img style="height: auto" class="lazy" src="assets/img/blank.gif" data-original="<%= item[i].goods_image %>">
                        </div>
                        <div class="goods-title"><%= item[i].goods_name %></div>
                        <div class="goods-info">
                            <span class="goods-price">￥<%= item[i].goods_promotion_price %></span>
                            <span class="goods-del"><del>￥<%= item[i].goods_marketprice %></del></span>
                            <span class="goods-sale">已售:<%= item[i].goods_salenum %></span>
                        </div>
                    </a>
                </div>
            </li>
            <% } %>
        </ul>
    </div>
</script>

<script type="text/html" id="adv_list">
	<div class="swiper-container adv_list">
		<div class="swiper-wrapper swipe-wrap">
		<% for (var i in item) { %>
			<div class="swiper-slide item">
				<a href="<%= item[i].url %>">
					<img src="<%= item[i].image %>" alt="">
				</a>
			</div>
		<% } %>
		</div>
	</div>
</script>

<script type="text/html" id="home1">

    <div  class="image-list style1">
        <ul class="clearfix">
            <li style="height:100%">
                <a href="<%= url ||'javacript:void(0)'%>"><img class="lazy" src="assets/img/blank.gif" data-original="<%= image %>"  alt="<%= title %>">
                    <% if (title) { %><p><%= title %></p><% } %>
                </a>
            </li>
        </ul>
    </div>
</script>
	<footer id="footer-fixed-edit-1">

	</footer>
	<div id="footer-edit-1">
		<p class="deep-gray">
			Copyright © <a
				href="http://tzwl.bama555.com/mini_scene/view/U60665G5JB"
				style="text-decoration: none; color: #00a1ff;">米创电商</a>
		</p>
	</div>
	<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/config.js"></script>
<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/template.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/swipe.js"></script>
<script type="text/javascript" src="js/index.js"></script>
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
<script type="text/javascript" src="js/footer.js"></script>
<script type="text/javascript" src="js/lazyload.js"></script>

</body>
</html>