var sliderStep01 = 4;
var sliderStep02 = 12;
var sliderStep03 = 20;
var sliderStep04 = 40;
var benefitDisabled = 0.3;
var benefitEnabled = 1.0;

var sliderInput = document.getElementById('sliderInput');
var stepperMinus = document.getElementById('stepperMinus');
var stepperPlus = document.getElementById('stepperPlus');

$(document).ready(function () {
	var slider = document.getElementById('slider');

	noUiSlider.create(slider, {
		start: [sliderStep04],
		connect: 'lower',
		step: 1,
		range: {
			'min': [sliderStep01, 1],
			'33%': [sliderStep02, 1],
			'66%': [sliderStep03, 1],
			'max': [sliderStep04, 1]
		},
		pips: {
			mode: 'values',
			values: [sliderStep01, sliderStep02, sliderStep03, sliderStep04],
			density: 3,
			stepped: true
		},
		format: wNumb({
			decimals: 0,
		})
	});

	sliderInput.value = sliderStep04;

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
			slider.noUiSlider.set(sliderStep01);
			sliderInput.value = newNumber;
			toggleBenefits(0);
		} else if (newNumber >= sliderStep01 && newNumber <= sliderStep04) {
			slider.noUiSlider.set(newNumber);
			sliderInput.value = newNumber;
		} else if (newNumber > sliderStep04 && newNumber < 100) {
			slider.noUiSlider.set(sliderStep04);
			sliderInput.value = newNumber;
		} else if (newNumber >= 100) {
			slider.noUiSlider.set(sliderStep04);
			sliderInput.value = 99;
		} else if (newNumber < sliderStep01) {
			slider.noUiSlider.set(sliderStep01);
			sliderInput.value = sliderStep01;
		} else {
			slider.noUiSlider.set(sliderStep04);
			sliderInput.value = sliderStep04;
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
		if (sliderInput.value >= sliderStep04) {
			toggleBenefits(4);
		} else if (sliderInput.value >= sliderStep03) {
			toggleBenefits(3);
		} else if (sliderInput.value >= sliderStep02) {
			toggleBenefits(2);
		} else if (sliderInput.value >= sliderStep01) {
			toggleBenefits(1);
		} else if (sliderInput.value == 1) {
			toggleBenefits(0);
		}
	}

	function toggleBenefits(benefitNum) {
		// console.log(benefitNum);
		$(".allBenefits").removeClass('active');
		// $(".allBenefits3").removeClass('active');
		if (benefitNum != 0) {
			$(".allBenefits:nth-child(" + benefitNum + ")").addClass('active');
			// $(".allBenefits3:nth-child(" + benefitNum + ")").addClass('active');
		}
		// console.log("benefit num: " + benefitNum);
		$(".summary .sum-item").addClass('active');
		switch (benefitNum) {
			case 1:
				$(".summary .sum-bags").removeClass('active');
				$(".summary .sum-transport").removeClass('active');
				// $(".summary.sum-filters").removeClass('active');
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

});
