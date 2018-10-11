$(document).ready(function() {
	initLaberinto();
		
	
});

    window.addEventListener('load',initLaberinto,false);
    var KEY_ENTER=13;
    var KEY_LEFT=37;
    var KEY_UP=38;
    var KEY_RIGHT=39;
    var KEY_DOWN=40;
	var pause = false;
    var canvas=null,ctx=null;
    var lastPress=null;
    var pressing=[]; 
    var gameover=true;
    var player=new Rectangle(40,40,15,15);
    var wall=[];
    var lava=[];
    var map0=[
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,
    1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,
    1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,
    1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,
    1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,
    1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,
    1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,
    1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,1,1,
    1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,1,0,1,0,1,1,
    1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,
	1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,1,
	1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,
	1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1,0,1,0,1,
	1,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,0,0,1,0,1,0,0,
	1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,
	1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,
	1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];

    function setMap(map,columns,blockSize){
        var col=0;
        var row=0;
        wall.length=0;
        lava.length=0;
        for(var i=0;i<map.length;i++){
            if(map[i]==1)
                wall.push(new Rectangle(col*blockSize,row*blockSize,blockSize,blockSize));
            else if(map[i]==2)
                lava.push(new Rectangle(col*blockSize,row*blockSize,blockSize,blockSize));
            col++
            if(col>=columns){
                row++;
                col=0;
            }
        }
    }

    function initLaberinto(){
        canvas=document.getElementById("canvas");
        ctx=canvas.getContext('2d');
        canvas.width=600;
        canvas.height=405;
        contar(50,false);
        setMap(map0,40,15);
        run();
        repaint();
    }

    function run(){
        setTimeout(run,100);
        act();
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){
        player.x=15;
        player.y=390;
        gameover=false;
    }

    function act(){
		if(!pause){
			if(player.x==585 && (player.y==330 || player.y == 345)){
				parar(true);
				gana();
				showInfo("¡Felicidades! Has logrado escapar del bosque a tiempo.");
				setTimeout(function(){location.href='main.html'}, 2000);
				
			}
				
				// GameOver Reset
				if(gameover){
					reset();
					gameover=false;
				}
				
				// Move Rect
				if(pressing[KEY_UP]){
					player.y-=15;
					for(var i=0;i<wall.length;i++){
						if(player.intersects(wall[i])){
							player.y+=15;
						}
					}
				}
				if(pressing[KEY_RIGHT]){
					player.x+=15;
					for(var i=0;i<wall.length;i++){
						if(player.intersects(wall[i])){
							player.x-=15;
						}
					}
				}
				if(pressing[KEY_DOWN]){
					player.y+=15;
					for(var i=0;i<wall.length;i++){
						if(player.intersects(wall[i])){
							player.y-=15;
						}
					}
				}
				if(pressing[KEY_LEFT]){
					player.x-=15;
					for(var i=0;i<wall.length;i++){
						if(player.intersects(wall[i])){
							player.x+=15;
						}
					}
				}
				
				// Out Screen
				if(player.x>canvas.width)
					player.x=0;
				if(player.y>canvas.height)
					player.y=0;
				if(player.x<0)
					player.x=canvas.width;
				if(player.y<0)
					player.y=canvas.height;
			}
			if(segundos==0) pause = true;
    }

    function paint(ctx){
	
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle='#fff';
		ctx.globalAlpha=0.3;
        ctx.fillRect(0,0,canvas.width,canvas.height);
       
       ctx.globalAlpha=1;
		var imagen2 = new Image();
		imagen2.src = 'img/bosque.png';
		var textura2 = ctx.createPattern(imagen2,'repeat');
		ctx.fillStyle= textura2;
        for(var i=0;i<wall.length;i++)
            wall[i].fill(ctx);
			
			 var imagen = new Image();
		imagen.src = 'img/hoguera.png';
		var textura = ctx.createPattern(imagen,'repeat');
		ctx.fillStyle= textura;
        player.fill(ctx);
        
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

    function Rectangle(x,y,width,height){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
    }

    Rectangle.prototype.intersects=function(rect){
        if(rect!=null){
            return(this.x<rect.x+rect.width&&
                this.x+this.width>rect.x&&
                this.y<rect.y+rect.height&&
                this.y+this.height>rect.y);
        }
    }

	
    Rectangle.prototype.fill=function(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height);

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
	