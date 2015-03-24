<?php
require 'PHPMailerAutoload.php';
$mail = new PHPMailer;

$email_to = 'info@master-expo.com';  //'gerasimov_ia@sokolniki.com'; 'info@easyexpo.ru';
$email_to_second =  'alexey.shaburov@me.com';  //'shuvaev_sb@sokolniki.com'; 'alexey.shaburov@me.com';
$email_to_third =  'avh@sokolniki.com'; 
$callName    =   $_POST['call-name'];
$callCompany    =   $_POST['call-company'];
$callPhone    =   $_POST['call-phone']; 

//echo "callName " .$callName ." callCompany " .$callCompany ." callPhone ".$callPhone; 

$subject  = "Master-expo.com Поступление новой заявки на звонок с сайта";
$from = "autoanswer@master-expo.com";
$from_name = "Master-expo.com";

$message = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
		 <p></p>
		 <h3>master-expo.com Поступление новой заявки на звонок с сайта</h3>
		 
		 <p>Имя: '.$callName.'</p>
		 <p>Компания: '.$callCompany.'</p>
		 <p>Телефон: '.$callPhone.'</p>
</body>
</html>
';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->CharSet = 'UTF-8';
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '217.76.37.226';  						// Specify main and backup SMTP servers '217.76.37.226'; '192.168.1.1'; 
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'autoanswer@master-expo.com';                 // SMTP username
$mail->Password = 'Aa123456';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to

$mail->From = $from;
$mail->FromName = $from_name;
$mail->addAddress($email_to);     // Add a recipient
$mail->addAddress($email_to_second);               // Name is optional
$mail->addAddress($email_to_third);  
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = $message;

//echo "Ошибка отправки сообщения ntcn ntcn";

if($mail->send()) {
	echo "success";
}else{  
	echo "Ошибка отправки сообщения";
}

?>