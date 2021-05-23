function preload() {
  img = loadImage('assets/pick.png');
}


function setup() {
canvas = createCanvas(window.innerWidth,window.innerHeight-4);
	sqrt2=Math.sqrt(2);
	player = { //Im just setting up new varibales to use it on the server side i guess :(((
		speed:.35,
		health:100,

		_leftHandPosX:-47,
		leftHandPosX:-47,
		_leftHandPosY:10,
		leftHandPosY:10,
		_rightHandPosX:47,
		rightHandPosX:47,
		_rightHandPosY:10,//=-0-= <--- 0 is player itself, = are hands x controls distance between player and hands y sets the vertical 
		rightHandPosY:10,//=-0-= <--- 0 is player itself, = are hands x controls distance between player and hands y sets the vertical 
		fireAnimationStep:0.45,//speed of the animation 1-0
		isFire:false,//is fire animation playing rn
		stats:{
			distanceTravelled:0,
			totalPunchCount:0,
			playerKills:0,
			mobKills:0,
			score:0
		},
		inventory:[null,null,null,null,null,null,null,null,null,null]

	}
	player.move = function(x,y){
  		if(x!=0 && y!=0){
  			posX += player.speed*x*(1/sqrt2)*deltaTime;
  			posY += player.speed*y*(1/sqrt2)*deltaTime;
  		}
  		else{
  			posX += player.speed*x*deltaTime;
  			posY += player.speed*y*deltaTime;
  		}
  		
  	}
  	player.update = function(){
  		x0=0;
  		y0=0;
		keyIsDown(87) && y0++;
  		keyIsDown(65) && x0++;
  		keyIsDown(83) && y0--;
  		keyIsDown(68) && x0--;
  		player.move(x0,y0);
  		mouseIsPressed && checkMouse();

  	}

	player.fire = function(){
		if (amount < 0) {
			player.fireAnimationStep *= -1;
			}

			amount = amount + -1*(player.fireAnimationStep/10)*(deltaTime/10);
			player.rightHandPosY=(lerp(70,10, amount)*cos((amount-1)*-42))
			player.rightHandPosX=(lerp(35,47, amount)*cos((amount-1)*-42))
			if (amount >= 1){
				player.fireAnimationStep *= -1;
				player.isFire=false;
				player.stats.totalPunchCount++;
				amount=0.9999;
		}
	}
	player.draw = function(){
		//BODY
		stroke(37, 75, 94);
		strokeWeight(2);
		fill(43, 122, 161);
		rect(0,0,50,65,10);
		//ITEMS

		rectMode(CORNER)//Items Rotation down below
		translate(player.leftHandPosY,-(5))
		rotate((amount-1)*55)//Item Placement down below

		image(img,-(player.leftHandPosY-2),-(player.leftHandPosX-10+img.height/2))

		rotate(-(amount-1)*55)//Undoing all rotations an movements to prevent any tilting
		translate(-(player.leftHandPosY),(5))
		//HANDS
		rectMode(CENTER)
		ellipse(player.rightHandPosY,player.rightHandPosX,20);
		ellipse(player.leftHandPosY,player.leftHandPosX,20);
		//EYES
		stroke(37, 75, 94);
		strokeWeight(2);
		fill(0, 0, 0);
		ellipse(5,-15,22)
		ellipse(5,15,22)
		fill(200)
		stroke(200)
		ellipse(9,-15,10)
		ellipse(9,15,10)

	}



	amount = 1.0099;
	
		val0=0;
		angle=0;
		slope=0;
		giveAngle=function(){
			slope=(mouseY-(canvas.height/2))/(mouseX-(canvas.width/2))
			angle = (Math.atan((mouseY-(canvas.height/2))/(mouseX-(canvas.width/2)))*(180/Math.PI));

			if(slope<0 && angle<0 && mouseY<(canvas.height/2)){angle = angle*-1;val0=0}
			else if(slope>0 && angle>0 && mouseY<(canvas.height/2)){angle = (90-angle)+90;val0=1}
			else if(slope<0 && angle<0 && mouseY>(canvas.height/2)){angle = (-1*angle)+180;val0=2}
			else{angle = (90-angle)+270;val0=3}	
			return angle;
		};



	i=0;
	posX=0;
	posY=0;
	setInterval(function(){console.log(player.isFire+"<- is fire"+player.stats.totalPunchCount+" "+val0+" <- "+angle+ " slope: " + slope)},200);


	//PROBLEM : Rendering thousands of trees isn't good for performance
	//SOLUTION: Create a new map when a player is moving but only draw near objects...
	//HOW TO: Player is always stays at 0,0 so we should only draw objects inside of (-300,-300,canvas.width+600,canvas.height+600)   
	/*
	jMin=Math.floor((500-posX)/50)+5
	iMin=Math.floor((500-posY)/50)+5
	jMax=Math.ceil((canvas.width+300-posX)/50)
	iMax=Math.ceil((canvas.height+300-posY)/50)
	if(jMax>map0[0].length){jMax=map0[0].length}
	if(iMax>map0.length){iMax=map0.length}
	if(jMin<0){jMin=0}
	if(iMin<0){iMin=0}
	resources0=[];
	count=0;
	for(i=iMin;i<iMax;i++){

		for(j=jMin;j<jMax-1;j++){
			
			if(map0[i][j]==1){
				console.log(map0[i][j] + " " + i + " " + j)
				resources0[count] = new Resources(j*50,i*50)
				count++;
			}
		}
	}
	*/

	//resources0 =shuffle(resources0)
	/* Spawns 2 pieces of tree
	for(var i=0;i<2;i++){
		resources[i] = new Resources(Math.floor(Math.random()*1000),Math.floor(Math.random()*1000))
		
	}*/
  	setTheScale = function(x){
  		if(x<0){return -x}
  		else{return x}
		
	}
}
cPalette={
	player:[[37, 75, 94],[43, 122, 161]],
	tree:[[158,155,38],[137,142,12]]
}
theScale=1;
function draw() {
	//canvas = createCanvas(window.innerWidth,window.innerHeight-4);
  	canvas.background(0);
  	angleMode(DEGREES);
	ellipseMode(CENTER);
  	rectMode(CENTER);
	frameRate(144);

	background(0)
	
	
	//player firing
	//UNDERWORLD
	//UNDERWORLD
	//UNDERWORLD
	//UNDERWORLD
	//UNDERWORLD
	//image(img,posX,posY);
	if(player.isFire){
		player.fire();
	}


	//PLAYER
	//PLAYER
	//PLAYER
	//PLAYER
	//PLAYER
  	translate(canvas.width/(2*theScale),canvas.height/(2*theScale))
  	scale(setTheScale(((mouseX-canvas.width/2)/750)*sin(((mouseX-canvas.width/2)/10)))+.2)
  	rotate(-giveAngle());
  	i++;
  	ellipseMode(CENTER);
  	rectMode(CENTER);
  	player.update();
  	player.draw();
  	//player Draw done


  	rotate(giveAngle());
  	translate(-canvas.width/2,-canvas.height/2);
  	//unrotated
  	//OVERWORLD
  	//OVERWORLD
  	//OVERWORLD
  	//OVERWORLD
  	//OVERWORLD



	jMin=Math.floor((-55-posX)/50)
	iMin=Math.floor((-55-posY)/50)
	jMax=Math.ceil((canvas.width+300-posX)/50)
	iMax=Math.ceil((canvas.height+300-posY)/50)
	if(jMax>map0[0].length){jMax=map0[0].length}
	if(iMax>map0.length){iMax=map0.length}
	if(jMin<0){jMin=0}
	if(iMin<0){iMin=0}
	resources0=[];
	count=0;
	for(i=iMin;i<iMax;i++){
		for(j=jMin;j<jMax;j++){
			if(map0[i][j]==1){
				resources0[count] = new Resources(j*50,i*50)
				count++;
			}
		}
	}



  	for(var i=0;i<resources0.length;i++){
		resources0[i].show();
	}

  	//translate(mouseX-canvas.width/2,mouseY-canvas.height/2);

text(fps(), 10, 30);

}
checkMouse = ()=>{
	if (mouseButton === LEFT) {
	    if(player.isFire){return;}
	    player.isFire=true;

	}
}

theFPS = 0;
time=0;
fps = () => {
	time+=deltaTime;
	if(time>=500){
		time=0;
		theFPS=floor(getFrameRate())
		if(theFPS == 59 || theFPS ==61){theFPS=60}
		if(theFPS == 143 || theFPS ==145){theFPS=144}
	}

	return theFPS;
}
