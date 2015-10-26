    	$(function() {
 
    	    var key = getcookie('key');
    	    if(key == ''){
    	    	key = GetQueryString('key');
    	    	addcookie('key',key);
    	    	
    	    }
    	   
			if(key){
	      	    $.ajax({
	      	        type: 'post',
	      	        url: ApiUrl + '/index.php?act=member_index&op=getMemberInfo',
	      	        data: {
	      	        	key: key
	      	        },
	      	        dataType: 'json',
	      	        success: function(result) {
	      	            var member_info = result.datas.member_info;
	      	           
	    $viewhtml = '<div class="header">'+
	      	        '				<div class="head-img">'+
	      	        '					<img'+
	      	        '						src="'+member_info.member_avatar+'"'+
	      	        '						alt="">'+
	      	        '				</div>'+
	      	        '				<div class="user-info">'+
	      	        '					<div class="user-name">'+member_info.member_name+'</div>'+
	      	        '					<div class="date-time">加入时间：'+member_info.member_date+'</div>'+
	      	        '				</div>'+
	      	        '			</div>'+
	      	        '			<section class="outlet-info" style="height: 200px;">'+
	      	        '				<a class="block" href="javascript: void(0);"><div class="mark-text">'+
	      	        '						累计佣金：'+member_info.sum_commission+' 元<!--<i class="right iconfont icon-jiantouyou"></i>-->'+
	      	        '					</div>'+
	      	        '					<div class="mark-text">可提佣金（元）</div> </a>'+
	      	        '				<div class="amount-box clearfix">'+
	      	        '					<span class="amount js-cach-amount">'+member_info.available_predeposit+'</span> <a'+
	      	        '						href="tixian.html" class="op5 js-cash-tip">提现</a>'+
	      	        '				</div>'+
	      	        '			</section>'+
	      	        '			<section class="outlet-nav">'+
	      	        '				<ul class="clearfix">'+
	      	        '					<li style="height: auto;"><a'+
	      	        '						href="profit.html?act=profit"> <span class="iconfont icon-qiandaizi"></span>'+
	      	        '							<div class="title">收益统计</div>'+
	      	        '							<div class="desc">'+
	      	        '								<span>'+member_info.sum_commission+'</span>元'+
	      	        '							</div>'+
	      	        '					</a></li>'+
	      	        '					<li style="height: auto;"><a'+
	      	        '						href="team.html?act=team"> <span class="iconfont icon-wodekehu"></span>'+
	      	        '							<div class="title">我的团队</div>'+
	      	        '							<div class="desc">'+
	      	        '								<span>'+member_info.team_count+'</span>个伙伴'+
	      	        '							</div>'+
	      	        '					</a></li>'+
	      	        '					<li style="height: auto;"><a'+
	      	        '						href="order.html?act=order"> <span class="iconfont icon-fenxiao"></span>'+
	      	        '							<div class="title">分销订单</div>'+
	      	        '							<div class="desc">'+
	      	        '								<span>'+member_info.outlet_count+'</span>个订单'+
	      	        '							</div>'+
	      	        '					</a></li>'+
	      	        '					<li style="height: auto;"><a'+
	      	        '						href="'+WapSiteUrl+'/share.php">'+
	      	        '							<span class="iconfont icon-yemiantuiguang"></span>'+
	      	        '							<div class="title">二维码</div>'+
	      	        '							<div class="desc">推广二维码</div>'+
	      	        '					</a></li>'+
	      	        '					<li style="height: auto;"><a class="myinform"'+
	      	        '						href="javascript: void(0);"> <span'+
	      	        '							class="iconfont icon-jikediancanicon17"></span>'+
	      	        '							<div class="title">我的通知</div>'+
	      	        '							<div class="desc">'+
	      	        '								<span>0</span>条通知'+
	      	        '							</div>'+
	      	        '					</a></li>'+
	      	        '					<li style=height: auto;"><a href="material.html?act=material">'+
	      	      '							<span class="iconfont icon-tuwenxiangqing"></span>'+
	      	    '							<div class="title">推广素材</div>'+
	      	    '							<div class="desc">分享转发素材</div>'+
	      	    '					</a></li>';
	      	        '				</ul>'+
	      	        '			</section>'+
	      	        '			<div class="new-dialog js-select-cash" style="display: none">'+
	      	        '				<div class="bg" onclick="$(\'.js-select-cash\').hide()"></div>'+
	      	        '				<div class="body" style="margin-top: -37px;">'+
	      	        '					<p class="js-cash-dialog" data-type="1">转到余额</p>'+
	      	        '					<p class="js-cash-dialog" data-type="0">提现到账户</p>'+
	      	        '				</div>'+
	      	        '			</div>';
	      	            
	      	            $('#view-center').html($viewhtml);
	      	        }
	      	    });	
			}else{
				//window.location.href = WapSiteUrl;
			}
    	});