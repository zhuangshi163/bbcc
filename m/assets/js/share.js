    function wxshare(){
        wx.error(function(res){
            if(_global.wechat_js_config['appId'] =='wxe40f036501e26e17'){
                //alert(res['errMsg']);
            }
        });
        wx.config({
            debug: false,//_global.wechat_js_config['appId'] =='wx59c453d03acc9061' ? true : false,
//            appId: _global.wechat_js_config['appId'],
//            timestamp: _global.wechat_js_config['timestamp'],
//            nonceStr: _global.wechat_js_config['nonceStr'],
//            signature: _global.wechat_js_config['signature'],
            appId: "wxe40f036501e26e17",
            timestamp: 1441701269,
            nonceStr: "wGNH4K0Up0C8LhrZ",
            signature: "8c6bc7e4803b9d37eb7360b78ddd3e1550f15cd3",
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
                        if(appId =='wx59c453d03acc9061'){
                            alert(JSON.stringify(res));
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