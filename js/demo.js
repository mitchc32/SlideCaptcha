$(document).ready(function(){
	
	/* 
	THIS IS REQUIRED - add in the slide captcha to any element with the class "slidecaptcha"
	*/
	$('.slidecaptcha').slideCaptcha({
		unlockUrl: 'unlock.php'
	});
	
	/*
	THIS IS NOT REQUIRED - add the check event to the form before submitting
	*/
	$('#btn-submit').click(function(){
		var locked = $.fn.slideCaptcha.isLocked($('.slidecaptcha'));
		
		if (locked) {
			alert('This form is locked!');
			return false;
		}
		
		$(this).parents('form').submit();
	});
	
});