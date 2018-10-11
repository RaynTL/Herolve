var pos=73;
$(document).ready(function() {
	
	$("#bt-iz").click(function() {
		pos=mover(pos,1);
	});
	$("#bt-dere").click(function() {
		pos=mover(pos,3);
	});
	$("#bt-cen").click(function() {
		pos=mover(pos,2);
	});
	cargarTablero();

});
	
			function cargarTablero(){
			crearTablero();
			generaCamino(tablero);
			avanzar();		
		}

			function crearTablero(){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){			           
			           var div = document.createElement("div");
			            div.id = i + "" + j;	
						$("#73").css("background-image","none");			            
			            tablerominas.appendChild(div);
			        }
			    }		    
			}
			
		function mover(pos,lugar){			

			if(lugar==1){
			pos--;			
			}else if(lugar==3){
				pos++;
			}else{
				pos=pos-10;
			}
			if(pos==72){
				$("#72").css("background-image","none");			
			}else if(pos==62){
				$("#62").css("background-image","none");
			}else if(pos==52){
				$("#52").css("background-image","none");
			}else if(pos==53){
				$("#53").css("background-image","none");	
			}else if(pos==43){
				$("#43").css("background-image","none");
			}else if(pos==33){
				$("#33").css("background-image","none");
			}else if(pos==34){
				$("#34").css("background-image","none");
			}else if(pos==35){
				$("#35").css("background-image","none");
			}else if(pos==25){
				$("#25").css("background-image","none");
			}else if(pos==15){
				$("#15").css("background-image","none");
			}else if(pos==16){
				$("#16").css("background-image","none");
			}else if(pos==06){
				$("#06").css("background-image","none");
				showInfo("Lo lograste!");
				gana();
				setTimeout(function(){location.href='main.html'}, 2000);
			}else{
				
				showInfo("Perdiste");
				setTimeout(function(){location.href='main.html'}, 2000);
			}
			return pos;
		}



			