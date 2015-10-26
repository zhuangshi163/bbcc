$(function(){
		var did = GetQueryString('did');

		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=index&op=getDianInfoBydid",	
			data:{did:did},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				//checklogin(result.login);
				$('#username').html(result.datas.member_info.user_name);
				//$('#point').html(result.datas.member_info.point);
				//$('#predepoit').html(result.datas.member_info.predepoit);
				$('#avatar').attr("src",result.datas.member_info.member_avatar);
				$('#erweima').attr("src",ErWeiMaUrl+'/'+result.datas.member_info.did+'.png');				
				return false;
			}
		});
});