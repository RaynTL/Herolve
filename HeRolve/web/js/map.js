$(document).ready(function() {
	
});

function initMap(){

	var max_row = 20;
	var max_col = 20;
	for(var i = 0; i < max_row; i++){
		jQuery('<div/>', {
			id: 'map_r' + i,
			style: 'float: left; width: 100%; height:' + (100/max_row) + '%;'
		}).appendTo("#map-cells");
		for(var j = 0; j < max_col; j++){
			var id = "building_" + i + '' + j; 
			jQuery('<div/>', {
				id: 'map_f' + i + 'c' + j,
				style: 'float: left; height: 100%; width:' + (100/max_col) + '%;'
			}).appendTo("#map_r" + i);
		}
	}

	var token = $.cookie('token');
	loadQuest(token);
}

function loadQuest(token){

	$.ajax({
		url: "php/getMisionesHeroe.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				for (var i = 0; i < obj.misiones.misionesPosicion.length; i++){
					$("#map_f" + obj.misiones.misionesPosicion[i].y + "c" + obj.misiones.misionesPosicion[i].x).html('<img class="clickable" id="quest_' + i + '" src="img/buttons/quest.png"/>');

					$("#quest_" + i).click(function() {
						var id = ($(this).attr('id')).substring(6, 7);
						startQuest(token, obj.misiones.misiones[id].id);
					});		
					$("#quest_" + i).on({
						mousemove: function(e) {
							var top = $("#zona-central-centro").offset().top;
							var left = $("#zona-central-centro").offset().left;
							var bot = top + $("#zona-central-centro").height() ;
							var tt_top = e.pageY - top + 10;
							var dif = $(window).height() - (e.pageY + $(this).next('div').height());
							//showInfo(" " + dif);
							if ( dif < 30) tt_top += dif - 50;//$(this).next('div').height();
							var tt_left = e.pageX - left + 10;
							$(this).next('div').css({
								top: tt_top,
								left: tt_left
							});
						},
						mouseenter: function() {
							var id = ($(this).attr('id')).substring(6, 7);
							var mis = obj.misiones.misiones[id];
							var tiempo = parseInt(mis.tiempo);
							var d, h, m, s;
							if (tiempo < 60) {
								tiempo = mis.tiempo + " segundos";
							} else{
								m = ~~(tiempo/60);
								s = tiempo % 60;
								if (m < 60) {
									tiempo = m + " minutos " + s + " segundos";
								} else{
									h = ~~(m/60);
									m = m%60;
									if (h < 24) {
										tiempo = h + " h " + m + " min " + s + " seg";
									} else {
										d = ~~(h/24);
										h = h%24;
										tiempo = d + " d " + h + " h " + m + " min " + s + " seg";
									}
								}
							}
							var tt = jQuery('<div/>', {
								class: 'tooltip',
								html: '<p class="center white"><strong>' + mis.nombre + '</strong></p>' +
								'<p class="center">' + mis.descripcion + '</p>' +
								'<p><a class="white">Duración:</a><br/>' + tiempo + '</p>' +
								'<p><a class="white">Requisitos:</a><br/>' + 
								'Nivel ' + mis.nivel + 
								'<br/>Poder ' + mis.poder + '</p>' +
								'<p><a class="white">Fallo:</a> ' + mis.fallo + '</p>' +
								'<p><a class="white">Jugadores:</a> ' + mis.jugadores + '</p>' +
								'<p><a class="white">Recompensas:</a><br/>'+
								mis.rec_madera + ' madera <br/>' + 
								mis.rec_piedra + ' piedra <br/>' + 
								mis.rec_metal + ' metal <br/>' + 
								mis.rec_comida + ' comida <br/>' + 
								mis.rec_rubies + ' rubies <br/> </p>' +
								'<p><a class="white">Experiencia:</a> ' + mis.rec_experiencia + '</p>'

							})
							$(this).after(tt);
						},
						mouseleave: function() {
							$('.tooltip').remove();
						}
					});
}
} else showInfo(obj.msn)
},
error: function()     { 
	showInfo("Error resources") ; 
}
});
}


function startQuest(token, idmision){
	$.ajax({
		url: "php/hacerMision.php",
		data: {
			token : token,
			idMision : idmision
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("Misión iniciada.\n\n No podrás iniciar más misiones hasta que termines esta.");
			} else showInfo("No se pudo iniciar la misión.\n\n Prueba con otra o espera a terminar si tienes una en proceso.")
		},
		error: function()     { 
			showInfo("Error quest") ; 
		}
	});
}


