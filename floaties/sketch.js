var floatarray=[];
var canvaswidth=800;
var canvasheight=800;
var numfloaties=15;
function setup() {
	createCanvas(canvaswidth,canvasheight);
	
	for(var i=0; i<numfloaties; i++){
		var sfill=false;
		var type;
		
		var randnum=random(0,1);
		if (randnum<0.7){
			type='circle';
		}else if (randnum<0.8){
			type='square';
		}else if (randnum<0.9){
			type='triangle';
		}else{
			type='cross';
		}
		
		if (random(0,1)>0.5 && type=='circle'){
			sfill=true;
		}
		
		floatarray.push(new Floaty(type, sfill, random(15,30)));
	}
}

function draw() {
	background(unhex(['22','25','28']));
	
	for(var i=0; i<numfloaties; i++){
		floatarray[i].update();
		floatarray[i].render();
		if (floatarray[i].offscreen()){
			floatarray[i].vel.mult(-1);
		}
	}
	
}

//circle, square, cross, triangle
function Floaty(type, sfill, size){
	this.pos = createVector(random(0,canvaswidth),random(0,canvasheight));
	this.vel = createVector(random(-0.5,0.5),random(-.5,.5));
	this.type = type;
	this.fill = sfill;
	this.size = size;
	this.opacity = 1
	
	this.update = function(){
		this.pos.add(this.vel);
		
	}
	
	this.render = function(){
		if (this.fill){
			fill('rgba(255,255,255,'+this.opacity+')');
		}else{
			noFill();
		}
		stroke('rgba(255,255,255,'+this.opacity+')');
		strokeWeight(1);
		if (this.type=="circle"){
			ellipse(this.pos.x, this.pos.y, this.size, this.size);
		}else if (this.type=="square"){
			rect(this.pos.x, this.pos.y, this.size, this.size, 5);
		}else if (this.type=="triangle"){
			triangle(this.pos.x, this.pos.y, this.pos.x+this.size/2, this.pos.y-this.size, this.pos.x+this.size, this.pos.y);
		}else if (this.type=="cross"){
			strokeWeight(3);
			line(this.pos.x-this.size/2, this.pos.y+this.size/2, this.pos.x+this.size/2, this.pos.y-this.size/2);
			line(this.pos.x-this.size/2, this.pos.y-this.size/2, this.pos.x+this.size/2, this.pos.y+this.size/2);
		}
	}
	
	this.offscreen = function(){
		return (this.pos.x < -this.size*1.5 || this.pos.x > canvaswidth+this.size*1.5 || this.pos.y < -this.size*1.5 || this.pos.y > canvasheight+this.size*1.5);
	}
}