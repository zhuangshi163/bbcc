<?php
/**
 * cms首页
 *
 *
 *  锦 尚 中 国 站 长 分 享 圈 子
 */

use Shopnc\Tpl;

defined('InShopNC') or exit('Access Invalid!');
class indexControl extends mobileHomeControl{

	public function __construct() {
        parent::__construct();
    }

    /**
     * 首页
     */
	public function indexOp() {
		$this->init();
        $model_mb_special = Model('mb_special'); 
        $data = $model_mb_special->getMbSpecialIndex();
        $this->_output_special($data, $_GET['type']);
	}

	public function wxshareOp(){
		require_once BASE_DATA_PATH."/wxsdk/jssdk.php";
		$jssdk = new JSSDK("wx4049393d02de5fd0", "bcdd26a8569dd54ec66c05a8e65ca6ea");
		$signPackage = $jssdk->GetSignPackage();
		output_data($signPackage);
	}
	
	public function wxinitOp(){
		if(!$_COOKIE['key']){
    		$agent = $_SERVER['HTTP_USER_AGENT'];
    		//if(strpos($agent,"icroMessenger") && ((!isset($_GET['uid']) && empty($_SESSION["uid"])) || isset($_GET['refresh']))) {
    		include BASE_PATH . '/Common/Wechat/Wechat.class.php';
    		$options = array (
    				'token' => '123456', // 填写你设定的key
    				'encodingaeskey' => 'M6Te15pEUWjIgNpub8blEWZPbM3PKllkk3reeUCC6hb', // 填写加密用的EncodingAESKey
    				'appid' => 'wx4049393d02de5fd0', // 填写高级调用功能的app id
    				'appsecret' => 'bcdd26a8569dd54ec66c05a8e65ca6ea', // 填写高级调用功能的密钥
    				'partnerid' => '1221289101', // 财付通商户身份标识
    				'partnerkey' => '189d226818c1556bfef8ed44f397358c', // 财付通商户权限密钥Key
    				'paysignkey' => ''  // 商户签名密钥Key
    		);
    
    		//Array ( [token] => 123456 [encodingaeskey] => M6Te15pEUWjIgNpub8blEWZPbM3PKllkk3reeUCC6hb [appid] => wxe8523e4bd5e51d33 [appsecret] => 3394ce389b5e1006b4cefcbddbd3a8c7 [partnerid] => 1234151502 [partnerkey] => shiyoutryapp88888888888888888888 [paysignkey] => )
    		$weObj = new Wechat ( $options );
    		 
    		$info = $weObj->getOauthAccessToken();
    		//echo 'wwwwwwwwwwwwwwwwwwwwwwwww';
    		//print_r($info);
    		if(!$info)
    		{
    			$callback = 'http://' . $_SERVER ['SERVER_NAME']. '/mobile/index.php?act=index&op=wxinit';
    			//$url = $weObj->getOauthRedirect($callback,'','snsapi_base');
    			$url = $weObj->getOauthRedirect($callback,'','snsapi_userinfo');
    			//echo $url;die;
    			header("Location: $url");
    			//exit();
    			//output_data(array('wxurl' => $url));
    	   
    		}
    		else
    		{
    			//$_SESSION['wxopenid'] = $_POST['wxopenid'] = $_GET['wxopenid'] = $info['openid'];
    		}
    		//echo 'eeeeeeeeeeeee';die;
    		$wx_detail = $weObj->getOauthUserinfo($info['access_token'],$info['openid']);
    		//}
    		//Array ( [openid] => o93QYt6K_vjkXgd5ddFAWffirv0M [nickname] => 尧哥 电商CTO [sex] => 1 [language] => zh_CN [city] => Guangzhou [province] => Guangdong [country] => CN [headimgurl] => http://wx.qlogo.cn/mmopen/KXgfJ4tnBtex5QSxp1ecRCL5icMicicPbib4GTiacSpK92ic3tHp6zjPTr7Z8vCbZdjYg4PPI3S5E4FFwfe9qaPFicoVCqD7rV8OUAA/0 [privilege] => Array ( ) )
    		//print_r($info);
    		//echo 'eeeeeeeeeee';
    		//print_r($wx_detail);die;
    
    		if ($wx_detail['openid']) {
    
    			$openid = $wx_detail["openid"];
    			$model_member = Model('member');
    			$member_info = $model_member->getMemberInfo(array('member_wxopenid'=>$openid));
    			$member_id = isset($member_info['member_id'])?$member_info['member_id']:'';
    			//if(strpos($agent,"icroMessenger") && strlen($openid)>10) {
    			if(empty($member_id))
    			{
    
    				$member_info	= array();
    				$member_info['member_wxopenid']			= $wx_detail['openid'];
    				$member_info['member_name']			= $wx_detail['nickname'];
    				$member_info['member_passwd']		= md5(strval(TIMESTAMP) . strval(rand(0,999)));
    				$member_info['member_email']		= '';
    
    				//$member_info['member_old_login_ip']	= $member_info['member_login_ip'];
    
    				$member_info['member_truename']		= $wx_detail['nickname'];
    				//$member_info['member_qq']			= $param['member_qq'];
    				$member_info['member_sex']			= $wx_detail['sex'];    				
    				$member_info['member_wxopenid']		= $wx_detail['openid'];
    				$member_info['member_wxinfo']		= json_encode($wx_detail);
    				 
    				$member_info['language']		= $wx_detail['language'];
    				$member_info['city']		= $wx_detail['city'];
    				$member_info['province']		= $wx_detail['province'];
    				$member_info['country']		= $wx_detail['country'];
    				$member_info['wx_shop_name']		= $wx_detail['nickname'];
    				
    				$member_id = $model_member->addMember($member_info);
    				
    				$avatar = $this->download_remote_file_with_curl($wx_detail['headimgurl'],BASE_UPLOAD_PATH.'/'.ATTACH_AVATAR."/avatar_$member_id.jpg");					
					if($avatar) {
						$update_info	= array();
					    $update_info['member_avatar'] 	= "avatar_$member_id.jpg";
	    				$model_member->editMember(array('member_id'=>$member_id),$update_info);
    				}
    			}
    
    			if($member_id) {
    				$token = $this->get_token($member_id, $member_info['member_name'], 'weixin');
    				if($token) {
    					//setNc2Cookie('member_avatar',$member_info['member_avatar']);
    					setNc2Cookie('udid',$member_info['did']);
    					setNc2Cookie('uid',$member_info['member_id']);
    					setNc2Cookie('username',$member_info['member_name']);
    					setNc2Cookie('key',$token);
    					//header("location:".M_SITE_URL.'/index.html');
    					if($member_info['did']){
    						header("location:".M_SITE_URL.'/index.php?did='.$member_info['did']);
    					}elseif ($_COOKIE['did']){//没开通店铺显示推荐的
    						header("location:".M_SITE_URL.'/index.php?did='.$_COOKIE['did']);
    					}else{
    						header("location:".M_SITE_URL.'/index.php?did=1011');
    					}
    					
    					
    					//output_data(array('username' => $member_info['member_name'],'memberid' => $member_info['member_id'], 'key' => $token));
    				} else {
    					//output_error('注册失败');
    				}
    			} else {
    				//output_error($member_info['error']);
    			}
    
    			//}
    		}
    	}
    	//header("location:".M_SITE_URL.'/index.html');
	}
    /**
     * 专题
     */
	public function specialOp() {
        $model_mb_special = Model('mb_special'); 
        $data = $model_mb_special->getMbSpecialItemUsableListByID($_POST['special_id']);
        $this->_output_special($data, $_GET['type'], $_POST['special_id']);
	}

    /**
     * 输出专题
     */
    private function _output_special($data, $type = 'json', $special_id = 0) {
        $model_special = Model('mb_special');
        if($_GET['type'] == 'html') {
            $html_path = $model_special->getMbSpecialHtmlPath($special_id);
            if(!is_file($html_path)) {
                ob_start();
                Tpl::output('list', $data);
                Tpl::showpage('mb_special');
                file_put_contents($html_path, ob_get_clean());
            }
            header('Location: ' . $model_special->getMbSpecialHtmlUrl($special_id));
            die;
        } else {
            output_data($data);
        }
    }

    /**
     * android客户端版本号
     */
    public function apk_versionOp() {
		$version = C('mobile_apk_version');
		$url = C('mobile_apk');
        if(empty($version)) {
           $version = '';
        }
        if(empty($url)) {
            $url = '';
        }

        output_data(array('version' => $version, 'url' => $url));
    }
    
    public function getDianInfoBydidOp(){
    	if(!$_POST['did']){
    		$_POST = $_GET;
    	}
    	$did = intval($_POST['did']);
    	
    	if($did){
    		$member_info = array();
    		$model_member = Model('member');
    		$member_info = $model_member->getMemberInfo(array('did'=>$did),'member_id,member_avatar,member_name,member_time,available_predeposit,sum_commission,a_cnt,b_cnt,c_cnt,outlet_count,did,wx_shop_name');
    		$member_info['member_avatar'] = getMemberAvatarForID($member_info['member_id']);
    		$member_info['member_date'] = date('Y-m-d H:i:s',$member_info['member_time']);
    		$member_info['team_count'] = $member_info['a_cnt'] + $member_info['b_cnt'] + $member_info['c_cnt'];
    		
    		$member_info['did'] = $member_info['did'];
    		$member_info['user_name'] = $member_info['member_name'];
    		//print_r($member_info);die;
    		output_data(array('member_info' => $member_info));
    	}
    	
    }
    
}