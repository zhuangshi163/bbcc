<?php
error_reporting(E_ALL);
$a = exec('/usr/local/bin/wkhtmltoimage http://bbcc.meec.hk/m/ad-img.html?did=1011 /www/web/bbcc/data/upload/mobile/erweima/adImg1011.jpg ',$out,$status);
// var_dump($out);
// echo 'ddddddddddddd';
// var_dump($status);die;
print_r($a);  
print_r($out);  
print_r($status);
echo 'dddddd';
echo '============';
echo shell_exec("id -a");