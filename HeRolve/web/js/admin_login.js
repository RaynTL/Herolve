function login(user, password) {
	var hash = getUser(user, password);
}

function getUser (user, password){
	$.ajax({
		url: "php/logearAdmin.php",
		data: {
			nombreUsuario : user,
			pass : password
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				window.location = 'admin.html';
				$.cookie('token', obj.token);
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error login, contacta con el administrador.") ; 
		}
	});
}

function getSalt (user, password){
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
				getUser (user, hash);
			} else showInfo(obj.msn)
		},
		error: function() { 
			showInfo("Error salt, contacta con el administrador") ; 
		}
	});
	return hash;
}

$(document).ready(function() {
	$("#bt-login").click(function() {
		if(checkLogin())login($("#login_user").val(), $("#login_pass").val());
	});	

});


function checkLogin(){
	if (($("#login_user").val().length == 0) || ($("#login_pass").val().length == 0)) {
		showInfo("Faltan datos");
		return false;
	} else return true;

}

