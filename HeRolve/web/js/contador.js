$(document).ready(function() {
	clearInterval(refreshIntervalId);
});


	var segundos = -1;
	var ganar;
	var p;
	var refreshIntervalId;
	
function disminuir(){
	if(segundos>-1 && p==false)segundos--;
	if(segundos>-1){
		document.getElementById("contador").innerHTML="Faltan "+ segundos+ " segundos";
	}else{
		if(ganar){
			showInfo("Felicidades, has aguantado lo suficiente");
			gana();
			setTimeout(function(){location.href='main.html'}, 2000);
		}
		else{
			showInfo("¡Vaya! Has fallado. Esfuerzate mas para la siguiente");
			setTimeout(function(){location.href='main.html'}, 2000);
		}
	}
}

function contar(seg,g){
	segundos = seg;
	p = false;
	ganar= g;
	disminuir();
	refreshIntervalId=setInterval(disminuir,1000);
}

function parar(){
	p = true;
}

function clear(){
	clearInterval(refreshIntervalId);
}
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