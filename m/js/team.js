$(function(){
		var key = getcookie('key');
		if(key==''){
			location.href = ApiUrl+'/index.php?act=index&op=wxinit';
		}
		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=member_index&op=getDianTeam",	
			data:{key:key},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				checklogin(result.login);
				var data = result.datas;
				var html ='';
				 $.each(data, function(k, v) {
					 html +='						<div class="item team-list">'+
					 '							<img'+
					 '								src="'+v.member_avatar+'">'+
					 '							<div class="info">'+
					 '								<p class="f15 mb5 clearfix">'+
					 '									<span class="left">'+v.member_name+'</span><span class="right f14"'+
					 '										style="margin-right: 10px;"><!--13578456547--></span>'+
					 '								</p>'+
					 '								<p class="tint-gray f12">'+formatdate(v.member_time)+'</p>'+
					 '								<!--<p class="tint-gray f12">0个下级分销商</p>-->'+
					 '							</div>'+
					 '							<div class="earning">'+
					 '								<p class="f16 mb5">＋'+v.sum_commission+'</p>'+
					 '								<!--<p class="tint-gray f12">总收入贡献</p>-->'+
					 '								<p class="tint-gray f12">'+
					 '									<!--<span class="red">0</span> 个成员-->'+
					 '								</p>'+
					 '							</div>'+
					 '						</div>';
				 });
				 $(".js-team-list").html(html);
				 $("#teamcount").html(data.length);
//				$('#username').html(result.datas.member_info.user_name);
//				$('#avatar').attr("src",result.datas.member_info.avator);			
				return false;
			}
		});
		
		function formatdate (nS) {
	        var d = new Date(parseInt(nS) * 1000);
	        var s = '';
	        s += d.getFullYear() + '年';
	        s += (d.getMonth() + 1) + '月';
	        s += d.getDate() + '日 ';
	        s += d.getHours() + ':';
	        s += d.getMinutes();
	        return s;
		}
});