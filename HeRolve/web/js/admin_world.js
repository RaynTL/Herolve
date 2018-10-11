function registerWorld(name, n_users) {
    $.ajax({
        url: "php/creaMundo.php",
        data: {
            nombreMundo : name,
            numMax : n_users
        },
        success: function(response) { 
            var obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Mundo creado");
            } else showInfo("No se pudo crear el mundo.")
        },
        error: function()     { 
            showInfo("Error crear mundo") ; 
        }
    });
}