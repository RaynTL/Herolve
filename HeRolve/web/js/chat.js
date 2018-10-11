$(document).ready(function() {
	
	
});

function initChat(token, friend){
	var name = $("#friendchat_" + friend).text();
	//showInfo(name);
	$("#zona-central-derecha-inferior").html('');
	var chat = jQuery('<div/>', {
		id: 'chat',
		html: '<div id="chat-title"> <button id="bt-chatback" class="boton">X</button> <a id="chat-usertitle">Chat con ' + name + '</a> </div> <div id="chat-read"> <table id="chat-table"> </table > </div> <div id="chat-write"> <input type="text" id="chat-input"> </input> </div>'

	})
	$("#zona-central-derecha-inferior").append(chat);

	setInterval(function() { loadChat(token, name); }, 1000);

	$("#bt-chatback").click(function() {
		backToFriends(token);
	});

	$('#chat-input').bind("enterKey",function(e){
		if ($("#chat-input").val() != ""){
			sendMessage(token, name, $("#chat-input").val());
			$("#chat-input").val("");
		}
	});

	$('#chat-input').keyup(function(e){
		if(e.keyCode == 13)
		{
			$(this).trigger("enterKey");
		}
	});
}

function sendMessage(token, receiver, msg){
	$.ajax({
		url: "php/enviarMensaje.php",
		data: {
			token : token,
			para: receiver,
			msn: msg
		},
		success: function(response) { 
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
			}  else showInfo(obj.msn)
		},
		error: function() { 
			showInfo("Error sending message") ; 
		}
	});
}

function loadChat(token, name){
	$.ajax({
		url: "php/getMensajeFromUser.php",
		data: {
			token : token,
			user: name
		},
		success: function(response) { 
			//document.write(response);
			var obj = $.parseJSON(response);
			if (obj.tipo == "ok"){
				var mensajes = obj.mensajes;
				$("#chat-table").html('');
				for (var i = 0; i < mensajes.length; i++){
					var cchat = "herolve";
					if (mensajes[i].de == name) cchat = "green";
					$("#chat-table").append('<tr><td class="' + cchat + '">' + mensajes[i].de + '</td><td>' + mensajes[i].fecha.substring(0,10) + ':</td></tr>' +
						'<tr> <td colspan="2">' + mensajes[i].msn + '</td></tr>');
				}
				$("#chat-read").scrollTop($("#chat-read")[0].scrollHeight);
			} else if ((obj.tipo == "error") && (obj.msn == "noMensajes")){

				//document.write(response);
			} else showInfo(obj.msn)
		},
		error: function()     { 
			showInfo("Error load chat") ; 
		}
	});
}

function backToFriends(token){
	$("#zona-central-derecha-inferior").html('');
	var chat = jQuery('<div/>', {
		id: 'div-connected',
		html: '<table id="tabla-conectados"> </table>'

	})
	$("#zona-central-derecha-inferior").append(chat);
	loadFriends(token);
}