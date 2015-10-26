$(function(){
		var key = getcookie('key');
		if(key==''){
			location.href = ApiUrl+'/index.php?act=index&op=wxinit';
		}
		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=predeposit&op=tixiao_step1",	
			data:{key:key},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				//checklogin(result.login);
				//$('#username').html(result.datas.member_info.user_name);
				//$('#point').html(result.datas.member_info.point);
				$('#predepoit').html('¥'+result.datas.member_info.predepoit);
				//$('#avatar').attr("src",result.datas.member_info.avator);
				return false;
			}
		});
});