<?php
/**
 * mobile父类
 *
 *  锦 尚 中 国 站 长 分 享 圈 子
 */

//use Shopnc\Tpl;

defined('InShopNC') or exit('Access Invalid!');

/********************************** 前台control父类 **********************************************/

class mobileControl{

    //客户端类型
    protected $client_type_array = array('android', 'wap', 'wechat', 'ios');
    //列表默认分页数
    protected $page = 5;


	public function __construct() {
        Language::read('mobile');

        //分页数处理
        $page = intval($_GET['page']);
        if($page > 0) {
            $this->page = $page;
        }
    }
    
    public function init()
    {
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
    			$callback = 'http://' . $_SERVER ['SERVER_NAME']. '/mobile/index.php?act=index&rurl='.$_GET['rurl'];
    			//$url = $weObj->getOauthRedirect($callback,'','snsapi_base');
    			$url = $weObj->getOauthRedirect($callback,'','snsapi_userinfo');
    			//echo $url;die;
    			//header("Location: $url");
    			//exit();
    			output_data(array('wxurl' => $url));
    	   
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
    					header("location:".M_SITE_URL.'/'.$_GET['rurl'].'.html');
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
    }
    
    public function download_remote_file_with_curl($file_url, $save_to)
    {
    	$ch = curl_init();
    	curl_setopt($ch, CURLOPT_POST, 0);
    	curl_setopt($ch,CURLOPT_URL,$file_url);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    	$file_content = curl_exec($ch);
    	curl_close($ch);
    
    	$downloaded_file = fopen($save_to, 'w');
    	$return = fwrite($downloaded_file, $file_content);
    	fclose($downloaded_file);
    	return $return;
    
    }    

    /**
     * 登录生成token
     */
    public function get_token($member_id, $member_name, $client) {
    	$model_mb_user_token = Model('mb_user_token');
    
    	//重新登录后以前的令牌失效
    	//暂时停用
    	//$condition = array();
    	//$condition['member_id'] = $member_id;
    	//$condition['client_type'] = $_POST['client'];
    	//$model_mb_user_token->delMbUserToken($condition); ww w.sho pjl.co m出 品
    
    	//生成新的token
    	$mb_user_token_info = array();
    	$token = md5($member_name . strval(TIMESTAMP) . strval(rand(0,999999)));
    	$mb_user_token_info['member_id'] = $member_id;
    	$mb_user_token_info['member_name'] = $member_name;
    	$mb_user_token_info['token'] = $token;
    	$mb_user_token_info['login_time'] = TIMESTAMP;
    	$mb_user_token_info['client_type'] = $_POST['client'] == null ? 'Android' : $_POST['client'] ;
    
    	$result = $model_mb_user_token->addMbUserToken($mb_user_token_info);
    
    	if($result) {
    		return $token;
    	} else {
    		return null;
    	}
    
    }
}

class mobileHomeControl extends mobileControl{
	public function __construct() {
        parent::__construct();
    }
}

class mobileMemberControl extends mobileControl{

    protected $member_info = array();

	public function __construct() {
        parent::__construct();

        $model_mb_user_token = Model('mb_user_token');
        $key = $_POST['key'];
        if(empty($key)) {
            $key = $_GET['key'];
        }
        $mb_user_token_info = $model_mb_user_token->getMbUserTokenInfoByToken($key);
        if(empty($mb_user_token_info)) {
            output_error('请登录', array('login' => '0'));
        }

        $model_member = Model('member');
        $this->member_info = $model_member->getMemberInfoByID($mb_user_token_info['member_id']);
        $this->member_info['client_type'] = $mb_user_token_info['client_type'];
        if(empty($this->member_info)) {
            output_error('请登录', array('login' => '0'));
        } else {
            //读取卖家信息
            $seller_info = Model('seller')->getSellerInfo(array('member_id'=>$this->member_info['member_id']));
            $this->member_info['store_id'] = $seller_info['store_id'];
        }
    }
}
