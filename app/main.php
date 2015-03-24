<?php
require 'PHPMailerAutoload.php';
$mail = new PHPMailer;

$email_to = 'info@master-expo.com';  //'gerasimov_ia@sokolniki.com'; 'info@easyexpo.ru';
$email_to_second =  'alexey.shaburov@me.com';  //'shuvaev_sb@sokolniki.com'; 'alexey.shaburov@me.com';
$email_to_third =  'avh@sokolniki.com'; 
$startDate = $_POST['startDate']; 
$endDate = $_POST['endDate'];  
$exhibition = isset($_POST['exhibition']) ? $_POST['exhibition'] : "";  
$conference = isset($_POST['conference']) ? $_POST['conference'] : "";
$square     = $_POST['area'];  
$name    =   $_POST['name'];
$phone    =   $_POST['phone'];
$email    =   $_POST['email']; 
$additionalArea = $_POST['textarea']; 

//echo "startDate ".$startDate." endDate ".$endDate." exhibition ".$exhibition." conference ".$conference." square ".$square." name ".$name." phone ".$phone." email ".$email." additionalArea ".$additionalArea;

$typeText = "";
if($exhibition == "on" && $conference == "on") {
	$typeText = "выставка и конференция";
} else {
	if($exhibition == "on") {
	$typeText = "выставка";
	}
	if($conference == "on") {
		$typeText = "конференция";
	}
}

$subject_from  = "Вы успешно заказали площадь.";
$subject_to  = "Master-expo.com Поступил заказ площади";
$from = "autoanswer@master-expo.com";
$from_name = "Master-expo.com";
$message_to = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
		 <p></p>
		 <h2>master-expo.com Поступление нового заказа с сайта</h2>
		 
		 <p>Площадь: '.$square.'</p>
		 <p>Тип мероприятия: '.$typeText.'</p>
		 <p>Дата начала: '.$startDate.'</p>
		 <p>Дата окончания: '.$endDate.'</p>
		 <p>Контаконое лицо: '.$name.'</p>
		 <p>Email: '.$email.'</p>
		 <p>Телефон: '.$phone.'</p>
		 <p>Доп. информация: '.$additionalArea.'</p>
</body>
</html>
';
$message = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<p></p>
<table align="center" cellpadding="0" cellspacing="0" style="width: 600px;">
<tbody>
<tr>
<td style="width: 85%; font-size: 14px;">
<table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 572px; font-family: Arial; color:#000">
<tbody>
<tr>
<td style="padding-bottom: 20px;" colspan="2">
<div style="text-align: center;"></div>
<p style="padding-bottom:20px;">Здравствуйте, '.$name.'. </p>
<p style="padding-bottom:20px;">Вы отправили заявку на бронирование выставочной площади.</p>
<p><span style="color: #2FAC66">Даты:</span> '.$startDate.' - '.$endDate.'</p>
<p><span style="color: #2FAC66">Тип мероприятия:</span> '.$typeText.' </p>
<p><span style="color: #2FAC66">Площадь:</span> '.$square.' кв. м. </p>
<p style="padding-bottom:20px;">Ваша заявка на бронирование площади получена, наш менеджер обработает ваш запрос и свяжется с Вами в течении 2-х рабочих дней. </p>
<p>С уважением, команда EasyExpo.ru.</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</body>
</html>
';  

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = '217.76.37.226';  						// Specify main and backup SMTP servers '217.76.37.226'; '192.168.1.1'; 
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'autoanswer@master-expo.com';                 // SMTP username
$mail->Password = 'Aa123456';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to
$mail->From = $from;
$mail->FromName = $from_name;
$mail->isHTML(true);                                  // Set email format to HTML
$mail->CharSet = 'UTF-8';
//$mail->DKIM_domain = 'master-expo.com';
//$mail->DKIM_private = 'private.key';
//$mail->DKIM_selector = 'expert'; 			//this effects what you put in your DNS record
//$mail->DKIM_passphrase = '';


$mail->addAddress($email_to);     // Add a recipient
$mail->addAddress($email_to_second);               // Name is optional
$mail->addAddress($email_to_third);  
$mail->Subject = $subject_to;
$mail->Body    = $message_to;

if($mail->send()) {
	$mail_to_client = new PHPMailer;
	//$mail_to_client->SMTPDebug = 3;                               // Enable verbose debug output

	$mail_to_client->isSMTP();                                      // Set mailer to use SMTP
	$mail_to_client->Host = '217.76.37.226';  						// Specify main and backup SMTP servers '217.76.37.226'; '192.168.1.1'; 
	$mail_to_client->SMTPAuth = true;                               // Enable SMTP authentication
	$mail_to_client->Username = 'autoanswer@master-expo.com';                 // SMTP username
	$mail_to_client->Password = 'Aa123456';                           // SMTP password
	$mail_to_client->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail_to_client->Port = 25;                                    // TCP port to connect to
	$mail_to_client->From = $from;
	$mail_to_client->FromName = $from_name;
	$mail_to_client->isHTML(true);                                  // Set email format to HTML
	$mail_to_client->CharSet = 'UTF-8';
	//$mail_to_client->DKIM_domain = 'master-expo.com';
	//$mail_to_client->DKIM_private = 'private.key';
	//$mail_to_client->DKIM_selector = 'expert'; 			//this effects what you put in your DNS record

	$mail_to_client->addAddress($email);  
	$mail_to_client->Subject = $subject_from;
	$mail_to_client->Body    = $message;
	if($mail_to_client->send()) {
		echo "success";
	} else {  
		echo "Ошибка отправки сообщения";
	}
} else{  
	echo "Ошибка отправки сообщения";
}
?>