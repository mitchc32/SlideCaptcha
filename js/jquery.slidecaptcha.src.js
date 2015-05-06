(function($){"use strict";
	
	/* ===================================== */
	/* MAKE SURE REQUIREMENTS ARE AVAILABLE  */
	/* ===================================== */
	
	if (typeof $.fn.noUiSlider === 'undefined') {
		throw 'Required noUiSlider is not available.';
	}
	
	/* ===================================== */
	/* PUBLIC CLASS */
	/* ===================================== */
	
	var SlideCaptcha = function(el, opts) {
		/* set props */
		this.$el = $(el);
		this.opts = $.extend({}, SlideCaptcha.DEFAULTS, this.$el.data());
		this.opts = $.extend({}, this.opts, opts);
		
		/* ===================================== */
		/* CONSTRUCTOR */
		/* ===================================== */
		
		/* add in the html */
		this.$el.empty()
			.append('<p class="sc-instructions">' + this.opts.lockedText + '</p>')
			.append('<div class="sc-slider-container"><div class="sc-slider"></div></div>')
			.append('<div class="sc-status">Locked</div>')
			.addClass('sc-locked');
		
		/* scope the object reference for inside the events */
		var self = this;
		
		/* add in the slider events */
		this.$el.find('.sc-slider').noUiSlider({
			range: {
				'min': 0,
				'max': 10
			},
			start: 0,
			connect: 'lower'
		}).change(function(){
			/* set defaults */
			var $this = $(this);
			var val = parseFloat($this.val());
			
			/* we want to make sure they tap or drag at least halfway */
			if (val < 5) {
				/* lock the slider */
				return self.lock();
			}
			
			/* attempt to unlock it */
			return self.unlock();
		});
		
	};
	
	/* ===================================== */
	/* OPTION DEFAULTS */
	/* ===================================== */
	
	SlideCaptcha.DEFAULTS = {
		key: '_captcha',
		locked: true,
		unlockUrl: '',
		unlockRequestType: 'post',
		unlockParams: {},
		lockedClass: 'sc-locked',
		lockedText: 'This form is locked. Please drag or tap the slider below to unlock it.',
		unlockedClass: 'sc-unlocked',
		unlockedText: 'This form is unlocked!'
	};
	
	/* ===================================== */
	/* PUBLIC METHODS */
	/* ===================================== */
	
	SlideCaptcha.prototype.unlock = function(){
		/* set the slider value */
		this.$el.find('.sc-slider').val(10);
		
		/* check to see if it is already locked */
		if (!this.opts.locked) {
			return true;
		}
		
		/* scope the object */
		var self = this;
		
		/* update the display */
		this.$el.children('.sc-status').html('Unlocking...');
		
		/* make the ajax request */
		$.ajax(this.opts.unlockUrl, {
			data: this.opts.unlockParams,
			dataType: 'json',
			method: this.opts.unlockRequestType
		}).success(function(resp){
			/* create the hidden field */
			self.$el.append('<input type="hidden" name="' + self.opts.key + '" value="' + resp[self.opts.key] +'" class="sc-val">');
			
			/* update the text */
			self.$el.children('.sc-instructions').html(self.opts.unlockedText);
			self.$el.children('.sc-status').html('Unlocked!');
			
			/* update the class */
			self.$el.removeClass(self.opts.lockedClass).addClass(self.opts.unlockedClass);
			
			/* set the status */
			self.opts.locked = false;
			
			/* done */
			return true;
		}).error(function(){
			/* lock the form on error */
			self.lock();
		});
	};
	
	SlideCaptcha.prototype.lock = function(){
		/* set the slider value */
		this.$el.find('.sc-slider').val('0');
		
		/* clear out the field */
		this.$el.find('.sc-val').remove();
		
		/* check to see if it is already locked */
		if (this.opts.locked) {
			return true;
		}
		
		/* update the text */
		this.$el.children('.sc-instructions').html(this.opts.lockedText);
		this.$el.children('.sc-status').html('Locked');
		
		/* update the class */
		this.$el.removeClass(this.opts.unlockedClass).addClass(this.opts.lockedClass);
		
		/* set the status */
		this.opts.locked = true;
		
		/* done */
		return true;
	};
	
	SlideCaptcha.prototype.isLocked = function(){
		return this.opts.locked;
	};
	
	/* ===================================== */
	/* PLUGIN */
	/* ===================================== */
	
	$.fn.slideCaptcha = function(option) {
		return this.each(function() {
			/* set the defaults */
			var $this = $(this);
			var data = $this.data('slidecaptcha');
			var options = (typeof option == 'object' && option) ? option : {};
			
			/* make sure we have an object */
			if (!data) {
				/* create a new object */
				data = new SlideCaptcha(this, options)
				
				/* save it to the element data to localize */
				$this.data('slidecaptcha', data);
			}
			
			/* see if we are calling a method on an existing object */
			if (typeof option == 'string') {
				/* see if it exists */
				if (typeof data[option] == 'undefined') {
					throw 'The '+option+' does not exist';
				} else {
					data[option]();
				}
			}
		});
    };
    
    $.fn.slideCaptcha.isLocked = function($el) {
    	var data = $el.data('slidecaptcha');
    	if (!data) {
    		return true;
    	} else {
    		return data.opts.locked;
    	}
    };
	
})(jQuery);