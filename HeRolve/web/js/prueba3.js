$(document).ready(function() {
	
	$("#bt-pr2").click(function() {
	
	if (($("#p13").is(":checked")) && ($("#p22").is(":checked")) && ($("#p32").is(":checked"))){
			showInfo("Está claro que eres responsable, que tienes experiencia en las pruebas, y que sabes que no hay nada más valioso que la tropas que te acompañan");
			gana();
			setTimeout(function(){location.href='main.html'}, 3000);
			
		}else{
			showInfo("Tendrás que intentarlo la próxima vez.");
			setTimeout(function(){location.href='main.html'}, 2000);
		}
	});	
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