<?php
/**
 * 入口
 *
 *
  锦 尚 中 国 站 长 分 享 圈 子

 */
$site_url = strtolower('http://'.$_SERVER['HTTP_HOST'].substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/index.php')).'/shop/index.php');
//@header('Location: '.$site_url);
include('shop/index.php');

