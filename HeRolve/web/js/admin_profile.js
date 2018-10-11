$(document).ready(function() {
	
});

function initAdminProfile(){
    var token = $.cookie("token");
	$("#bt-profile").click(function() {
		modifyAdmin(token);
	});
}

function modifyAdmin(token){
	var pass = $("#profile_pass").val();
	$.ajax({
		url: "php/cambiarAdmin.php",
		data: {
			token : token,
			pass : pass
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("cambiado");
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error friends") ; 
		}
	});
}
