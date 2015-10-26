<?php
/**
 * 手机接口初始化文件
 *
 *  锦 尚 中 国 站 长 分 享 圈 子
 */
// $arr = array('one_level'=>array('did'=>1011,'money'=>35),'two_level'=>array('did'=>1011,'money'=>35),'three_level'=>array('did'=>1011,'money'=>35));
// $sss=serialize($arr);

// $str = unserialize($sss);
// print_r($str);die;
define('APP_ID','mobile');
define('IGNORE_EXCEPTION', true);
define('BASE_PATH',str_replace('\\','/',dirname(__FILE__)));

if (!@include(dirname(dirname(__FILE__)).'/global.php')) exit('global.php isn\'t exists!');
if (!@include(BASE_CORE_PATH.'/shopnc.php')) exit('shopnc.php isn\'t exists!');

if (!@include(BASE_PATH.'/config/config.ini.php')){
    exit('config.ini.php isn\'t exists!');
}

//框架扩展
require(BASE_PATH.'/framework/function/function.php');
if (!@include(BASE_PATH.'/control/control.php')) exit('control.php isn\'t exists!');

Base::run();
