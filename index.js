'use strict';
const width = 450, height= 450;
const w = 15;
let cols;
let rows;
let grid=[];
let stack=[];
let ci,cj;

function setup(){
 createCanvas(width,height);
 cols = floor(width/w);
 rows = floor(height/w);
 ci=floor(random(0,cols));
 cj=floor(random(0,rows));
 for(let i=0; i< cols; i++)
 {
 	let ar=[];
 	for(let j=0; j<rows; j++)
 	{
 		let cell = new Cell();
 		ar.push(cell);
 	}
 	grid.push(ar);
 } 
 grid[ci][cj].visited=true; //ci , cj denotes current cell
}

function draw(){
	background(51);
	for(let i=0; i<grid.length; i++)
	{
		for(let j=0; j<grid[i].length; j++)
			show(i,j);
	}
	let next = checkNeighbors(ci,cj); //returns co-ordinates of neighbor
	if(next){
		stack.push([ci,cj]);
		grid[next[0]][next[1]].visited=true;
		removeWalls(ci,cj,next[0],next[1]);
		[ci,cj]=next;
	}
	else if(stack.length>0)
		[ci,cj] = stack.pop();
}

function show(i,j)
{
	let y = i*w;
	let x = j*w;
	if(grid[i][j].visited)
	{
		noStroke();
		fill(255,0,78,80);
		rect(x,y,w,w);
	}
	stroke(255);
	if(grid[i][j].walls[0]){
		line(x  , y,   x+w, y); //top	
	}
	if(grid[i][j].walls[1]){
		line(x+w, y,   x+w,  y+w); //right	
	}
	if(grid[i][j].walls[2]){
		line(x+w, y+w, x, y+w); //bottom	
	}
	if(grid[i][j].walls[3]){
		line(x,  y+w, x, y); //left	
	}
}

function removeWalls(i1,j1,i2,j2)
{
	let dx = i1 - i2, dy = j1 - j2;
	if(dx===1) //neighbor is left of current cell
	{
		grid[i1][j1].walls[1] = false; //removing left wall of current
		grid[i2][j2].walls[3]= false; //removing right wall of neighbor
	}
	else if(dx===-1)
	{
		grid[i1][j1].walls[3] = false; //removing left wall of current
		grid[i2][j2].walls[1]=false;  //removing left wall of neighbor
	}

	if(dy===1)
	{
		grid[i1][j1].walls[0] = false; //removing top wall of current
		grid[i2][j2].walls[2]=false; //removing bottom wall of neighbor	
	}
	else if(dy===-1)
	{
		grid[i1][j1].walls[2] = false; //removing bottom wall of current
		grid[i2][j2].walls[0]=false; //removing top wall of neighbor
	}
}

function checkNeighbors(i,j)
{		
	let neighbor=[];
	if(grid[i] && grid[i][j-1] && !grid[i][j-1].visited) //top
		neighbor.push([i,j-1]);
	if(grid[i] && grid[i][j+1] && !grid[i][j+1].visited) //bottom
		neighbor.push([i,j+1]);
    if(grid[i-1] && grid[i-1][j] && !grid[i-1][j].visited)//left
		neighbor.push([i-1,j]);
	if(grid[i+1] && grid[i+1][j] && !grid[i+1][j].visited) //right
		neighbor.push([i+1,j]);	

	if(neighbor.length>0)
		return neighbor[floor(random(0,neighbor.length))];
	else
	  return undefined; //if all neighbors are visited
}