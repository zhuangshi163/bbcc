$(function() {

    $.ajax({
        url: ApiUrl + "/index.php?act=index&rurl=index",
        type: 'post',
        dataType: 'json',
        success: function(result) {
            var data = result.datas;
            var html = '';
            //alert('11111');
			if(data.wxurl){
				//alert(data.wxurl);
				window.location.href = data.wxurl;
			}
            $.each(data, function(k, v) {
                $.each(v, function(kk, vv) {
                    switch (kk) {
                        case 'adv_list':
                        case 'home3':
                            $.each(vv.item, function(k3, v3) {
                                vv.item[k3].url = buildUrl(v3.type, v3.data);
                            });
                            break;

                        case 'home1':
                            vv.url = buildUrl(vv.type, vv.data);
                            break;

                        case 'home2':
                        case 'home4':
                            vv.square_url = buildUrl(vv.square_type, vv.square_data);
                            vv.rectangle1_url = buildUrl(vv.rectangle1_type, vv.rectangle1_data);
                            vv.rectangle2_url = buildUrl(vv.rectangle2_type, vv.rectangle2_data);
                            break;
                    }
                    html += template.render(kk, vv);
                    return false;
                });
            });

            //$("#wrap").html(html);

            $("#wrap").append(html);
            
           /* $("#wrap").append('<div listorder="11" class="image-list style3"><ul class="clearfix">'+
			'<li style="height: auto"><a'+
				'href="http://wpa.qq.com/msgrd?v=3&amp;uin=3075955484&amp;site=qq&amp;menu=yes"><img class="" src="http://2.s.bama555.com/2/wbmall/design/1505/08/554c2ed1b9bb5.png" data-original="http://2.s.bama555.com/2/wbmall/design/1505/08/554c2ed1b9bb5.png"'+
					'alt="null" style="display: block;"> </a></li>'+
			'<li style="height: auto"><a href="javacript:void(0)"><img class="" src="http://3.s.bama555.com/3/wbmall/design/1505/08/554c2fa2e63ce.jpg"'+
					'data-original="http://3.s.bama555.com/3/wbmall/design/1505/08/554c2fa2e63ce.jpg"'+
					'alt="null" style="display: block;"> </a></li>'+
			'<li style="height: auto"><a href="javacript:void(0)"><img class="" src="http://2.s.bama555.com/2/wbmall/design/1505/08/554c2fac96953.jpg"'+
					'data-original="http://2.s.bama555.com/2/wbmall/design/1505/08/554c2fac96953.jpg"'+
					'alt="null" style="display: block;"> </a></li>'+
		'</ul></div>');*/

            var did = getcookie('udid');
            if(!did){     	
            	did = GetQueryString('did');
                if(did){
                	addcookie('did',did);
                }
            	
            }
			if(did){
				$.ajax({
			        type: 'post',
			        url: ApiUrl + '/index.php?act=index&op=getDianInfoBydid',
			        data: {
			    //        key: key,
			            did: did
			        },
			        dataType: 'json',
			        success: function(result) {
			            var member_info = result.datas.member_info;
			            //$(".shop-goods-count").text(result.data.cgoods);
			            if (member_info.member_avatar != "") {
							$('.outlet-header-img').attr('src',
									member_info.member_avatar);
						} else {
							$('.outlet-header-img')
									.attr('src', member_info.member_avatar);
						}

						if (did == getcookie('udid')) {//自己店铺
							$('.shop-name')
									.html(
											'<span>'
													+ member_info.member_name
													+ '</span> <i class="iconfont" style="font-size: 18px;">&#xe639;</i>');
						} else {
							$('.shop-name')
									.html(
											'<span>'
													+ member_info.member_name
													+ '</span>');
						}
			        }
			    });
			}
    	    
            
            $('.adv_list').each(function() {
                if ($(this).find('.item').length < 2) {
                    return;
                }

                Swipe(this, {
                    startSlide: 2,
                    speed: 400,
                    auto: 3000,
                    continuous: true,
                    disableScroll: false,
                    stopPropagation: false,
                    callback: function(index, elem) {},
                    transitionEnd: function(index, elem) {}
                });
            });

    		$(".loading").hide();
            $("img.lazy").lazyload({effect: "fadeIn"});
        }
    });

    $('.search-btn').click(function(){
        var keyword = encodeURIComponent($('#keyword').val());
        location.href = WapSiteUrl+'/tmpl/product_list.html?keyword='+keyword;
    });

});
