function initAdminAdmin(){
    var token = $.cookie("token");

    $("#bt-register_admin").click(function(){
        registerAdmin(token, $("#register_admin_name").val(), $("#register_admin_pass").val())
    })


}

function registerAdmin(token, user, password) {
    $.ajax({
        url: "php/registrarAdmin.php",
        data: {
            nombreUsuario : user,
            contrasenaUsuario : password,
        },
        success: function(response) { 
            obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Registro completado");
            } else showInfo(obj.msn)
        },
        error: function() { 
            showInfo("Error al crear el usuario") ; 
        }
    });
    $("#register_admin_name").val("");
    $("#register_admin_pass").val("");

} 


