$(function(){
		var key = getcookie('key');
		if(key==''){
			location.href = ApiUrl+'/index.php?act=index&op=wxinit';
		}
		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=member_index&op=getAdImg",	
			data:{key:key},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				checklogin(result.login);
				var did = result.datas.did;
				if(did){
					$('#adImg').attr('src',result.datas.adImg);
					//alert(result.datas.member_avatar);
					$('body').attr('wmall-title',result.datas.wx_shop_name+'的商城');
					$('body').attr('wmall-icon',result.datas.member_avatar);
					$('body').attr('wmall-link','http://bbcc.meec.hk/m/index.php?did='+did);
				}

				return false;
			}
		});
});