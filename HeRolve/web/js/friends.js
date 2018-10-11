$(document).ready(function() {
	
	
});

function initFriends(){
	var token = $.cookie('token');
	
	$("#bt-searchfriend").click(function() {
		if ($("#addfriend_name").val()!="") searchFriend(token);
		else showInfo("Debes introducir texto para buscar");
	});

	$.ajax({
		url: "php/getAmigos.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$("#table-friends").html("");
				for (var i = 0; i < obj.amigos.length; i++){
					var name = '<tr><td class="amigo">' + obj.amigos[i].nombre + '</td>';
					switch (obj.amigos[i].block){
						case 'no':
						switch (obj.amigos[i].estado){
							case 'c':
							$("#table-friends").append(name + '<td class="estado green">Conectado</td><td class="boton" id="bt-block-' + i + '">Bloquear</td></tr>');
							break;
							case 'd':
							$("#table-friends").append(name + '<td class="estado gray">Desconectado</td><td class="boton" id="bt-block-' + i + '">Bloquear</td></tr>');
							break;
							default: 
							$("#table-friends").append(name + '<td class="estado gray">Desconocido</td><td class="boton" id="bt-block-' + i + '">Bloquear</td></tr>');
							break;
						}
						break;
						case 'si':
							$("#table-friends").append(name + '<td class="estado red">Bloqueado</td><td class="boton grande" id="bt-block-' + i + '">Desbloquear</td></tr>');
							break;
						break;
					}

					$("#bt-block-" + i).click(function() {
						var id = ($(this).attr('id')).substring(9,11);
						if ($(this).text()=="Bloquear"){
							blockFriend(obj.amigos[id].nombre, token);
						} else unBlockFriend(obj.amigos[id].nombre, token);
					});
				}
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error friends") ; 
		}
	});
}

function searchFriend(token){
	var name = $("#addfriend_name").val();
	$.ajax({
		url: "php/buscarAmigos.php",
		data: {
			token : token,
			amigo : name
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$("#table-search-friends").html("");
				for (var i = 0; i < obj.amigos.length; i++){
					var name = '<tr><td id="name-addfriend' + i + '" class="amigo">' + obj.amigos[i] + '</td>';

					$("#table-search-friends").append(name + '<td class="estado black"><button class="boton" id="select-addfriend' + i + '">Agregar</button></td></tr>');
					$("#select-addfriend" + i).click(function() {
						var id = ($(this).attr('id')).substring(16,17);
						addFriend(obj.amigos[id], token);
					});
				}
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error friends") ; 
		}
	});
}



function addFriend(nombre, token){
	$.ajax({
		url: "php/agregarAmigo.php",
		data: {
			token : token,
			amigoAgregar: nombre
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("Petición de amistad realizada con éxito.");
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error adding friend") ; 
		}
	});
}

function blockFriend(nombre, token){
	$.ajax({
		url: "php/blockUsuario.php",
		data: {
			token : token,
			user: nombre
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("Usuario bloqueado.");
				initFriends();
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error adding friend") ; 
		}
	});
}

function unBlockFriend(nombre, token){
	$.ajax({
		url: "php/unBlockUsuario.php",
		data: {
			token : token,
			user: nombre
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("Usuario desbloqueado.");
				initFriends();
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error adding friend") ; 
		}
	});
}
