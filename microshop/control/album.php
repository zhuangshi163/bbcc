<?php
/**
 * 默认展示页面
  * 锦 尚 中 国 站 长 分 享 圈 子
 */
defined('InShopNC') or exit('Access Invalid!');
class albumControl extends MircroShopControl{

	public function __construct() {
		parent::__construct();
        Tpl::output('index_sign','album');
    }

	//首页
	public function indexOp(){
		Tpl::showpage('album');
	}
}
