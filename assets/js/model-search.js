$(function () {
	// when cleaning highlighting, we are removing tag <u>
	var reClean = new RegExp('<u>|<\/u>', 'gi');
	$('input[name=modelsearch-jq]').keyup(function () {
		$('.nav-tabs a[href="#' + index_all + '"]').tab('show');
		var searchVal = $('input[name=modelsearch-jq]').val();
		$.each(models, function (idx, val) {
			// clean highlighting only for shown ULs (not hidden)
			if (!$('#' + idx).hasClass("hidden")) {
				$('#' + idx + ' a strong').html($('#' + idx + ' a strong').html().replace(reClean, ''));
			}
			if (val.toLowerCase().indexOf(searchVal.toLowerCase()) < 0) {
				$('#' + idx).addClass('hidden');
			} else {
				$('#' + idx).removeClass('hidden');
				// create new regular expression for searched string
				var reHighlight = new RegExp(searchVal, 'gi');
				// find this string in found model and highlight it
				$('#' + idx + ' a strong').html($('#' + idx + ' a strong').html().replace(reHighlight, '<u>$&</u>'));
			}
		});
	});
});
