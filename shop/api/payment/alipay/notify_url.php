<?php
/**
 * 支付宝通知地址
  * 锦 尚 中 国 站 长 分 享 圈 子发
 */
$_GET['act']	= 'payment';
$_GET['op']		= 'notify';
$_GET['payment_code'] = 'alipay';
require_once(dirname(__FILE__).'/../../../index.php');
?>