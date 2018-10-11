$(document).ready(function() {
	
	var token = $.cookie('token');
	if (token === null || token === "") {
		window.location = 'login.html';
	} else{
		loadData(token);

		$("#bt-map").click(function() {
			$("#zona-central-centro").load("map.html", initMap);
		});
		$("#bt-quest").click(function() {
			$("#zona-central-centro").load("quest.html", loadMisiones);
		});		
		$("#bt-city").click(function() {
			initCity(token);
		});	

		$("#bt-user").click(function() {
			$("#zona-central-centro").load("profile.html", initProfile);
		});
		$("#bt-friends").click(function() {
			$("#zona-central-centro").load("friends.html", initFriends);
		});
		$("#bt-alert").click(function() {
			$("#zona-central-centro").load("requests.html", initRequests);
		});
		$("#bt-exit").click(function() {
			closeSession(token);
		}); 
		$("#bt-juego").click(function() {
			juega(token);
		});
		$("#bt-info").click(function() {
			$("#zona-central-centro").load("info.html");
		});

		setInterval(function() { updateData(token); },5000);
		setInterval(function() { loadFriends(token); },5000);
	}
});

function updateData(token){
	$.ajax({
		url: "php/actualizaReturn.php",
		data: {
			token : token,
		},
		success: function(response) { 
			if (response == null) {
				$.cookie('token', "");
				window.location = 'login.html';
			}
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				//showInfo(response);
				updateNotify(obj.notificaciones);
				updateResourcesValues(obj);

			} else {
				showInfo(obj.msn)
				$.cookie('token', "");
				window.location = 'login.html';
			}
		},
		error: function()     { 
			showInfo("Error update") ; 
			$.cookie('token', "");
			window.location = 'login.html';
		}
	});
}

function updateResourcesValues(obj){

			$("#res_wood").text(obj.recursos[1].cantidad);
			$("#res_stone").text(obj.recursos[4].cantidad);
			$("#res_metal").text(obj.recursos[3].cantidad);
			$("#res_food").text(obj.recursos[0].cantidad);
			$("#res_rubi").text(obj.recursos[5].cantidad);
			var power = (parseInt($("#hero_power").text() ) - parseInt($("#hero_units_power").text()) );
			$("#hero_units_power").text(obj.recursos[6].cantidad);
			$("#hero_units_magic").text(obj.recursos[2].cantidad);
			$("#hero_power").text(power + parseInt($("#hero_units_power").text()) );
			$("#hero_magic").text($("#hero_units_magic").text());
}

function updateNotify(notificaciones){
	$("#list-notify").html('');
	for (var i = 1; i <= notificaciones.length; i++){
		$("#list-notify").append('<li><p>' + notificaciones[i-1].descripcion + '</p></li>');
	}
}

function loadData(token){
	loadUser(token);
	loadHero(token);
	loadResources(token);
	loadFriends(token);
}

function closeSession(token){
	$.ajax({
		url: "php/unlog.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$.cookie('token', "");
				window.location = 'login.html';
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error close") ; 
		}
	});
}

function loadResources(token){
	$.ajax({
		url: "php/getRecursos.php",
		data: {
			token : token,
		},
		success: function(response) { 
		//	document.write(response);
		var obj = $.parseJSON(response);
		if (obj.tipo == "ok"){
			updateResourcesValues(obj);
			loadHero(token);
		} else showInfo(obj.msn)
	},
	error: function()     { 
		showInfo("Error resources") ; 
	}
});
}

function loadHero(token){
	$.ajax({
		url: "php/getHeroe.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$("#hero_name").text(obj.hero.nombre);
				$("#hero_status").text(obj.hero.estado);
				$("#hero_level").text(obj.hero.nivel);
				$("#hero_exp").text(obj.hero.experiencia);
				$("#hero_power").text(parseInt(obj.hero.poder) + parseInt($("#hero_units_power").text()) );
				$("#hero_magic").text($("#hero_units_magic").text());
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error hero") ; 
		}
	});
}

function loadUser(token){
	$.ajax({
		url: "php/getUser.php",
		data: {
			token : token,
		},
		success: function(response) { 

			if (response == null) {
				$.cookie('token', "");
				window.location = 'login.html';
			}
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$("#user_name").text(obj.user.nick);
				var foto = obj.user.foto;
				if (foto == 0) foto++;
				$("#heroe-img").attr("src", "./img/heroes/hero-" + foto + ".jpg");
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Erroraa user") ; 
		}
	});
}

function loadFriends(token){
	$.ajax({
		url: "php/getAmigos.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$("#tabla-conectados").html("");
				for (var i = 0; i < obj.amigos.length; i++){
					var name = '<tr><td id="friendchat_' + i + '" class="amigo">' + obj.amigos[i].nombre + '</td>';

					switch (obj.amigos[i].estado){
						case 'c':
						$("#tabla-conectados").append(name + '<td id="friendchat_estado_' + i + '" class="estado green">Conectado</td></tr>');
						break;
						case 'd':
						$("#tabla-conectados").append(name + '<td id="friendchat_estado_' + i + '" class="estado gray">Desconectado</td></tr>');
						break;
						case 'b':
						$("#tabla-conectados").append(name + '<td id="friendchat_estado_' + i + '" class="estado red">Bloqueado</td></tr>');
						break;
						default: 
						$("#tabla-conectados").append(name + '<td id="friendchat_estado_' + i + '" class="estado gray">Desconocido</td></tr>');
						break;
					}

					$("#friendchat_" + i).click(function() {
						var id = ($(this).attr('id')).substring(11, 13);
						if ($("#friendchat_estado_" + id).text() == "Conectado"){
							initChat(token, id);
						}
					});	
				}
				$("#tabla-conectados").append('<tr><td class="amigo">Tú</td><td class="estado green">Conectado</td></tr>');
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error resources") ; 
		}
	});
}

function juega(token){
		
			$.ajax({
			url: "php/juegaPartida.php",
			data: {
				token : token,
			},
			success: function(response) { 
				var obj = $.parseJSON(response);
				if (obj.tipo == "ok"){
							
					var num= Math.floor(Math.random()*7);
				
					if(num==0){
						$("#zona-central-centro").load("prueba1.html");
					}else if(num==1){
						$("#zona-central-centro").load("prueba2.html");
					}else if(num==2){
						$("#zona-central-centro").load("prueba3.html");
					}else if(num==3){
						$("#zona-central-centro").load("prueba4.html");
					}else if(num==4){
						$("#zona-central-centro").load("prueba5.html");
					}else if(num==5){
						$("#zona-central-centro").load("prueba6.html");
					}else if(num==6){
						$("#zona-central-centro").load("prueba7.html");
					}else if(num==7){
						$("#zona-central-centro").load("prueba8.html");
					}
					
				} else showInfo("Error, no tienes suficientes recursos")
				},
			error: function()     { 
			showInfo("Error") ; 
		}
			});
}