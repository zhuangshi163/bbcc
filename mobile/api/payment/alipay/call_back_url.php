<?php
/* * 
 * 功能：支付宝页面跳转同步通知页面
 */

$_GET['act'] = 'payment';
$_GET['op']	= 'return';
$_GET['payment_code']	= 'alipay';
//print_r($_GET);die;
//echo dirname(dirname(dirname(dirname(__FILE__)))).'/index.php';die;
require_once(dirname(dirname(dirname(dirname(__FILE__)))).'/index.php');
//include (BASE_CORE_PATH.'/framework/libraries/tpl.php');
?>
