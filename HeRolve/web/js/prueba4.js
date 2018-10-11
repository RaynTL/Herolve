

$(document).ready(function() {
	contar (20,false);
	$("#divgrande").click(function() {
		$("#informa").text("Por aquí no encontrarás nada");
	});
	$("#divsup").click(function() {
		$("#informa").text("Te estás acercando");
	});
	$("#divinf").click(function() {
		$("#informa").text("Te estás acercando");
	});
	
	$("#divceniz").click(function() {
		$("#informa").text("Estás muy cerca!");
	});
	$("#divcendere").click(function() {
		$("#informa").text("Estás muy cerca!");
	});
	$("#divok").click(function() {
		showInfo("Has encontrado al fantasma. Quizá tenga algo para ti.");
		gana();
		setTimeout(function(){location.href='main.html'}, 2000);
	});
	juega();

});


function gana(){
	var token = $.cookie('token');
	$.ajax({
			url: "php/ganaPartida.php",
			data: {
				token : token,
			},
			success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error") ; 
		}
	});
	}