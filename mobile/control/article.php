<?php
defined('InShopNC') or exit('Access Invalid!');
class articleControl extends mobileHomeControl{

	public function __construct() {
		parent::__construct();
	}
	
	/**
	 * 单篇文章显示页面
	 */
	public function showOp(){
		/**
		 * 读取语言包
		 */
		if(empty($_POST['articleId'])){
			echo 'article_id 不能为空';
		}
		/**
		 * 根据文章编号获取文章信息
		 */
		$article_model	= Model('article');
		$article	= $article_model->getOneArticle(intval($_POST['articleId']));
		if(empty($article) || !is_array($article) || $article['article_show']=='0'){
			echo 'article_id 不正确';//'该文章并不存在'
		}
		
		$model_upload = Model('upload');
		$condition['upload_type'] = '1';
		$condition['item_id'] = $article['article_id'];
		$file_upload = $model_upload->getUploadList($condition);
		//print_r($file_upload);die;
		if (is_array($file_upload)){
			foreach ($file_upload as $k => $v){
				$file_upload[$k]['upload_path'] = UPLOAD_SITE_URL.'/'.ATTACH_ARTICLE.'/'.$file_upload[$k]['file_name'];
			}
		}
		$article['wmall_icon'] = $file_upload[0]['upload_path'];
		//Tpl::output('article',$article);
		output_data($article);
	}
}