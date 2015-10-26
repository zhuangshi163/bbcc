$(function() {
    var did = getcookie('udid');
    if(did==0 || did == ''){
    	//alert('2222');
    	did = GetQueryString('did');
    	//alert(did);
        if(did==0 || did == ''){
        	did = getcookie('did');
        }else{
        	addcookie('did',did);
        }
    	
    }
    
	if(!getcookie('key')){
		//window.location.href = 'http://bbcc.meec.hk/mobile/index.php?act=index&op=wxinit';
		window.location.href = ApiUrl+'/index.php?act=index&op=wxinit';
		
	}
	
    $.ajax({
        url: ApiUrl + "/index.php?act=index&rurl=index",
        type: 'post',
        dataType: 'json',
        success: function(result) {
            var data = result.datas;
    
	
	//var data = [{"adv_list":{"item":[{"image":"http://bbcc.meec.hk/data/upload/mobile/special/s0/s0_04956785470845184.jpg","type":"keyword","data":"皮鞋"},{"image":"http://bbcc.meec.hk/data/upload/mobile/special/s0/s0_04956786086641906.jpg","type":"keyword","data":"皮鞋"}]}},{"home1":{"title":"","image":"http://bbcc.meec.hk/data/upload/mobile/special/s0/s0_04958426141150204.jpg","type":"","data":""}},{"home1":{"title":"","image":"http://bbcc.meec.hk/data/upload/mobile/special/s0/s0_04956786496439647.jpg","type":"","data":""}},{"home1":{"title":"","image":"http://bbcc.meec.hk/data/upload/mobile/special/s0/s0_04958430447974545.jpg","type":"","data":""}},{"home1":{"title":"","image":"http://bbcc.meec.hk/data/upload/mobile/special/s0/s0_04958447951651339.jpg","type":"","data":""}},{"goods":{"title":"爆款热卖","item":[{"goods_id":"100694","goods_name":"2015新款头层真皮商务系带增高男鞋正装鞋婚鞋高档男皮鞋vs维思诺","goods_promotion_price":"1280.00","goods_marketprice":"1280.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_f9c82561a9e5c726cd044b2368509ee9_240.jpg"},{"goods_id":"100695","goods_name":"2015新款必登高正品高档头层牛皮套脚轻质商务正装真皮男鞋维思诺","goods_promotion_price":"598.00","goods_marketprice":"598.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_04accbdf10c03b47c756a97a2099c208_240.jpg"},{"goods_id":"100697","goods_name":"2015新款天方爵士隐形内增高系带真皮商务正装男鞋皮鞋vs 维思诺","goods_promotion_price":"1380.00","goods_marketprice":"1380.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_ba04bb98d8ef3287a9503e08043d243a_240.jpg"},{"goods_id":"100696","goods_name":"天方爵士布洛克编织雕花头层牛皮内增高商务正装男鞋婚鞋vs维思诺","goods_promotion_price":"1680.00","goods_marketprice":"1680.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_0470121a5222c461cacdaafb393fbfec_240.jpg"},{"goods_id":"100691","goods_name":"健乐士 男式鞋 正品休闲鞋 反绒真牛皮 维思诺 专柜 1212万能盛典","goods_promotion_price":"598.00","goods_marketprice":"598.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_eeb102f66e3e38c507eb5e98982dfeac_240.jpg"},{"goods_id":"100690","goods_name":"促销特价保证100%正品男士休闲皮鞋真皮皮鞋男式正装商务VS维思诺","goods_promotion_price":"598.00","goods_marketprice":"598.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_74e29ed690125e465178dc4e734978b7_240.jpg"},{"goods_id":"100693","goods_name":"2015新款热销简约系带头层牛皮正装鞋 商务休闲真皮男鞋vs维思诺","goods_promotion_price":"668.00","goods_marketprice":"668.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_d1e9fec08597e3066ccc165e79ea4414_240.jpg"},{"goods_id":"100689","goods_name":"品牌特卖2015新品内增高男式鞋6cm真皮头层皮搭扣套脚鞋VS维思诺","goods_promotion_price":"1280.00","goods_marketprice":"1280.00","goods_salenum":"0","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_9e9cc7b525bf95fc2e68cc9de8be8afd_240.jpg"}]}},{"goods":{"title":"镇店之宝","item":[{"goods_id":"38","goods_name":"正品 2014春装新款 女 绣花针织衫 开衫外套浮桑初 蓝色","goods_promotion_price":"158.00","goods_marketprice":"702.00","goods_salenum":"3","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_04418207207476705_240.jpg"},{"goods_id":"44","goods_name":"2014春款打底毛衫拼色毛衣 长袖套头针织衫 莺 橙色","goods_promotion_price":"179.00","goods_marketprice":"568.00","goods_salenum":"3","goods_image":"http://bbcc.meec.hk/data/upload/shop/store/goods/1/1_04418211855225368_240.jpg"}]}}];
		var html ='';
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
        $("#wrap").append(html);
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
    
        
 }}); 
        
       
	
   // alert(did);
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
	           //alert(member_info.member_name);
	            //$(".shop-goods-count").text(result.data.cgoods);
	            if (member_info.member_avatar != "") {
					$('.outlet-header-img').attr('src',member_info.member_avatar);
					$('body').attr('wmall-title',member_info.wx_shop_name+'的商城');
					$('body').attr('wmall-icon',member_info.member_avatar);
					//$('body').attr('wmall-link','http://bbcc.meec.hk/m/index.html?did='+did);
					$('body').attr('wmall-link','http://bbcc.meec.hk/m/index.php?did='+did);
					//wxshare();
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

    $('.search-btn').click(function(){
        var keyword = encodeURIComponent($('#keyword').val());
        location.href = WapSiteUrl+'/tmpl/product_list.html?keyword='+keyword;
    });
    
});
