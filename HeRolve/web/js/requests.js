$(document).ready(function() {
	
	
});

function initRequests(){
	var token = $.cookie('token');

	$.ajax({
		url: "php/getPeticionesPendientes.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			$("#table-requests").html("");
			if (obj.tipo == "ok"){
				for (var i = 0; i < obj.peticiones.length; i++){
					var name = '<tr><td class="amigo">' + obj.peticiones[i] + '</td>';
					$("#table-requests").append(name + '<td class="boton" id="bt-add-' + i + '">Aceptar</td></tr>');
					$("#bt-add-" + i).click(function() {
						var id = ($(this).attr('id')).substring(7,9);
						acceptRequest(obj.peticiones[id], token);
					});
				}
			} else {
				$("#table-requests").append('<tr><td> No hay peticiones </td></tr>');
			}
		},
		error: function()     { 
			showInfo("Error request") ; 
		}
	});
}



function acceptRequest(nombre, token){
	$.ajax({
		url: "php/aceptaAmigo.php",
		data: {
			token : token,
			usuarioAceptar: nombre
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("El usuario ha sido agregado a tu lista de amigos.");
				initRequests();
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error accepting request") ; 
		}
	});
}

