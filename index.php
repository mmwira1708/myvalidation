<?php
// redirect to demo site
$current_url = "//".$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI]."demo/";
header("Location: ".$current_url);
?>