/**
 * Olice Frame Animator jQuery plugin
 *
 * Version: 0.1
 * Date:    04/08/2015
 *
 * Browsers: IE8 +
 * 
 * Basic initialisation:
 *
 *   $('#container').frameAnimator(options)
 *
 * Options:
 *
 *   See defaults below
 *
 * Buttons:
 *
 *   You can place buttons inside the container with an attribute to control 
 *   the animator, eg:
 *
 * 		<button type="submit" data-action="play">Play</button>
 *  	<button type="submit" data-action="stop">Stop</button>
 *		<button type="submit" data-action="reverse">Reverse</button>
 *
 * Methods
 *   
 *   You can control the frame animator programatically as so:
 *
 *      $('#container').frameAnimator(action)
 *   
 *   The action strings are:
 *      
 *      $('#container').frameAnimator('play')     		// Plays the animation
 *      $('#container').frameAnimator('stop')     		// Stops the animation
 *      $('#container').frameAnimator('reverse')  		// Reverses animation direction
 *      $('#container').frameAnimator('forwards') 		// Sets direction forwards
 *      $('#container').frameAnimator('go', 123)  		// Goes to the specified frame
 *      $('#container').frameAnimator('percent', 50)	// Goes to the specified frame by percentage
 */

	
$.fn.frameAnimator = function(opts) {

	var defaults = {
		template : 'images/{index}.jpg',
		pad      : false,   // Integer to zero pad index in filename
		first    : 1,		// First image index
		last     : 80,		// Last image index
		fps      : 24,		// Speed fps
		loop     : true,	// Whether to loop on complete
		autoplay : false,	// Whether to start playing immediately
	};

	Number.prototype.leftZeroPad = function(numZeros) {
	    var n = Math.abs(this);
	    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
	    var zeroString = Math.pow(10,zeros).toString().substr(1);
	    if( this < 0 ) {
	        zeroString = '-' + zeroString;
	    }

	    return zeroString+n;
	};

	var factory = function(ele, opts) {

		var animator = {

			// ID
			id : Math.round(1000000000 * Math.random()),

			// Options
			config : $.extend({}, defaults, opts),

			// Container element 
			ele    : ele,

			// Current set of images
			images : [],

			// Number of images loaded
			loaded : 0,

			// Current image index
			current: 0,

			// Whether playing
			playing: false,

			// Whether reversed
			reversed: false,

			// Refresh the visible image
			refresh : function() {

				$('[data-frame-animator-id=' + this.id + ']').find('img:eq(' + this.current + ')')
					.addClass('visible')
					.siblings()
					.removeClass('visible');

				// Note: this is how it should work, however does not work in IE8 in 
				// the player, as the container element seems to get lost betweem
				// page.load and when the script starts animating
				/*
				$(this.ele).find('img:eq(' + this.current + ')')
					.addClass('visible')
					.siblings()
					.removeClass('visible');
					*/
			},

			// Reverse
			reverse : function() {
				this.reversed = true;
			},

			// Forwards
			forwards : function() {
				this.reversed = false;
			},

			// Toggle direction
			toggle : function() {
				this.reversed = !this.reversed;
			},

			// Go directly to a particular frame
			// Can be used eg with slider
			go : function(frame) {
				this.current = frame;
				this.refresh();
			},

			// Go to frame (by percentage)
			// @param number pc 
			percent : function(pc) {
				var frame = Math.round(this.images.length * (pc/100));
				this.go(frame);
			},


			// Go to next image in sequence
			next : function() {
				if(this.current < this.images.length-2) {
					this.current++;
				}
				else if(this.config.loop) {
					this.current = 0;
				}
				this.refresh();
			},

			// Go to previous image in sequence
			prev : function() {
				if(this.current > 0) {
					this.current--;
				}
				else if(this.config.loop) {
					this.current = this.images.length-1;
				}
				this.refresh();
			},

			// Start animating
			animate: function() {
				var self = this, animate = function() {
					if(self.playing && self.reversed) {
						self.prev();
					}
					if(self.playing && !self.reversed) {
						self.next();
					}
					window.setTimeout(animate, Math.round(1000 / self.config.fps));
				}
				animate();
			},

			// Play
			play : function() {
				this.playing = true;
			},

			// Stop
			stop : function() {
				this.playing = false;
			},

			// On load - called when all images are loaded
			onLoad : function() {
				if(this.config.autoplay) {
					this.play();
				}
			},

			// Add images to HTML
			addImages : function() {
				var self = this;

				// Create array of images
				for(i=this.config.first; i<=this.config.last; i++) {
					// The image index to load
					// This can be zero-padded with the 'pad' config option
					var index = i;
					if(this.config.pad !== false) {
						index = index.leftZeroPad(this.config.pad);
					}

					// Image source
					var src = this.config.template.replace('{index}', index);
					this.images.push(src);
				};

				// Add images
				$.each(this.images, function(i, src) {

					// Create image
					var $im = $('<img src="' + src + '" />');

					$im.on('load', function() {
						// Increment loaded counter
						self.loaded++;

						// Show first image
						if(i==0) {
							$(this).addClass('visible');
						}

						// Are all images loaded?
						if(self.loaded == self.images.length) {
							self.onLoad();
						}
					});

					$(self.ele).append($im);
				});

			},


			// Do an action
			action : function(str) {
				var args = Array.prototype.slice.call(arguments);
				this[str].apply(this, args.slice(1));
			},

			// Discover buttons
			addButtonHandlers : function() {
				var self = this;
				$(this.ele).on('click', '[data-action]', function() {
					self.action($(this).attr('data-action'));
				});
			},

			// Initialisation
			init : function() {

				// Add ID
				$(this.ele).attr('data-frame-animator-id', this.id);

				// Add button handlers
				this.addButtonHandlers();

				// Add images to DOM
				this.addImages();

				// Add class to container
				$(this.ele).addClass('frame-animator');

				// Start animating
				this.animate();

			}
			
		}

		animator.init();

		return animator;
		
	}

	var args = arguments;

    return this.each(function() {

    	// Do an action
    	if(typeof(opts) == 'string') {
    		var animator = $(this).data('frame-animator');
    		animator.action.apply(animator, args);
    	}
    	else {
    		$(this).data('frame-animator', factory(this, opts));
    	}
  
    });
 
};