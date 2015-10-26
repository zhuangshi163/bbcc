$(function() {
	var key = getcookie('key');
	if (key == '') {
		location.href = ApiUrl+'/index.php?act=index&op=wxinit';
	}
	$(".js-cash-submit").click(function() {
		var pdc_bank_user = $("input[name='name']").val();
		var pdc_bank_name = $("select[name='withdrawal_way']").val();
		var pdc_bank_no = $("input[name='account']").val();
		var confirmAccount = $("input[name='confirmAccount']").val();
		var t = $.trim($("input[name='withdrawal_amount']").val());

		if ("" == t)
			return Tips("error-tips", {
				content : "提现金额不能为空"
			}), !1;
		if (t = parseFloat(t), 0 > t)
			return Tips("error-tips", {
				content : "提现金额必须大于0"
			}), !1;
		
		if (confirmAccount != pdc_bank_no)
			return Tips("error-tips", {
				content : "提现账号不一致"
			}), !1;
		// if (t < _withdrawal_amount)
		// return Tips("error-tips", {
		// content : "最低提现" + _withdrawal_amount + "元"
		// }), !1;
		// if (t > parseFloat(_balance.balance))
		// return Tips("error-tips", {
		// content : "您只有" + _balance.balance + "元"
		// }), !1;
		
		
		$(this).text("正在提交...");

		$.ajax({
			type : 'post',
			url : ApiUrl + "/index.php?act=predeposit&op=pd_cash_add",
			data : {
				key : key,
				pdc_bank_user : pdc_bank_user,
				pdc_bank_no : pdc_bank_no,
				pdc_bank_name : pdc_bank_name,
				pdc_amount : t
			},
			dataType : 'json',
			// jsonp:'callback',
			success : function(result) {
				if(!result.datas.error){
					location.href = 'tixian_jilu.html';
				}else{
					
					Tips("error-tips", {content : result.datas.error});
					$(".js-cash-submit").text("提现");
				}
			}
		});
	});

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