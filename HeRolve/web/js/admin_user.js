function initAdminUser(){
    var token = $.cookie("token");
    $("#table-user").hide();
    $("#table-user-buttons").hide();
    $("#bt-add").hide();
    $("#bt-newuser").click(function() {
        newUserClick();
    }); 
    $("#bt-searchuser").click(function() {
        searchUserClick(token);
    }); 

    $("#bt-add").click(function(){
        register($("#register_user").val(), $("#register_pass").val(), $("#register_email").val(), $("#register_hero").val())
    })
    $("#bt-modify").click(function(){
        //register($("#register_user").val(), $("#register_pass").val(), $("#register_email").val(), $("#register_hero").val())
        modifyUser($("#modify_wood").val(),$("#modify_stone").val(),$("#modify_metal").val(),$("#modify_ruby").val(),$("#modify_food").val(),$("#modify_soldiers").val(),'1',$("#register_hero").val(), $("#modify_mages").val(),token)
    })

    $("#bt-remove").click(function(){
        deleteUser($("#register_user").val(), token);
    })

}

function newUserClick(){
    $("#table-user").show();
    $("#bt-add").show();
    $("#bt-newuser").hide();

    $("#table-user-buttons").hide();

    clearFields();
}

function searchUserClick(token){
    $("#table-user").show();
    $("#table-user-buttons").show();

    $("#bt-newuser").show();
    $("#bt-add").hide();
    loadUserData( $("#find_user").val(), token);

}


function loadUserData(user, token){
     $.ajax({
        url: "php/getUsuario.php",
        data: {
            token: token,
            nick: user
        },
        success: function(response) { 

            obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                $("#modify_wood").val(obj.info.recursos[1].cantidad);
                $("#modify_stone").val(obj.info.recursos[4].cantidad);
                $("#modify_metal").val(obj.info.recursos[3].cantidad);
                $("#modify_ruby").val(obj.info.recursos[5].cantidad);
                $("#modify_food").val(obj.info.recursos[0].cantidad);
                $("#modify_soldiers").val(obj.info.recursos[6].cantidad);
                $("#modify_mages").val(obj.info.recursos[2].cantidad)
                $("#register_hero").val(obj.info.heroe.nombre);
                $("#register_user").val(obj.info.usuario.nick);
                $("#register_email").val("");
                $("#register_pass").val("");
            } else showInfo(obj.msn + ", usuario no encontrado");
        },
        error:   function()     { 
            showInfo("Error, fallo al buscar usuario") ; 
        }
    });
}

function clearFields(){
    $("#find_user").val("");
    $("#modify_wood").val("");
    $("#modify_stone").val("");
    $("#modify_metal").val("");
    $("#modify_ruby").val("");
    $("#modify_food").val("");
    $("#modify_soldiers").val("");
    $("#modify_mages").val("")
    $("#register_hero").val("");
    $("#register_user").val("");
    $("#register_email").val("");
    $("#register_pass").val("");
}


function register(user, password, email, hero) {
    $.ajax({
        url: "php/registrar.php",
        data: {
            nombreUsuario : user,
            contrasenaUsuario : password,
            emailUsuario : email,
            nombreHeroe : hero
        },
        success: function(response) { 
            obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Registro completado");
                clearFields();
            } else showInfo(obj.msn)
        },
        error: function() { 
            showInfo("Error al crear el usuario") ; 
        }
    });

} 

function deleteUser(username, token) {
    $.ajax({
        url: "php/borrarUsuario.php",
        data: {
            user : username,
            token : token
        },
        success: function(response) { 
            obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Usuario eliminado");
            } else showInfo(obj.msn)
        },
        error: function() { 
            showInfo("Error, no se pudo eliminar el usuario") ; 
        }
    });
} 

function modifyUser(wood,stone,metal,ruby,food,soldiers,world,hero, mages,token) {
    $.ajax({
        url: "php/setRecursos.php",
        data: {
            token: token,
            heroe: hero,
            idMundo : world,
            madera : wood,
            piedra : stone,
            metal : metal,
            rubies : ruby,
            comida : food,
            soldados: soldiers,
            magos: mages
        },
        success: function(response) { 
            obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Recursos actualizados");
            } else showInfo(obj.msn)
        },
        error:   function()     { 
            showInfo("Error, fallo al modificar al usuario") ; 
        }
    });
}



function banUser(usr, token) {

    $.ajax({
        url: "php/blockUsuario.php",
        data: {
            user : usr,
            token : token
        },
        success: function(response) { 
            var obj = $.parseJSON(response);
            obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Usuario bloqueado");
            } else showInfo(obj.msn)
        },
        error: function()     { 
            showInfo("Error al bloquear el usuario.") ; 
        }
    });
}



