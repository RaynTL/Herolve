var minas = inicializaMatriz();	

$(document).ready(function() {

	cargarTablero();

});

			function cargarTablero(){
			crearTablero();
			generarBombas(minas);
			generarEstrellas(minas);
			
		}
			function inicializaMatriz(){
				var tabla = [];
				for(var i = 0; i < 8; i++){			        
			        tabla[i] = [0,0,0,0,0,0,0,0];			        
			    }
			    return tabla;
			}		

			function crearTablero(){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){			           
			           var div = document.createElement("div");
			            div.id = i + "" + j;			            
			            div.addEventListener("click",mostrarNumero, true);			            
			            tablerominas.appendChild(div);
			        }
			    }		    
			    
			}

			function mostrarNumero(e){
				var auxstr = this.id.split("");				
				var myid = auxstr[0] + auxstr[1];			
				divObj = document.getElementById(myid);

				if(minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] == 0){
				divObj.style.backgroundImage = "none";	
					divObj.style.backgroundColor = "#H8000000F";					
				}else if(minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] == "+"){
					divObj.style.backgroundColor="white";
					divObj.style.backgroundImage = "url(img/rubi.png)";	
					showInfo("Lo lograste!");
					gana();
				setTimeout(function(){location.href='main.html'}, 2000);
				}else{
					showInfo("La mina se te ha derrumbado. Ten cuidado la próxima vez");
					setTimeout(function(){location.href='main.html'}, 2000);
												
				}						
			}				


			function generarBombas(tablero){
				var fil = 0;
				var col = 0;

				fil = Math.floor((Math.random()*7)+0);
				col = Math.floor((Math.random()*7)+0);

				for(var i = 0; i < 8; i++){
					while (tablero[fil][col] == "*"){
						fil = Math.floor((Math.random()*7)+0);
						col = Math.floor((Math.random()*7)+0);
					}
					tablero[fil][col] = "*";			
				}
			}
			
			function generarEstrellas(tablero){
				var fil = 0;
				var col = 0;

				fil = Math.floor((Math.random()*4)+0);
				col = Math.floor((Math.random()*4)+0);

				for(var i = 0; i < 5; i++){
					while (tablero[fil][col] == "+"){
						fil = Math.floor((Math.random()*4)+0);
						col = Math.floor((Math.random()*4)+0);
					}
					tablero[fil][col] = "+";			
				}
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