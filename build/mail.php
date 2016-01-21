<?php

    $message .= "Name: ".$_POST['name']."\n\n";
    $message .= "Email: ".$_POST['email']."\n\n";
    $message .= "Message: ".$_POST['message']."\n\n";

    $message = wordwrap($message, 70);

    // $from = $_POST['email'];
    $from = "hotels@soundfreaq.com";

    $headers = "From:$from";

    mail('hotels@soundfreaq.com', 'SFQ HOTEL INQUIRY', $message, $headers);
?>
