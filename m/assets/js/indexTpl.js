/**
author : zhupinglei
desc : 自定义模板
**/
$(document).ready(function(){
    $.ajax({
        url : '/api/design_page/',
        type : 'get',
        dataType : 'json',
        data : {
            shop_id : _global.shop.id,
            page_code : 'index'
        }
    })
	.done(function(res){
		if( res.data && res.data.length ){
            $.each(res.data,function(i,item){
                var type=item.type;
                if((!(_global.shop.stype == 1 && _global.did > 0 && type == 'shop_banner')) && type!='config') {
                    var template = doT.template($("#"+type+"-tpl").html());
                    $("#wrap").append(template(item));
                }
                if(!(_global.did > 0)&& type=='config'&&item.param.title!=document.title){
                    setTitle(item.param.title)
                }
                if(type=='goods_search'){
                    goods_search();
                }
                if(type=='swiper')
                {
                    swipe(item.listorder,item.prop)
                }
            })
		}
		$(".loading").hide();
        $("img.lazy").lazyload({effect: "fadeIn"});
    })
    function goods_search(){
        $('.topSearch a').on('click',function(){
            var title = $('.topSearch input').val();
            if( title ){
                window.sessionStorage.setItem('searchTitle',title);
                window.location.href = '/cate/';
            }else{
                zAlert.Alert({
                    width : 200,
                    content : '<p style="padding:10px 0;">请输入搜索关健字...</p>',
                    callback : function(){
                        zAlert.Close();
                    }
                })
            }
        })
        $('.topSearch input').keydown(function(event) {
            if(event.keyCode == '13')
            {
                $('.topSearch a').trigger('click')
            }else{
                console.log('error')
            }
        });
    }
    function swipe(listorder,prop){
        var swiper_setting = {
            pagination: '.pagination.listorder-'+listorder,
            loop:true,
            grabCursor: true,
            paginationClickable: true,
            calculateHeight: false
        };
        if ( prop.autoplay && prop.autoplay != '0') {
            swiper_setting['autoplay'] = prop.autoplay;
        }
        new Swiper('.swiper-container.listorder-'+listorder,swiper_setting);
    }
    function setTitle(title){
        document.title = title;
        var $body = $('body');
        var $iframe = $('<iframe src="./empty.html" style="display:none;"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body);
    }
})