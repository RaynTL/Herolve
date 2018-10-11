$(document).ready(function() {

	var token = $.cookie("token");
	loadData(token);

	$("#center_container").load("admin_home.html");
	
	$("#bt-users").click(function() {
		$("#center_container").load("admin_user.html", initAdminUser);
	});
	$("#bt-mision").click(function() {
		$("#center_container").load("admin_mission.html", initMission);
	});			
	// $("#bt-world").click(function() {
	// 	$("#center_container").load("admin_world.html");
	// });		

	$("#bt-home").click(function() {
		$("#center_container").load("admin_home.html");
	});		

	$("#bt-user").click(function() {
		$("#center_container").load("admin_profile.html", initAdminProfile);
	});		

	$("#bt-admin").click(function() {
		$("#center_container").load("admin_admin.html", initAdminAdmin);
	});	
	$("#bt-exit").click(function() {
		closeSessionAdmin(token);
	}); 

	$("#connected_users").click(function(){
		$("#center_container").load("admin_connected.html", initConnected);
	})
	$("#bt-info").click(function(){
		$("#center_container").load("admin_info.html");
	})

});


function updateNotify(notificaciones){
	$("#bitacoras_container").html('');
	for (var i = 1; i <= notificaciones.length; i++){
		$("#bitacoras_container").append('<li><p>' + notificaciones[i-1].descripcion + '</p></li>');
	}
}

function loadData(token){
	//loadUser(token);
	loadConnectedCount(token);
}

function closeSessionAdmin(token){

	$.ajax({
		url: "php/unlogAdmin.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$.cookie('token', "");
				window.location = 'admin_login.html';
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error close") ; 
		}
	});
}

function loadConnectedCount(token){

	$.ajax({
		url: "php/getUsuariosConectadosNumero.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$("#connected_count").html(obj.usuarios);
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error close") ; 
		}
	});
}
/*
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
				showInfo(response);
				$("#user_name").text(obj.user.nick);
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Erroraa user") ; 
		}
	});
}
*/
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
				window.location = 'logadmin.html';
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error close") ; 
		}
	});
}