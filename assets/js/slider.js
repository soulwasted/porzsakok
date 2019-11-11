var sliderSteps = [4, 12, 20, 40];
var sliderSteps2 = [8, 16, 24, 28, 32, 36];
var sliderStepsAll = sliderSteps.concat(sliderSteps2);

// var sliderStep01 = 4;
// var sliderStep02 = 12;
// var sliderStep03 = 20;
// var sliderStep04 = 40;
var benefitDisabled = 0.3;
var benefitEnabled = 1.0;


$(document).ready(function () {
	
	// Absolute position of benefits. 
	// We need to calculate height of benefits.
	setBenefitsHeight();
	
	var sliderInput = document.getElementById('sliderInput');
	var stepperMinus = document.getElementById('stepperMinus');
	var stepperPlus = document.getElementById('stepperPlus');
	var slider = document.getElementById('slider');
	
	function filterPips(value, type) {
		if(type === 0) {
			return 0;
		}
		return sliderSteps.includes(value) ? 1 : 2;
	}

	noUiSlider.create(slider, {
		start: [sliderSteps[2]],
		connect: 'lower',
		step: 1,
		range: {
			'min': [sliderSteps[0], 1],
			'33%': [sliderSteps[1], 1],
			'66%': [sliderSteps[2], 1],
			'max': [sliderSteps[3], 1]
		},
		pips: {
			mode: 'values',
			values: sliderStepsAll,
			density: 4,
			filter: filterPips,
			stepped: true
		},
		format: wNumb({
			decimals: 0,
		})
	});

	sliderInput.value = sliderSteps[2];

	// init of slider and input
	slider.noUiSlider.on('update', function (values, handle) {
		sliderInput.value = values[handle];
		updateBenefits();
	});
	slider.noUiSlider.on('change', function (values, handle) {
		inputUpdate(values[handle]);
	});

	function inputUpdate(newNumber) {
		if (newNumber == 1) {
			slider.noUiSlider.set(sliderSteps[0]);
			sliderInput.value = newNumber;
			toggleBenefits(0);
		} else if (newNumber >= sliderSteps[0] && newNumber <= sliderSteps[3]) {
			slider.noUiSlider.set(newNumber);
			sliderInput.value = newNumber;
		} else if (newNumber > sliderSteps[3] && newNumber < 100) {
			slider.noUiSlider.set(sliderSteps[3]);
			sliderInput.value = newNumber;
		} else if (newNumber >= 100) {
			slider.noUiSlider.set(sliderSteps[3]);
			sliderInput.value = 99;
		} else if (newNumber < sliderSteps[0]) {
			slider.noUiSlider.set(sliderSteps[0]);
			sliderInput.value = sliderSteps[0];
		} else {
			slider.noUiSlider.set(sliderSteps[3]);
			sliderInput.value = sliderSteps[3];
		}
		// updateInputSize();
	}

	// event when input is changed
	sliderInput.addEventListener('change', function () {
		inputUpdate(this.value);
	});

	// event when MINUS button is clicked
	$('#stepperMinus').click(function () {
		inputUpdate(parseInt(sliderInput.value) - 1);
	});
	// event when PLUS button is clicked
	$('#stepperPlus').click(function () {
		inputUpdate(parseInt(sliderInput.value) + 1);
	});
	// event when ONE PIECE is set
	$('#btnOnePiece').click(function () {
		inputUpdate(1);
	});

	function updateBenefits() {
		// console.log(sliderInput.value);
		if (sliderInput.value >= sliderSteps[3]) {
			toggleBenefits(4);
		} else if (sliderInput.value >= sliderSteps[2]) {
			toggleBenefits(3);
		} else if (sliderInput.value >= sliderSteps[1]) {
			toggleBenefits(2);
		} else if (sliderInput.value >= sliderSteps[0]) {
			toggleBenefits(1);
		} else if (sliderInput.value == 1) {
			toggleBenefits(0);
		}
	}

	function toggleBenefits(benefitNum) {
		$(".allBenefits").removeClass('active');
		if (benefitNum != 0) {
			$(".allBenefits:nth-child(" + benefitNum + ")").addClass('active');
		}
		$(".summary .sum-item").addClass('active');
		switch (benefitNum) {
			case 1:
				$(".summary .sum-bags").removeClass('active');
				$(".summary .sum-transport").removeClass('active');
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			default:

		}
	}

	function updateInputSize() {
		if (sliderInput.value >= 100) {
			$(sliderInput).addClass("over100");
		}
		if (sliderInput.value < 100) {
			$(sliderInput).removeClass("over100");
		}
	}
	
	function setBenefitsHeight() {
	    var benefitsHeight = $('.allBenefits:nth-child(4)').css("height");
	    $('.sliderBenefits').css({'height': benefitsHeight});

	    $(window).on('resize', function() {
	       benefitsHeight = $('.allBenefits:nth-child(4)').css('height');
		   $('.sliderBenefits').css({'height': benefitsHeight});
	    });
	}

});
