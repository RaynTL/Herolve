$(document).ready(function() {
	
	
});

function initConnected(){
	var token = $.cookie('token');
	$.ajax({
		url: "php/getUsuariosConectados.php",
		data: {
			token : token,
		},
		success: function(response) { 
			//showInfo(response);
			var obj = $.parseJSON(response);
			$("#table-connected").html("");
			if (obj.tipo == "ok"){
				var i = 0;
				var j = 0;
				while (i < obj.usuarios.length){
					j = 0;
					var name =  "<tr>";
					while (i < obj.usuarios.length && j < 10){
						name += '<td class="amigo">' + obj.usuarios[i].nombre + '</td>';
						j++;
						i++;
					}
					name += "</tr>"
					$("#table-connected").append(name);
					//i++;
				}
			} else {
				$("#table-connected").append('<tr><td> No hay usuarios conectados </td></tr>');
			}
		},
		error: function()     { 
			showInfo("Error connected") ; 
		}
	});
}


