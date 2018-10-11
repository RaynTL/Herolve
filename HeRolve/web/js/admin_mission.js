
function initMission(){

    var token = $.cookie("token");
    $("#bt-register_mission").click(function() {
        createMision(token, $("#register_mission_name").val(), $("#register_mission_level").val(), 
            $("#register_mission_story").val(), $("#register_mission_time").val(), $("#register_mission_power").val(), 
            $("#register_mission_fail").val(), $("#register_mission_exp").val(), $("#register_mission_food").val(), 
            $("#register_mission_wood").val(), $("#register_mission_metal").val(), 
            $("#register_mission_stone").val(), $("#register_mission_ruby").val(), 1, $("#register_mission_pos").val(), $("#register_mission_x").val(), $("#register_mission_y").val());
            $("#register_mission_name").val("");
            $("#register_mission_level").val(""); 
            $("#register_mission_story").val(""),
            $("#register_mission_time").val("");
            $("#register_mission_power").val(""), 
            $("#register_mission_fail").val("");
            $("#register_mission_exp").val("");
            $("#register_mission_food").val(""); 
            $("#register_mission_wood").val("");
            $("#register_mission_metal").val(""); 
            $("#register_mission_stone").val("");
            $("#register_mission_ruby").val("");
            $("#register_mission_x").val("");
            $("#register_mission_y").val("");        
            $("#register_mission_pos").val("");  
    });

}


function createMision(token, title,lv,tale,time,pwr,fail,exp,food,wood,metal, stone,ruby, map_id, pos, x, y) {
    var data, success;

    $.ajax({
        url: "php/creaMision.php",
        data: {
            token : token,
            nombre : title,
            nivel : lv,
            desc : tale,
            tiempo : time,
            poder : pwr,
            fallo : fail,
            jug : "1",
            re : exp,
            rc : food,
            rma : wood,
            rme : metal,
            rp : stone,
            rb : ruby
        },
        success: function(response) { 
            var obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                addMissionToMap(token, map_id, obj.id, pos, x, y);
              //  showInfo("Misión creada " + obj.id);
            } else showInfo("No se pudo crear la misión.")
        },
        error: function()     { 
            showInfo("Error crear misión") ; 
        }
    });
} 


function addMissionToMap(token, map_id, mission_id, pos, x, y) {
    var data, success; 

    $.ajax({
        url: "php/agregaMisionAMapa.php",
        data: {
            token : token,
            idMapa : map_id,
            idMision : mission_id,
            posicion : pos,
            x : x,
            y : y
        },
        success: function(response) { 
            var obj = $.parseJSON(response);
            if (obj.tipo == "ok"){
                showInfo("Misión creada");
            } else showInfo("No se pudo crear la misión.")
        },
        error: function()     { 
            showInfo("Error crear misión") ; 
        }
    });
} 

