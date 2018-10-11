$(document).ready(function() {

	initVolcan();
});


    'use strict';
    window.addEventListener('load',initVolcan,false);
    var KEY_ENTER=13;
    var KEY_SPACE=32;
    var KEY_LEFT=37;
    var KEY_UP=38;
    var KEY_RIGHT=39;
    var KEY_DOWN=40;
	var wait;
    var canvas=null,ctx=null;
    var lastPress=null;
    var pressing=[];
    var pause=true;
    var principio=false;
	var gameover=false;
    var score=0;
    var multishot=1;
    var aTimer=0;
    var bgTimer=0;
    var player=new Rectangle(165,365,14,13,0,3);
    var shots=[];
    var enemies=[];
    var powerups=[];
    var messages=[];
    var spritesheet=new Image();
    var background=new Image();
    spritesheet.src='img/spritesheet.png';
    background.src='img/volcan.png';
    function random(max){
        return ~~(Math.random()*max);
    }

    function initVolcan(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=330;
        canvas.height=390;
	
        run();
        repaint();
    }

    function run(){
        wait = setTimeout(run,40);
        act();
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function reset(){
        score=0;
        multishot=1;
        player.x=165;
        player.y=365;
        player.health=3;
        player.timer=0;
        shots.length=0;
        enemies.length=0;
        enemies.push(new Rectangle(30,0,14,13,0,2));
        enemies.push(new Rectangle(70,0,14,13,0,2));
        enemies.push(new Rectangle(110,0,14,13,0,2));
        enemies.push(new Rectangle(150,0,14,13,0,2));
		principio=false;
    }

    function act(){
        if(!pause){
            // GameOver Reset
            if(principio){
                reset();
			}
			if(gameover){
				parar();
				showInfo("¡Vaya! No has huido a tiempo y la lava te ha achicharrado.");
				setTimeout(function(){location.href='main.html'}, 2000);
				pause = true;
			}
            
            // Move Player
            //if(pressing[KEY_UP])
            //    player.y-=10;
            if(pressing[KEY_RIGHT])
                player.x+=15;
            //if(pressing[KEY_DOWN])
            //    player.y+=10;
            if(pressing[KEY_LEFT])
                player.x-=15;

            // Out Screen
            if(player.x>canvas.width-player.width)
                player.x=canvas.width-player.width;
            if(player.x<0)
                player.x=0;
            
            
           
            
            
            
            // Move Enemies
            for(var i=0,l=enemies.length;i<l;i++){
                if(enemies[i].timer>0)
                    enemies[i].timer--;
                
                
                enemies[i].y+=5;
                // Enemy Outside Screen
                if(enemies[i].y>canvas.height){
                    enemies[i].x=random(canvas.width/15)*15;
                    enemies[i].y=0;
                    enemies[i].health=2;
                }
                
                // Player Intersects Enemy
                if(player.intersects(enemies[i])&&player.timer<1){
                    player.health--;
                    player.timer=20;
                }
                
                if(aTimer%300==0 && enemies.length <60)enemies.push(new Rectangle(random(canvas.width/15)*15,25,14,13,0,2));
							
            }
            
            // Timers
            aTimer++;
            if(aTimer>500)
                aTimer-=500;
            bgTimer++;
            if(bgTimer>0)
                bgTimer-=300;
            
            // Damaged
            if(player.timer>0)
                player.timer--;
            
            // GameOver
            if(player.health<1){
                gameover=true;
            }
        }
        // Pause/Unpause
        if(lastPress==KEY_ENTER && pause){
            pause=!pause;
			principio=!principio;
            lastPress=null;
			contar(90, true);
        }
    }

    function paint(ctx){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.globalAlpha=0.8;
        if(background.width){
		
            ctx.drawImage(background,0,0);
        }
        else{
		
            ctx.fillStyle='#fff';
			
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        
		ctx.globalAlpha=1;
        ctx.strokeStyle='#0f0';
        if(player.timer%2==0)
            //player.fill(ctx);
            player.drawImageArea(ctx,spritesheet,40,0,10,10);
       
        for(var i=0,l=enemies.length;i<l;i++){
			
            enemies[i].drawImageArea(ctx,spritesheet,70,(i%2)*5,5,5);
            //enemies[i].fill(ctx);
        }
        ctx.fillText('Health: '+player.health,280,20);
        if(pause){
            ctx.textAlign='center';
            if(gameover)
                ctx.fillText('GAMEOVER',165,190);
            else
                ctx.fillText('ENTER',165,190);
            ctx.textAlign='left';
        }
		
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

    function Rectangle(x,y,width,height,type,health){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.width=(width==null)?0:width;
        this.height=(height==null)?this.width:height;
        this.type=(type==null)?1:type;
        this.health=(health==null)?1:health;
        this.timer=0;
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

    Rectangle.prototype.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width)
            ctx.drawImage(img,sx,sy,sw,sh,this.x,this.y,this.width,this.height);
        else
            ctx.strokeRect(this.x,this.y,this.width,this.height);
    }

    function Message(string,x,y){
        this.string=(string==null)?'?':string;
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
	
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