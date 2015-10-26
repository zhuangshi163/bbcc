<?php
/**
 * 商品与属性对应
 *
 *
 *
  锦 尚 中 国 站 长 分 享 圈 子

 */
defined('InShopNC') or exit('Access Invalid!');

class goods_attr_indexModel extends Model {
    public function __construct() {
        parent::__construct('goods_attr_index');
    }
    
    /**
     * 对应列表
     * 
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getGoodsAttrIndexList($condition, $field = '*') {
        return $this->where($condition)->field($field)->select();
    }
}