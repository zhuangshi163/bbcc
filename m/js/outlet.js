    	$(function() {
 
    		var udid = getcookie('udid');
    		if(!(udid==0 || udid == '')){
    			location.href = WapSiteUrl+'/fenxiao.html?did='+udid;
    		}
    		
    	    var key = getcookie('key');
    	    if(key == ''|| key == 'null'){
    	    	key = GetQueryString('key');
    	    	addcookie('key',key);
    	    	
    	    }
    	   
    	    var did = GetQueryString('did'); 
    	    if(!did){
    	    	 did = getcookie('did');
    	    }
			if(did){
	      	    $.ajax({
	      	        type: 'post',
	      	        url: ApiUrl + '/index.php?act=index&op=getDianInfoBydid',
	      	        data: {
	      	            did: did
	      	        },
	      	        dataType: 'json',
	      	        success: function(result) {
	      	            var member_info = result.datas.member_info;
	      	           // $('.shop-logo').attr('src',member_info.member_avator);
	      	            $('.shop-inviter').html(member_info.member_name);
	      	        }
	      	    });	
			}
			//alert('dddd');
            $.sValid.init({
                rules:{
                    true_name:"required",
                    mob_phone:"required"
                },
                messages:{
                    true_name:"姓名必填！",
                    mob_phone:"手机号必填！"
                },
                callback:function (eId,eMsg,eRules){
                    if(eId.length >0){
                        var errorHtml = "";
                        $.map(eMsg,function (idx,item){
                            errorHtml += "<p>"+idx+"</p>";
                        });
                        $(".error-tips").html(errorHtml).show();
                    }else{
                         $(".error-tips").html("").hide();
                    }
                }  
            });
    	    $('.js-apply-btn').click(function() {
                if($.sValid()){
        	        var true_name = $('input[name=true_name]').val();
        	        var mob_phone = $('input[name=mob_phone]').val();

        	        $.ajax({
        	            type: 'post',
        	           // type: 'get',
        	            url: ApiUrl + "/index.php?act=member_index&op=updateMember",
        	            data: {
        	                key: key,
        	                true_name: true_name,
        	                mob_phone: mob_phone,
        	                did: did
        	            },
        	            dataType: 'json',
        	            success: function(result) {
        	            	//alert(result);
        	                if (result.datas.udid) {
        	                	$("#content").html("").hide();
        	                	var html = '<div class="t_center"><div class="icon-logo"><i class="iconfont" style="color:#00cc32;">&#xe62b</i></div><p class="f15 gdeep-gray mb20">您的分销申请已经通过审核！</p><a class="btn-radius btn-warning" href="'+WapSiteUrl+'/index.php?did='+result.datas.udid+'">进入我的小店</a></div>';
        	                	$("#view-apply").append(html);
        	                	addcookie('udid',result.datas.udid);
        	                   // location.href = WapSiteUrl + '/tmpl/member/address_list.html';
        	                } else {
        	                    //location.href = WapSiteUrl;
        	                }
        	            }
        	        });
                }
    	    });
    	});