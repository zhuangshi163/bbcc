<?php
/**
 * cms首页
 *
 *
 *  锦 尚 中 国 站 长 分 享 圈 子
 */

use Shopnc\Tpl;

defined('InShopNC') or exit('Access Invalid!');
class profitControl extends mobileHomeControl{

	public function __construct() {
        parent::__construct();
    }

    /**
     * 首页
     */
	public function indexOp() {
		if($_COOKIE['udid']){
			$model_dian_profitl = Model('dian_profit');
			$data = $model_dian_profitl->getLevelDianProfits(array('did'=>intval($_COOKIE['udid'])),'SUM(profit) as profitnum,level','level');
			output_data($data);
		}else {
			output_error('登录失败');
		}
	}

    /**
     * 专题
     */
	public function specialOp() {
        $model_mb_special = Model('mb_special'); 
        $data = $model_mb_special->getMbSpecialItemUsableListByID($_GET['special_id']);
        $this->_output_special($data, $_GET['type'], $_GET['special_id']);
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
    	$member_info = array();
    	if($did){
    			
    		$model_member = Model('member');
    		$member_info = $model_member->getMemberInfo(array('did'=>$did),'member_avatar,member_name,member_time,available_predeposit,sum_commission,a_cnt,b_cnt,c_cnt,outlet_count,did');
    		$member_info['member_avatar'] = getMemberAvatarForID($this->member_info['member_id']);
    		$member_info['member_date'] = date('Y-m-d H:i:s',$member_info['member_time']);
    		$member_info['team_count'] = $member_info['a_cnt'] + $member_info['b_cnt'] + $member_info['c_cnt'];
    	}
    	output_data(array('member_info' => $member_info));
    }
    
}