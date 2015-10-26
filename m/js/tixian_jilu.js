$(function() {
	var key = getcookie('key');
	if (key == '') {
		location.href = ApiUrl+'/index.php?act=index&op=wxinit';
	}
		

	$.ajax({
		type : 'post',
		url : ApiUrl + "/index.php?act=predeposit&op=pd_cash_list",
		data : {
			key : key
		},
		dataType : 'json',
		// jsonp:'callback',
		success : function(result) {
				if(!result.datas.error){
					var html = '';
					 $.each(result.datas, function(k, v) {
						 html +=					'						<div class="well-stand">'+
							'							<div class="item">'+
							'								<p class="f15 mb5 clearfix">'+
							'									<span class="left">'+v.pdc_bank_user+'</span><span class="right f14"'+
							'										style="margin-right: 10px;">申请单号:'+v.pdc_sn+'</span>'+
							'								</p>'+
							'								<p class="i-right">'+formatdate(v.pdc_add_time)+'</p>'+
							'								'+
							'							</div>'+
							'							<div class="item">'+
							'								<p class="f16 mb5">-'+v.pdc_amount+'</p>'+
							'								'+
							'							</div>'+
							'						</div>';
					 });
					
					 $("#page").html(html);
				}else{
					
				$("#page").html('						<div class="well-empty" style="padding-top: 100px;">'+
						'							<i class="iconfont main-icon"></i>'+
						'							<p class="text-info">您还没有余额提现的记录哦～</p>'+
						'						</div>');
				}
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
//	function Tips(e, t) {// <div class="tips error-tips">提现金额不能为空</div>
//		function n() {
//			var t = '<div class="tips ' + e + '">' + i + "</div>";
//			$("body").append(t);
//			var n = $("." + e), o = n.width() + 32, a = n.height() + 16;
//			n.css({
//				"margin-left" : "-" + o / 2 + "px",
//				"margin-top" : "-" + a / 2 + "px"
//			}), r()
//		}
//		function r() {
//			var t = $("." + e);
//			animate({
//				opacity : 0
//			}, {
//				duration : o,
//				complete : function() {
//					$(this).remove()
//				}
//			})
//		}
//		var i = t.content, o = t.time || 2e3;
//		n()
//	}
//	
//
//	function animate(e,t,n,r){var i=ct.isEmptyObject(e),o=ct.speed(t,n,r),a=function(){var t=$(this,ct.extend({},e),o);(i||ct._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)}
	

});

//function check(e) {
//	var t = $.trim($("input[name='withdrawal_amount']").val());
//	if ("" == t)
//		return Tips("error-tips", {
//			content : "提现金额不能为空"
//		}), !1;
//	if (t = parseFloat(t), 0 > t)
//		return Tips("error-tips", {
//			content : "提现金额必须大于0"
//		}), !1;
//	if (t < _withdrawal_amount)
//		return Tips("error-tips", {
//			content : "最低提现" + _withdrawal_amount + "元"
//		}), !1;
//	if (t > parseFloat(_balance.balance))
//		return Tips("error-tips", {
//			content : "您只有" + _balance.balance + "元"
//		}), !1;
//	var n = {
//		shop_id : _global.shop.id,
//		account_id : $(".js-item").data("id"),
//		apply_amount : t
//	};
//	this.model.set(n);
//	var a = this;
//	$(e.currentTarget).text("正在提交..."), this.undelegateEvents(), this.model
//			.save("", "", {
//				success : function(t, n) {
//					if (1 == n.status)
//						window.location.href = "#audit/" + n.id;
//					else {
//						var i = "";
//						for ( var s in n.errors) {
//							i = n.errors[s];
//							break
//						}
//						Tips("error-tips", {
//							content : i
//						}), $(e.currentTarget).text("提现"), a.delegateEvents()
//					}
//				}
//			}, {
//				error : function() {
//					Tips("error-tips", {
//						content : "申请失败"
//					}), $(e.currentTarget).text("提现"), a.delegateEvents()
//				}
//			})
//}