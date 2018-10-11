$(document).ready(function() {
	


});

function initCity(token){
	$("#zona-central-centro").empty();
	var max_row = 2;
	var max_col = 4;
	initBuildings(max_row, max_col, token);
	loadBuildings(max_row, max_col, token);
	loadHeroBuildings(max_row, max_col, token);
	loadBuildingsInfo(max_row, max_col, token);
}

function loadBuildings(max_row, max_col, token){
	$.ajax({
		url: "php/getEdificios.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				for (var i = 0; i < max_row; i++){
					for (var j = 0; j < max_col; j++){

						$("#name_building_" + i + "" + j).text(obj.edificios[(i*max_col + j)].nombre);
					}
				}
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error resources") ; 
		}
	});
}

function loadHeroBuildings(max_row, max_col, token){
	$.ajax({
		url: "php/getEdificiosHeroe.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				for (var i = 0; i < max_row; i++){
					for (var j = 0; j < max_col; j++){
						$("#level_building_" + i + "" + j).text("nvl. " + obj.edificios[(i*max_col + j)].nivel);
					}
				}
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error resources") ; 
		}
	});
}

function loadBuildingsInfo(max_row, max_col, token){

	$.ajax({
		url: "php/getEdificios.php",
		data: {
			token : token,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				for (var i = 0; i < max_row; i++){
					for (var j = 0; j < max_col; j++){
						var info = "b_info_" + i + '' + j;

						$("#bt-" + info).click(function() {
							var row = ($(this).attr('id')).substring(10,11);
							var col = ($(this).attr('id')).substring(11,12);
							var id = parseInt(row)*max_col + parseInt(col);
							var level = parseInt($("#level_building_" + row + "" + col).text().substring(5, 8));

							showInfo( "Descripción: \n" +
								obj.edificios[id].descripcion +
								"\n\nRequisitos: \n" +
								"Madera: " + (obj.edificios[id].valormadera*(level + 1)) + " Piedra: " + (obj.edificios[id].valorpiedra*(level + 1)) + " Metal: " + (obj.edificios[id].valormetal*(level + 1)) + 
								" Comida: " + (obj.edificios[id].valorcomida*(level + 1)) + " Rubíes: " + (obj.edificios[id].valorrubies*(level + 1)) +
								"\n\nProduce: " + obj.edificios[id].clase_recurso);
						});
					}
				}
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error resources") ; 
		}
	});
}


function initBuildings(max_row, max_col, token){

	for(var i = 0; i < max_row; i++){

		jQuery('<div/>', {
			id: 'r' + i,
			style: 'float: left; width: 100%; height:' + (100/max_row) + '%;'
		}).appendTo("#zona-central-centro");

		for(var j = 0; j < max_col; j++){
			var id = "building_" + i + '' + j; 
			var info = "b_info_" + i + '' + j;
			var src;
			src = '"img/buildings/building_' + i + '' + j + '.jpg"';
			jQuery('<div/>', {
				id: 'f' + i + 'c' + j,
				html: '<img id = ' + id + ' class = "building-img" src=' + src + '/> <div id = "div_' + id 
				+ '" > <div id="' + id + '" class="center"> <div id = "name_' + id + '" class="inline"> Desconocido </div> <div id = "level_' + id 
				+ '" class="inline">nvl. x</div> </div> <div id = "button_' + id + '" class="center"> <button class="boton" id="bt-' + id 
				+ '">Mejorar</button> <button class="boton" id="bt-' + info + '">Info</button> </div>  </div>',
				style: 'float: left; height: 100%; width:' + (100/max_col) + '%;'
			}).appendTo("#r" + i);

			$("#bt-" + id).click(function() {
				upgradeBuilding(($(this).attr('id')).substring(12,13), ($(this).attr('id')).substring(13,14), max_col, token);
			});
		}
	}
}

function upgradeBuilding (row, col, max_col, token){
	var id = (parseInt(row)*parseInt(max_col)) + parseInt(col) + 1;
	$.ajax({
		url: "php/mejoraEdificio.php",
		data: {
			token : token,
			idEdificio : id,
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				showInfo("¡Has mejorado el edificio!");
			} else {
				if (obj.msn == "hayEdificioConstrucion") showInfo("Hay otro edificio en construcción.\nEspera a que se construya.");
					else showInfo("Falta " + obj.falta)
			}
		},
		error: function()     { 
			showInfo("Error mejora") ; 
		}
	});
}