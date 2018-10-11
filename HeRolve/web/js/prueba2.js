$(document).ready(function() {
	var oportunidades=0;
	var hecho=false;
	var num= Math.floor(Math.random()*(70-55)+parseInt(55));
	$("#bt-pr2").click(function() {
	
		if($("#entrada").val()==num ){
		
			showInfo("Es el precio perfecto para todos. Felicidades, eres un buen comerciante. Tendrás tu recompensa");
			gana();
			setTimeout(function(){location.href='main.html'}, 2000);
				
		}else if($("#entrada").val()>num){
			$("#informa").text("Tus soldados creen que es un precio disparatado, ¿no te parece?.");
				oportunidades=oportunidades+1;
			
		}else{
			$("#informa").text("El aldeano cree que te ríes de él. Es un precio demasiado bajo para sus productos.");
				oportunidades=oportunidades+1;
		
		}
			
		if(oportunidades>4&&!hecho){
			
			showInfo("Ni tus soldados ni el comerciante están contentos con el acuerdo. No tienes más oportunidades. Hasta otra");
			setTimeout(function(){location.href='main.html'}, 2000);
			
			}
		
	});	
});
function gana(){
	var token = $.cookie('token');
	$.ajax({
			url: "php/ganaPartida.php",
			data: {
				token : token,
			},
			success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error") ; 
		}
	});
	}