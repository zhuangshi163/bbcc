/*
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        var $body = $('body');

        WeixinJSBridge.invoke('sendAppMessage', {
            //'appid': 'kczxs88',
            'img_url': $('body').attr('wmall-icon'),
            'link': $('body').attr('wmall-link')+'#qq.com' || window.location.href,
            //'link': window.location.href,
            'desc': $('body').attr('wmall-desc') ||$('body').attr('wmall-link')||window.location.href,
            'title': $('body').attr('wmall-title'),
            //'appid':'wx4f5b0e21aec8a6dd'
        }, function (res) {
            // 返回res.err_msg,取值
            // share_timeline:cancel 用户取消
            // share_timeline:fail　发送失败
            // share_timeline:ok 发送成功

        });
    });

    WeixinJSBridge.on('menu:share:timeline', function(argv){

        WeixinJSBridge.invoke('shareTimeline',{
            'img_url': $('body').attr('wmall-icon'),
            'link': $('body').attr('wmall-link')+'#qq.com' || window.location.href,
            //'link': window.location.href,
            'desc': $('body').attr('wmall-desc') ||$('body').attr('wmall-link')||window.location.href,
            'title': $('body').attr('wmall-title'),
            //'appid':"wx4f5b0e21aec8a6dd"

        }, function(res) {

        });

    });
});*/
$(document).ready(function(){
	//alert(encodeURIComponent(location.href.split('#')[0]));
	alert($.trim(window.location.href));
	var _global ='';
    $.ajax({
        type:'post',
        url:ApiUrl+"/index.php?act=index&op=wxshare",
        data:{currentUrl:$.trim(window.location.href)},
        dataType:'json',
        success:function(result){
        	 _global = {
        			"wechat_js_config" : {
        				"appId" : result.datas.appId,
        				"timestamp" : result.datas.timestamp,
        				"nonceStr" : result.datas.nonceStr,
        				"signature" : result.datas.signature
        			}
        		};


    wx.error(function(res){
        //if(_global.wechat_js_config['appId'] =='wxe40f036501e26e17'){
           // alert(res['errMsg']);
        //}
    });
    wx.config({
        debug: true,//_global.wechat_js_config['appId'] =='wx59c453d03acc9061' ? true : false,
        appId: _global.wechat_js_config['appId'],
        timestamp: _global.wechat_js_config['timestamp'],
        nonceStr: _global.wechat_js_config['nonceStr'],
        signature: _global.wechat_js_config['signature'],
//        appId: "wxe40f036501e26e17",
//        timestamp: 1441701270,
//        nonceStr: "wGNH4K0Up0C8Lhrx",
//        signature: "8c6bc7e4803b9d37eb7360b78ddd3e1550f15cd3",
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

    wx.ready(function(){
    /*    $(document).trigger('bridgeready');

        var $body = $('body'),
            title = $body.attr('wmall-title'),
            imgUrl = $body.attr('wmall-icon'),
            link = $body.attr('wmall-link') || window.location.href,
            desc = $body.attr('wmall-desc') || link;*/
    /*    if (!setForward()) {
            $(document).bind('weibachanged', function () {*/
                setForward();
    /*        });
        }
        $.cardForward = function(){
            setForward();
        }*/

        $.imagePreview = function (urls, cur, elem) {
            if (!elem.parent().is('a')) {
                if ($.isArray(urls) && urls.length > 0) {
                    if ($.isNumeric(cur) && urls[cur]) {//如果是数字
                        cur = urls[cur];
                    } else if (!cur) {
                        cur = urls[0];
                    }
                    if (window.wx) {
                        var params = {
                            'urls': urls,
                            'current': cur
                        };
                        wx.previewImage(params);
                    }
                }
            }
        };
    });
    
}
});

});