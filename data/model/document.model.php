<?php
/**
 * 系统文章
 锦 尚 中 国 站 长 分 享 圈 子

 */
defined('InShopNC') or exit('Access Invalid!');

class documentModel{
	/**
	 * 查询所有系统文章
	 */
	public function getList(){
		$param	= array(
			'table'	=> 'document'
		);
		return Db::select($param);
	}
	/**
	 * 根据编号查询一条
	 * 
	 * @param unknown_type $id
	 */
	public function getOneById($id){
		$param	= array(
			'table'	=> 'document',
			'field'	=> 'doc_id',
			'value'	=> $id
		);
		return Db::getRow($param);
	}
	/**
	 * 根据标识码查询一条
	 * 
	 * @param unknown_type $id
	 */
	public function getOneByCode($code){
		$param	= array(
			'table'	=> 'document',
			'field'	=> 'doc_code',
			'value'	=> $code
		);
		return Db::getRow($param);
	}
	/**
	 * 更新
	 * 
	 * @param unknown_type $param
	 */
	public function update($param){
		return Db::update('document',$param,"doc_id='{$param['doc_id']}'");
	}
}