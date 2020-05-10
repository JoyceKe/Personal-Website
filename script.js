/* Isotope Filter
  -------------------------------------------------------*/
  var $portfolioFilter = $('#project-grid, #masonry-grid');
  $('.project-filter').on( 'click', 'a', function(e) {
    e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    $portfolioFilter.isotope({ filter: filterValue });
    $('.project-filter a').removeClass('active');
    $(this).closest('a').addClass('active');
  });


  /* Portfolio
  -------------------------------------------------------*/
  var $portfolio = $('#project-grid');
  $portfolio.imagesLoaded( function() {
    $portfolio.isotope({
      itemSelector: '.project',
      layoutMode: 'fitRows',
      percentPosition: true
    });
  });

  /* Masonry
  -------------------------------------------------------*/

  function initMasonry(){

    var $masonry = $('#masonry-grid');
    $masonry.imagesLoaded( function() {
      $masonry.isotope({
        itemSelector: '.project',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.isotope-small'
        }
      });        
    });
  }
/* Text
------------------------------------------------------ */
  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

/* Navigation
------------------------------------------------------ */

$(window).scroll(function() {

    if ($(window).scrollTop() > 300) {
        $('.main_nav').addClass('sticky');
    } else {
        $('.main_nav').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.main_nav').removeClass('open-nav');
    } else {
        $('.main_nav').addClass('open-nav');
    }
});

$('.main_nav li a').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_nav').removeClass('open-nav');
    }
});

/* Smooth Scrolling
------------------------------------------------------ */
jQuery(document).ready(function($) {

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});

/* Timeline
------------------------------------------------------ */
	var scrolled = 0;
  
    $(window).on('scroll touchmove', function () {
      $('.content').each(function () {
        if($(this).offset().top <= $(window).scrollTop() 
           + $(window).height()*0.7)
        {
            $(this).animate({ opacity: 1 }, 500);
            $(this).prev().animate({width: '100px', opacity: 1}, 500);
            $(this).siblings('span:not(.timeline-date)')
              .addClass('pulse');
  
            var height = $(this).offset().top;
            if (scrolled < height) scrolled = height;
            else height = scrolled;
            $('.progress-line').css('height', 0.535*height + 10);
        }
	  });
	});
  
});
TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);

/* Pie Chart
------------------------------------------------------ */
(function () {

	var margin = {
		top: 10,
		bottom: 10,
		left: 10,
		right: 10
	};
	var width = 400 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	var labelsWidth = 0;
	var labelWidth = 0;
	var labelHeight = 0;

	var animateDuration = 300;
	var outerRadius = width-labelsWidth < height? (width-labelsWidth)/2 : height/2;
	var innerRadius = outerRadius * 0.4; // 40%

	var arc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);

	var pie = d3.layout
		.pie()
		.sort(null)
		.value(getValue)
		.startAngle(1.1*Math.PI)
		.endAngle(3.1*Math.PI);

	var color = ['#00c7e7','#dd1f97','#907dda','limegreen'];

	var chart = d3.select('.chart')
		.attr({
			width: width + margin.left + margin.right,
			height: height + margin.top + margin.bottom
		})
		.append('g')
		.attr({
			class: 'labels',
			transform: 'translate(' + (width-(labelsWidth + margin.right)) + ', ' + margin.top + ')'
		})
		.select(getParent)
		.append('g')
		.attr({
			class: 'pie',
			transform: 'translate(' + (outerRadius + margin.left) + ', ' + (height/2 + margin.top) + ')'
		})
		.select(getParent)
		.append('g')
		.attr({
			class: 'main-legend',
			transform: 'translate(' + (outerRadius + margin.left) + ', ' + (outerRadius + margin.top) + ')'
		})
		.select(getParent);

	chart.select('.main-legend')
		.append('circle')
		.attr({
			class: 'border',
			opacity: 0,
			stroke: 'rgba(255,255,255,1)',
			fill: 'rgba(0,0,0,0)',
			r: innerRadius*0.64
		})
		.select(getParent)
		.append('circle')
		.attr({
			class: 'circle',
			opacity: 0,
			fill: 'black',
			r: innerRadius*0.6
		})
		.select(getParent)
		.append('line')
		.attr({
			opacity: 0,
			stroke: 'transparent',
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		})
		.select(getParent)
		.append('text')
		.attr({
			class: 'legend-title',
			'font-size': '14px',
			'font-family': 'Arial',
			'text-anchor': 'middle',
			'alignment-baseline': 'middle',
			fill: 'black'
		})

	function getParent() {
		return this.parentNode;
	}
	
	function getValue(d) {
		return d.value;
	}
  function getSum(data) {
		var _sum = 0;
		data.forEach(function addValue(item) { 
			_sum += item.value; 
		});
		return _sum;
	}
	
	function arcTween(d) {
		var i;
		function toArc(t) {
			return arc(i(t));
		}
		function toEndAngle(t) {
			d.endAngle = i(t);
			return arc(d);
		}

		if ('undefined' === typeof this._current) {
			i = d3.interpolate(d.startAngle+0.1, d.endAngle);
			this._current = d;
			return toEndAngle;
		}
		i = d3.interpolate(this._current, d);
		this._current = i(0);
		return toArc;
	}

	function labelAnimation(d) {
		return 'translate (' + arc.centroid(d) + ')';
	}

	function fill(d, i) {
		return color[i];
	}

	function selectArcAnimation(_d) {
		var dist = outerRadius * 0.05;
		_d.midAngle = ((_d.endAngle - _d.startAngle) / 2) + _d.startAngle;
		var x = Math.sin(_d.midAngle) * dist;
		var y = -Math.cos(_d.midAngle) * dist;
		return 'translate(' + x + ',' + y + ')';
	}

	function updatePie(data) {
		var sum = getSum(data);
		data = pie(data);
		var arcs = chart.select('.pie')
			.selectAll('.arc')
			.data(data);

		var isDelay = arcs.selectAll('path').length;
		var _duration = isDelay? animateDuration : animateDuration/2;

		function getPercent(d) {
			return ((d.value/sum)*100).toFixed(1) + '%';
		}

		function getLegend(d) {
			return d.data.name + ' | ' + d.data.value;
        }
        
		function liveLarge(d) {
			var angle = 360 * (d.value/sum);
			var arcLength = (Math.PI * (outerRadius/2) * angle) / 180;
			return arcLength > Math.PI*outerRadius*0.01;
		}

		function onMouseIn(d, i) {
			var label = chart.selectAll('.legend')
					.filter(function(_d, _i) {
						return i===_i;
					});
			if (!label.attr('data-exit')) {
				label.transition()
					.duration(animateDuration/2)
					.attr({
						opacity: 1,
						transform: 'translate(10, '+ ((labelHeight + 5) * i) +')'
					});
			}

			chart.selectAll('.arc')
				.filter(function(_d, _i) {
					return i===_i;
				})
				.transition()
				.duration(animateDuration/2)
				.attr('transform', selectArcAnimation);

			chart.select('.main-legend')
				.select('.border')
				.transition()
				.duration(animateDuration/2)
				.attr({
					opacity: 1,
					stroke: fill(null, i)
				});

			chart.select('.main-legend')
				.select('.circle')
				.transition()
				.duration(animateDuration/2)
				.attr({
					opacity: 1,
					fill: fill(null, i)
				});

			chart.select('.main-legend')
				.select('line')
				.transition()
				.duration(animateDuration/2)
				.attr({
					opacity: 1,
					stroke: fill(null, i),
					x1: Math.sin(d.midAngle) * (innerRadius*0.7),
					y1: -Math.cos(d.midAngle) * (innerRadius*0.7),
					x2: Math.sin(d.midAngle) * innerRadius,
					y2: -Math.cos(d.midAngle) * innerRadius
				});

			chart.select('.main-legend')
				.select('.legend-title')
				.text(d.data.name)
				.select(getParent)
				.select('.description')
				.text(d.data.value)
		}
		function onMouseOut(d, i) {
			chart.select('.main-legend')
					.selectAll(['.circle', '.border'])
					.transition()
					.duration(animateDuration/2)
					.attr({
						opacity: 0
					});

			chart.select('.main-legend')
					.select('line')
					.transition()
					.duration(animateDuration/2)
					.attr({
						opacity: 0
					});

			chart.select('.main-legend')
					.select('.legend-title')
					.text('')
					.select(getParent)
					.select('.description')
					.text('');

			if ('undefined' === typeof i) {
				return;
			}
			var label = chart.selectAll('.legend')
				.filter(function(_d, _i) {
					return i===_i;
				});

			if (!label.attr('data-exit')) {
				label.transition()
					.duration(animateDuration/2)
					.attr({
						opacity: 1,
						transform: 'translate(0, '+ ((labelHeight + 5) * i) +')'
					});
			}

			chart.selectAll('.arc')
				.filter(function(_d, _i) {
					return i===_i;
				})
				.transition()
				.duration(animateDuration/2)
				.attr({
					transform: 'translate(0,0)'
				});
		}

		onMouseOut();
		// update Pie

		arcs.enter()
			.append('g')
			.attr('class', 'arc')
			.on('mouseenter', onMouseIn)
			.on('mouseout', onMouseOut)
			.append('path')
			.attr({
				fill: fill
			})
			.filter(liveLarge)
			.append('text')
			.attr({
				'font-family': 'Arial',
				'font-size': '14px',
				fill: '#fff',
				'text-anchor': 'middle'
			});
		
		arcs.select('path')
			.transition()
			.delay( function delayFn(d,i) {
				return isDelay? 0 : _duration*i;
			})
			.duration(_duration)
			.attrTween('d', arcTween);

		arcs.select('text')
			.text(getPercent)
			.transition()
			.duration(animateDuration)
			.attr({
				class: 'label-content',
				transform: labelAnimation
			});

		arcs.exit()
    	.on('mouseenter', null)
			.on('mouseout', null)
      .remove();

		// Update Legends

		var legends = chart
				.select('.labels')
				.selectAll('.legend')
				.data(data);

		legends.enter()
			.append('g')
			.on('mouseenter', onMouseIn)
			.on('mouseout', onMouseOut)
			.attr('class', 'legend')

		legends.exit()
      .on('mouseenter', null)
			.on('mouseout', null)
			.attr('data-exit', true)
			.transition()
			.duration(animateDuration/2)
			.attr({
				opacity: 0,
			
				transform: function(d, i) {
					return 'translate(-15, ' + ((labelHeight + 5) * i) + ')';
				}
			})
			.remove();

		legends.select('text').text(getLegend);
	}
	
	function generatePie() {
		var data = [{name: 'Cloud', value:20},{name: 'Front-End', value:20},{name: 'Back-End', value: 25},{name: 'DevOps', value:35}];
		updatePie(data);
		setTimeout(generatePie, 4000);
	}

	generatePie();
} ());


// Slide Show
// ------------------------------------------------------ */
// var slideIndex = [1,1];
// var slideId = ["mySlides1", "mySlides2"]
// showSlides(1, 0);
// showSlides(1, 1);

// function plusSlides(n, no) {
//   showSlides(slideIndex[no] += n, no);
// }

// function showSlides(n, no) {
//   var i;
//   var x = document.getElementsByClassName(slideId[no]);
//   if (n > x.length) {slideIndex[no] = 1}    
//   if (n < 1) {slideIndex[no] = x.length}
//   for (i = 0; i < x.length; i++) {
//      x[i].style.display = "none";  
//   }
//   x[slideIndex[no]-1].style.display = "block";  
// }
$(".carousel").swipe({

	swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
  
	  if (direction == 'left') $(this).carousel('next');
	  if (direction == 'right') $(this).carousel('prev');
  
	},
	allowPageScroll:"vertical"
  
  });