<?php
/**
 * 卖家日志模型
 锦 尚 中 国 站 长 分 享 圈 子

 */
defined('InShopNC') or exit('Access Invalid!');
class seller_logModel extends Model{

    public function __construct(){
        parent::__construct('seller_log');
    }

	/**
	 * 读取列表 
	 * @param array $condition
	 *
	 */
	public function getSellerLogList($condition, $page='', $order='', $field='*') {
        $result = $this->field($field)->where($condition)->page($page)->order($order)->select();
        return $result;
	}

    /**
	 * 读取单条记录
	 * @param array $condition
	 *
	 */
    public function getSellerLogInfo($condition) {
        $result = $this->where($condition)->find();
        return $result;
    }

	/*
	 * 增加 
	 * @param array $param
	 * @return bool
	 */
    public function addSellerLog($param){
        return $this->insert($param);	
    }
	
	/*
	 * 删除
	 * @param array $condition
	 * @return bool
	 */
    public function delSellerLog($condition){
        return $this->where($condition)->delete();
    }
	
}
