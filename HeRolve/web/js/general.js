$(document).ready(function() {

   // var token = $.cookie('token');
	$("#bt-infobox").click(function() {
		$("#infobox").hide();
	});
	$("#infobox").hide();


});

function showInfo(text){
	$("#infobox-text").html(htmlForTextWithEmbeddedNewlines(text));
	$("#infobox").show();
}

function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}
