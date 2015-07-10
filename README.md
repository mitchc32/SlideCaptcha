#SlideCaptcha 1.0.0

A simple captcha alternative for jQuery 1.7+ and PHP 5.x using https://github.com/leongersen/noUiSlider/.

##Getting Started

The first step is to extract the provided files onto your server or hosting environment. At a minimum, you will need the following files:

 - js/jquery.slidecaptcha.combined.min.js
 - css/jquery.slidecaptcha.combined.min.css
 - SlideCaptcha.php
 - unlock.php

Include the following CSS into the HEAD section of your HTML document:

```html
<link href="css/jquery.slidecaptcha.combined.min.css" rel="stylesheet" type="text/css" />
```

Include the following JS right before the closing BODY tag of your HTML document:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="js/jquery.slidecaptcha.combined.min.js"></script>
```

##Using SlideCaptcha

This package includes two working examples on how to use and implement SlideCaptcha into your project. One example is plain HTML (demo.html) while the other uses Bootstrap 3.x (bootstrap-demo.html).

Both demos have use the same class-based method of setting a SlideCaptcha HTML element. Here is an example:

```html
<div class="slidecaptcha"></div>
```

To initialize the plugin, use the following code:

```javascript
$(document).ready(function(){
	$('.slidecaptcha').slideCaptcha({
		unlockUrl: 'unlock.php' // change this to your actual unlock url
	});
});
```

You can view this example in js/demo.js.

##Server Side

The SlideCaptcha class is the primary item on the server side. This package includes two examples on how to implement both unlocking and validating the capcha.

Make sure that you start the session before calling this method.

Include the class:

```php
require_once __DIR__.'/SlideCaptcha.php';
```

To perform an unlock action, you simply need to call the unlock method:

```php
die(SlideCaptcha::unlock());
```

The unlock method above will return a simple JSON string to be returned to the jQuery plugin.

Once a form has been submitted, you can use the following if statement in your validation process to ensure that the form was properly unlocked:

```php
if (SlideCaptcha::validate()) {
	die('SlideCaptcha Valid');
} else {
	die('SlideCaptcha Not Valid');
}
```

##Options

The following options are available:

* key - this is the session and input key that is used in validation; default: “_captcha”
* unlockUrl - the url to request the unlock credentials from
* unlockRequestType - use a get or post request; default: post
* unlockParams - an object of additional parameters to send with the unlock request
* lockedClass - the CSS class to apply when the slider is locked
* lockedText - the instruction string displayed to the user
* unlockedClass - the CSS class to apply when the slider is unlocked
* unlockedText - the instruction string displayed to the user when the slider is unlocked
