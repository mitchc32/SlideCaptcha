<?php

/**
 * @author Mitchell Cannon
 * @copyright 2015
 * 
 * This short script demonstrates how to use the SlideCaptcha class to
 * unlock a form.
 * 
 */

/* start the session */
session_start();

/* include the slidecaptcha class */
require_once __DIR__.'/SlideCaptcha.php';

/* set the unlock key */
$json = SlideCaptcha::unlock();

/* respond with the json */
die($json);

?>