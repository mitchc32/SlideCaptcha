<?php

/**
 * @author Mitchell Cannon
 * @copyright 2015
 * 
 * This short script demonstrates how to use the SlideCaptcha class
 * to validate if the form was unlocked before it was submitted. This
 * should be used in your form validation process.
 * 
 */

/* start the session */
session_start();

/* include the slidecaptcha class */
require_once __DIR__.'/SlideCaptcha.php';

/* set the unlock key */
if (SlideCaptcha::validate()) {
	die('SlideCaptcha Valid');
} else {
	die('SlideCaptcha Not Valid');
}

?>