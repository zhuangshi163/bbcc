$(function() {
    var specialId = GetQueryString("sid");
    var articleId = GetQueryString("aid");
    
    $.ajax({
        url: ApiUrl + "/index.php?act=index&op=special",
        type: 'post',
        data: {special_id: specialId},
        dataType: 'json',
        success: function(result) {
            var data = result.datas;
            var html = '';

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

            $("#main-container").html(html);

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

        }
    });

    
   // alert(articleId);
    if(articleId){
		$.ajax({
	        type: 'post',
	        url: ApiUrl + '/index.php?act=article&op=show',
	        data: {
	    //        key: key,
	        	articleId: articleId
	        },
	        dataType: 'json',
	        success: function(result) {
	        	$('title').text(result.datas.article_title);
	        	$('#article').html(result.datas.article_content);
	
				$('body').attr('wmall-title',result.datas.article_title);
				$('body').attr('wmall-desc',result.datas.article_info);
				$('body').attr('wmall-icon',result.datas.wmall_icon);
				//$('body').attr('wmall-link','http://bbcc.meec.hk/m/index.html?did='+did);
				$('body').attr('wmall-link','http://bbcc.meec.hk/m/new.php?sid='+specialId+'&aid='+articleId);
	        }
	    });
	}
});