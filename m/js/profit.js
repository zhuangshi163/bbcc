$(function() {
	$.ajax({
        type: 'post',
        url: ApiUrl + '/index.php?act=profit&op=index',
        data: {
    //        key: key,
    //        did: did
        },
        dataType: 'json',
        success: function(result) {
        	$sumprofit = 0;
        	$.each(result.datas, function(k, v) {
        		
        		if(v.level == 1){
        			$('#onelevel').text('￥'+v.profitnum);
        			$sumprofit = $sumprofit + Number(v.profitnum);
        		}else if(v.level == 2){
        			$('#twolevel').text('￥'+v.profitnum);
        			$sumprofit = $sumprofit + Number(v.profitnum);
        		}else{
        			$('#threelevel').text('￥'+v.profitnum);
        			$sumprofit = $sumprofit + Number(v.profitnum);
        		}
        	});
        	$('#profitamount').text($sumprofit);
        }
    });
});
