<?php
/**
 * 我的商城
 *
 *
 *
 *  锦 尚 中 国 站 长 分 享 圈 子
 */

use Shopnc\Tpl;

defined('InShopNC') or exit('Access Invalid!');

class member_indexControl extends mobileMemberControl {

	public function __construct(){
		parent::__construct();
	}

    /**
     * 我的商城
     */
	public function indexOp() {
        $member_info = array();
        $member_info['did'] = $this->member_info['did'];
        $member_info['user_name'] = $this->member_info['member_name'];
        $member_info['avator'] = getMemberAvatarForID($this->member_info['member_id']);
        $member_info['point'] = $this->member_info['member_points'];
        $member_info['predepoit'] = $this->member_info['available_predeposit'];

        //二维码
//         require_once(BASE_RESOURCE_PATH.DS.'phpqrcode'.DS.'index.php');
//         $PhpQRCode = new PhpQRCode();
//         $PhpQRCode->set('pngTempDir',BASE_ROOT_PATH.DS.DIR_ERWEIMA.DS);
//         $PhpQRCode->set('date',M_SITE_URL . '/index.html?did='.$member_info['did']);
//         $PhpQRCode->set('pngTempName', $member_info['did'] . '.png');
//         $PhpQRCode->set('matrixPointSize', 7);
        
//         $PhpQRCode->init();
        
        output_data(array('member_info' => $member_info));
	}

	public function updateMemberOp(){
		if(!$_POST['true_name']){
			$_POST = $_GET;
		}
		$model_member = Model('member');
		$member_info = array();
		$member_info['member_truename'] = $_POST['true_name'];
		$member_info['member_mobile'] = $_POST['mob_phone'];
		$member_info['did'] = $this->member_info['member_id'];
		$member_info['wx_shop_name'] = array('exp','member_name');
		$did_info = $model_member->getMemberInfo(array('did'=>intval($_POST['did'])),'did,l_id,l_b');
		if($did_info){
			$pdid = $member_info['l_id'] = $did_info['did']; //推荐过来的店铺id
			$ppdid = $member_info['l_b'] = $did_info['l_id'];
			$pppdid = $member_info['l_c'] = $did_info['l_b'];
			
			$pdid_info = array();
			$pdid_info['a_cnt'] = array('exp','a_cnt+1'); //更新一级分销数
			
			$ppdid_info = array();
			$ppdid_info['b_cnt'] = array('exp','b_cnt+1'); //更新二级分销数
			
			$pppdid_info = array();
			$pppdid_info['c_cnt'] = array('exp','c_cnt+1'); //更新二级分销数
			
		}

		
		$result = $model_member->editMember(array('member_id'=>$this->member_info['member_id']),$member_info);
		//二维码
		require_once(BASE_RESOURCE_PATH.DS.'phpqrcode'.DS.'index.php');
		$PhpQRCode = new PhpQRCode();
		$PhpQRCode->set('pngTempDir',BASE_ROOT_PATH.DS.DIR_ERWEIMA.DS);
        $PhpQRCode->set('date',M_SITE_URL . '/index.php?did='.$member_info['did']);
        $PhpQRCode->set('pngTempName', $member_info['did'] . '.png');
        $PhpQRCode->set('matrixPointSize', 7);
		$PhpQRCode->init();
		
		
		$model_member->editMember(array('did'=>$pdid),$pdid_info);
		$model_member->editMember(array('did'=>$ppdid),$ppdid_info);
		$model_member->editMember(array('did'=>$pppdid),$pppdid_info);
		if($result){
			output_data(array('udid'=>$member_info['did']));
		}
		
	}
	
	public function getMemberInfoOp(){
	
		$member_info = array();
		$member_info['member_avatar'] = getMemberAvatarForID($this->member_info['member_id']);
	
		//$member_info['member_avatar'] = $this->member_info['member_avatar'];
		$member_info['member_name'] = $this->member_info['member_name'];
		$member_info['user_name'] = $this->member_info['member_name'];
		$member_info['available_predeposit'] = $this->member_info['available_predeposit'];
		$member_info['sum_commission'] = $this->member_info['sum_commission'];
		$member_info['outlet_count'] = $this->member_info['outlet_count'];
		$member_info['did'] = $this->member_info['did'];
		$member_info['member_date'] = date('Y-m-d H:i:s',$this->member_info['member_time']);
		$member_info['team_count'] = $this->member_info['a_cnt'] + $this->member_info['b_cnt'] + $this->member_info['c_cnt'];
		output_data(array('member_info' => $member_info));
	
	}
	
	public function getAdImgOp(){
		
		if($this->member_info['did']){
			//分销图片
			$adImg=BASE_ROOT_PATH.DS.DIR_ERWEIMA.DS.'adImg'.$this->member_info['did'].'.jpg';
			if(!file_exists($adImg)){
				//二维码
				$erweima =BASE_ROOT_PATH.DS.DIR_ERWEIMA.DS.$this->member_info['did'] . '.png';
				if(!file_exists($erweima)){
					//生成二维码
					require_once(BASE_RESOURCE_PATH.DS.'phpqrcode'.DS.'index.php');
					$PhpQRCode = new PhpQRCode();
					$PhpQRCode->set('pngTempDir',BASE_ROOT_PATH.DS.DIR_ERWEIMA.DS);
			        $PhpQRCode->set('date',M_SITE_URL . '/index.php?did='.$this->member_info['did']);
			        $PhpQRCode->set('pngTempName', $this->member_info['did'] . '.png');
			        $PhpQRCode->set('matrixPointSize', 7);
					$PhpQRCode->init();
				}else{
					$status = system('/usr/local/bin/wkhtmltoimage --width 641 --height 1000 http://'.$_SERVER['HTTP_HOST'].'/m/ad-img.html?did='.$this->member_info['did'].' '.$adImg);
				}
			}
			$member_avatar = getMemberAvatarForID($this->member_info['member_id']);
			output_data(array('adImg' => 'http://'.$_SERVER['HTTP_HOST'].DS.DIR_ERWEIMA.DS.'adImg'.$this->member_info['did'].'.jpg ','did'=>$this->member_info['did'],'wx_shop_name'=>$this->member_info['wx_shop_name'],'member_avatar'=>$member_avatar));
		}
		
	}
	
	public function getDianTeamOp(){
		$condition = array('l_id'=>$this->member_info['did'],'l_b'=>$this->member_info['did'],'_op' => 'or');
		$model_member = Model('member');
		$did_list = $model_member->getMemberList($condition,'member_name,member_time,member_avatar,member_id,sum_commission,did');

		foreach ($did_list as $k=>$v){
			$did_list[$k]['member_avatar'] = getMemberAvatarForID($v['member_id']);
		}
		
		output_data($did_list);
	}
}
