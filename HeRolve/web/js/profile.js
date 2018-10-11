$(document).ready(function() {
});

function initProfile(){
	var token = $.cookie('token');
	$("#bt-profile").click(function() {
		modifyUser(token);
	});

	for (var i = 1; i <= 8; i++){
		$("#profile_avatar_select").append('<option value=' + i + '>Imagen ' + i + '</option>');
	}

	$('#profile_avatar_select').on('change', function (e) {
	    var optionSelected = $("option:selected", this);
	    var valueSelected = this.value;
	  	$("#profile_avatar_img").attr("src", "./img/heroes/hero-" + valueSelected + ".jpg");
	});


}

function modifyUser(token){
	var pass = $("#profile_pass").val();
	var email = $("#profile_email").val();
	var avatar = $('#profile_avatar_select').find(":selected").val();
	$.ajax({
		url: "php/cambiarUser.php",
		data: {
			token : token,
			pass : pass,
			correo : email,
			foto : avatar
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("Datos cambiados, la imagen de perfil se cambiará la próxima vez que te conectes.");
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error friends") ; 
		}
	});
}

