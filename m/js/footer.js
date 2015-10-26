$(function (){
	
    var act = GetQueryString("act");
    var indexactive = '';
    var outletactive = '';
    var buyactive = '';
    var memberactive = '';
    if(act == "member"){
    	memberactive = 'class="active"';
    }else if(act == "buy"){
    	buyactive = 'class="active"';
    }else if(act == "outlet" || act == "fenxiao"){
    	outletactive = 'class="active"';
    }else{
    	indexactive = 'class="active"';
    }
	
      // var did = GetQueryString("did");
   
    var udid = getcookie('udid');
    if(udid==0 || udid == ''){
    	 var outletHtml = '<a href="'+WapSiteUrl+'/outlet.html?act=outlet"><i class="iconfont"></i> <span>成为分销商</span></a>';
    }else{
    	  var outletHtml = '<a href="'+WapSiteUrl+'/fenxiao.html?act=fenxiao"><i class="iconfont"></i> <span>分销中心</span></a>';

    }
    
    var did = getcookie('udid');

     if(did==0 || did == ''){
    	 did = getcookie('did')
		if(did==0 || did == ''){
		 	did = GetQueryString('did');
		 	//alert(did);
		     if(did){
		     	addcookie('did',did);
		     }
		}    	
     }
    var tmpl = '<ul class="menu-list">'+
		'<li '+indexactive+'><a href="'+WapSiteUrl+'/index.php?did='+did+'"> <i class="iconfont"></i> <span>微店</span>'+
		'</a></li>'+
		'<li '+outletactive+'>'+outletHtml+'</li>'+
		'<li '+buyactive+'><a href="'+WapSiteUrl+'/tmpl/cart_list.html?act=buy"> <i class="iconfont"></i>'+
		'		<span>购物车</span>'+
		'</a></li>'+
		'<li '+memberactive+'><a href="'+WapSiteUrl+'/member.html?act=member"> <i class="iconfont"></i>'+
		'		<span>我的</span>'+
		'</a></li>'+
	'</ul>';
	//$("#footer").html(tmpl);
	$("#footer-fixed-edit-1").html(tmpl);
	
});