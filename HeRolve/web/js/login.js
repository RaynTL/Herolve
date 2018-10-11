function login(user, password, mundo) {
	//var hash = getSalt(user, password, mundo);
	getUser(user, password, mundo);
}

function getUser (user, password, mundo){
	$.ajax({
		url: "php/logear.php",
		data: {
			nombreUsuario : user,
			pass : password,
			mundoHeroe : mundo
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				$.cookie('token', obj.token);
				window.location = 'main.html';
			} else showInfo("Error al conectar " + obj.msn)
		},
		error: function()     { 
			showInfo("Error login, contacta con el administrador.") ; 
		}
	});
}

/*function getSalt (user, password, mundo){
	var hash;
	$.ajax({
		url: "php/getSalt.php",
		data: {
			nombreUsuario : user
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				var salt = obj.salt;
				hash = SHA1(password + salt);
				getUser (user, hash, mundo);
			} else showInfo(obj.msn)
		},
		error: function() { 
			showInfo("Error salt, contacta con el administrador") ; 
		}
	});
	return hash;
}*/

$(document).ready(function() {
	$("#bt-login").click(function() {
		if(checkLogin())login($("#login_user").val(), $("#login_pass").val(), $('#login_world').find(":selected").val());
	});	

	addMundos();
});


function addMundos(){
	$.ajax({
		url: "php/getMundos.php",
		data: {
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				for (var i = 1; i <= obj.mundos.length; i++){
					$("#login_world").append('<option value=' + i + '>Mundo ' + i + '</option>');
				}
			} else showInfo(obj.msn)
		},
		error: function() { 
			showInfo("Error mundos, contacta con el administrador") ; 
		}
	});
}


function checkLogin(){
	if (($("#login_user").val().length == 0) || ($("#login_pass").val().length == 0)) {
		showInfo("Faltan datos");
		return false;
	} else return true;

}

