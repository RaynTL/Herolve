var g1=false;
var g2=false;
var g3=false;
var g4=false;
var g5=false;

$(document).ready(function() {
	
	$("#a1").hide();
	$("#a2").hide();
	$("#a3").hide();
	$("#a4").hide();
	$("#a5").hide();
	$("#bt-ready9").click(function() {
		initMap();
		contar(40,false);
		$("#a1").show();
		$("#a2").show();
		$("#a3").show();
		$("#a4").show();
		$("#a5").show();
	});
	$("#a1").click(function() {
		$(this).slideUp();
		g1=true;
		comprobarGuardianes();
	});
	$("#a2").click(function() {
		$(this).slideUp();
		g2=true;
		comprobarGuardianes();
	});
	$("#a3").click(function() {
		$(this).slideUp();
		g3=true;
		comprobarGuardianes();
	});
	$("#a4").click(function() {
		$(this).slideUp();
		g4=true;
		comprobarGuardianes();
	});
	$("#a5").click(function() {
		$(this).slideUp();
		g5=true;
		comprobarGuardianes();
	});
});

function initMap(){
	$("#bt-ready9").hide();
	$("#enuncia").hide();
	var max_row = 10;
	var max_col = 10;
	for(var i = 0; i < max_row; i++){
		jQuery('<div/>', {
			id: 'map_r' + i,
			style: 'float: left; width: 100%; height:' + (100/max_row) + '%;'
		}).appendTo("#castle-cells");
		for(var j = 0; j < max_col; j++){
			var id = "building_" + i + '' + j; 
			jQuery('<div/>', {
				id: 'map_f' + i + 'c' + j,
				style: 'float: left; height: 100%; width:' + (100/max_col) + '%;'
			}).appendTo("#map_r" + i);
		}
	}
	
	$("#a1").appendTo("#map_f3c5");
	$("#a2").appendTo("#map_f7c6");
	$("#a3").appendTo("#map_f1c2");
	$("#a4").appendTo("#map_f3c1");
	$("#a5").appendTo("#map_f7c3");
	
	var i = 3;
	var j = 5;
	var mover1 = function(){
		if (j == 5 && i <5 ){
			i++;
		} else if (i == 5 && j < 8){
			j++;
		} else if (j == 8 && i > 3){
			i--;
		} else {
			j--;
		}
		$("#a1").appendTo("#map_f" + i + "c" + j);
	};
	setInterval(mover1, 200);
	
	var a = 7;
	var b = 6;
	var mover2 = function(){
		if (b == 6 && a <7 ){
			a++;
		} else if (a == 7 && b < 9){
			b++;
		} else if (b == 9 && a > 4){
			a--;
		} else {
			b--;
		}
		$("#a2").appendTo("#map_f" + a + "c" + b);
	
	};
	setInterval(mover2, 400);
	
	var c = 1;
	var d = 2;
	var mover3 = function(){
		if (d == 2 && c <7 ){
			c++;
		} else if (c == 7 && d < 8){
			d++;
		} else if (d == 8 && c > 1){
			c--;
		} else {
			d--;
		}
		$("#a3").appendTo("#map_f" + c + "c" + d);
	};
	setInterval(mover3, 150);
	
	
	var f=2;
	var g=0;
	var mover4 = function(){
		if (g == 0 && f <6 ){
			f++;
		} else if (f == 6 && g < 3){
			g++;
		} else if (g == 3 && f > 2){
			f--;
		} else {
			g--;
		}
		$("#a4").appendTo("#map_f" + f + "c" + g);
	};
	setInterval(mover4, 200);
	
	var k=7;
	var h=3;
	var mover5 = function(){
		if (k == 7 && h <9 ){
			h++;
		} else if (h == 9 && k < 9){
			k++;
		} else if (k == 9 && h > 3){
			h--;
		} else {
			k--;
		}
		$("#a5").appendTo("#map_f" + k + "c" + h);
	};
	setInterval(mover5, 400);

}

function comprobarGuardianes(){
	if(g1==true&&g2==true&&g3==true&&g4==true){
		parar();
		showInfo("Era difícil, pero has conseguido derrotar a todos los guardianes. Ya puedes entrar en el castillo!");
		gana();
		setTimeout(function(){location.href='main.html'}, 2000);
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