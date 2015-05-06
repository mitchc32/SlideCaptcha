<?php

/**
 * @author Mitchell Cannon
 * @copyright 2015
 */

class SlideCaptcha {
	
	/**
	 * SlideCaptcha::unlock()
	 * 
	 * Create the unlock session key.
	 * 
	 * @param string $key to reference in the session and the form
	 * @return string json
	 */
	public static function unlock($key='_captcha') {
		/* set the key */
		$_SESSION[$key] = uniqid();
		
		/* done */
		return self::encode(array($key=>$_SESSION[$key]));
	}
	
	/**
	 * SlideCaptcha::validate()
	 * 
	 * Validate the form input against the session key.
	 * 
	 * @param string $key to reference in the session and request data
	 * @return boolean
	 */
	public static function validate($key='_captcha') {
		/* check the session */
		if (!isset($_REQUEST[$key]) || empty($_REQUEST[$key])) {
			return false;
		} elseif ($_SESSION[$key] != $_REQUEST[$key]) {
			return false;
		}
		
		/* if the above failed then we're good to go */
		return true;
	}
	
	/**
	 * SlideCaptcha::encode()
	 * 
	 * An internal encode method to ensure we have the most compatibility
	 * as possible.
	 * 
	 * @param mixed $vars
	 * @return string json
	 */
	public static function encode($vars) {
		/* json encode */
		if (!function_exists('json_encode')) {
			/* get the keys */
			$keys = array_keys($vars);
			$key = $vars[0];
			
			/* manually build the json */
			return '{"'.$key.'":"'.$vars[$key].'"}';
		} else {
			/* just use the internal function */
			return json_encode($vars);
		}
	}
	
}

?>