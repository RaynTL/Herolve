$(document).ready(function() {
	$.cookie('token', "");
	$("#bt-register").click(function() {
		if (checkRegister()) register($("#register_user").val(), $("#register_pass").val(), $("#register_email").val(), $("#register_hero").val());
	});	
});


function register(user, password, email, hero) {
	var data, success;
	var a = $.ajax({
		url: "php/registrar.php",
		data: {
			nombreUsuario : user,
			contrasenaUsuario : password,
			emailUsuario : email,
			nombreHeroe : hero}
		})
	.success (function(response) { 
		obj = $.parseJSON(response);
		if (obj.tipo == "ok"){
			showInfo("Registro completado");
		} else showInfo("Error al registrarse " + obj.msn)
	})
	.error   (function()     { 
		showInfo("Error reg, contacta con el administrador.") ; 
	})
}

function checkRegister(){
	if (!($("#register_terms").is(":checked"))){
		showInfo("Debes aceptar los T&C");
		return false;
	} else	if (($("#register_user").val().length == 0) || ($("#register_pass").val().length == 0) ||
		($("#register_email").val().length == 0) || ($("#register_hero").val().length == 0)) {
		showInfo("Faltan datos");
		return false;
	} else return true;

}

