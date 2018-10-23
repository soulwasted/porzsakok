$(document).ready(function () {
	$(".package").click(function () {
		// console.log("clicked");
		$(".package").removeClass("package--selected");
		// $(".package").prop("checked", false);
		$(this).addClass("package--selected");
		$(this).children("input").prop("checked", true);
	});
});