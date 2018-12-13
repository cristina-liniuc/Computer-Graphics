"use strict";
//aici din cube 1
var canvas;



var flag = true;

var axisTr = 0;
var axisSc = 0;



var thetaLoc;
var trLoc;
var trInput = 0;

var scLoc;
var scInput = 1;

var objects = [];
//finish
var gl;
var points;

var NumPoints = 5000;

var index = 0;
var currently_selectedINDEX = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

     gl.enable(gl.DEPTH_TEST);

   

  function  Cilinder(){

    this.xAxis = 0;
    this.yAxis = 1;
    this.zAxis = 2;

    this.theta = [ 0, 0, 0 ];
    this.axis = this.xAxis;
    this.rotationValue = 0;

    this.tr = [ 0, 0, 0 ];
    this.translation_xAxis = 0;
    this.translation_yAxis = 1;
    this.translation_zAxis = 2;
    this.translation_axis = this.translation_xAxis;
    this.translationValue = 0;
    
    this.sc = [ 1, 1, 1 ];
    this.scalation_xAxis = 0;
    this.scalation_yAxis = 1;
    this.scalation_zAxis = 2;
    this.scalation_axis = this.scalation_xAxis;
    this.scalationValue = 1;

    this.vertices = [];
    this.colors = [];
    this.r=0.1;
    this.raz=0.1;
    this.pi = 3.14159;
    this.nrPoint=1000;
    this.drawCilinder = function() {
    //The for for the circle in the base of the cone 
    for ( var i=1; i<=this.nrPoint; i++){
    this.vertices.push(vec3(this.raz*Math.cos(i*2*this.pi/this.nrPoint),0.3, this.raz*Math.sin(i*2*this.pi/this.nrPoint)));
    this.vertices.push(vec3(0,0.3,0));
    this.vertices.push(vec3(this.raz*Math.cos((i-1)*2*this.pi/this.nrPoint),0.3, this.raz*Math.sin((i-1)*2*this.pi/this.nrPoint)));
    };
    for ( var i=1; i<=this.nrPoint; i++){
        this.colors.push(vec3( 1,  0,  1 ));
        this.colors.push(vec3( 0,  0,  1 ));
        this.colors.push(vec3( 0,  1,  1 ));   
    };
//for cilinder trianghes
    for ( var i=1; i<=this.nrPoint; i++){
    this.vertices.push(vec3(this.r*Math.cos(i*2*this.pi/this.nrPoint),0, this.r*Math.sin(i*2*this.pi/this.nrPoint)));
    this.vertices.push(vec3(this.r*Math.cos(i*2*this.pi/this.nrPoint),0.3, this.r*Math.sin(i*2*this.pi/this.nrPoint)));
    this.vertices.push(vec3(this.r*Math.cos((i-1)*2*this.pi/this.nrPoint), 0, this.r*Math.sin((i-1)*2*this.pi/this.nrPoint)));

    this.vertices.push(vec3(this.r*Math.cos((i-1)*2*this.pi/this.nrPoint), 0, this.r*Math.sin((i-1)*2*this.pi/this.nrPoint)));
    this.vertices.push(vec3(this.r*Math.cos((i-1)*2*this.pi/this.nrPoint), 0.3, this.r*Math.sin((i-1)*2*this.pi/this.nrPoint)));
    this.vertices.push(vec3(this.r*Math.cos(i*2*this.pi/this.nrPoint),0.3, this.r*Math.sin(i*2*this.pi/this.nrPoint)));   
    };
    for ( var i=1; i<=this.nrPoint; i++){
        this.colors.push(vec3( 1,  0,  0 ));
        this.colors.push(vec3( 1,  0,  0 ));
        this.colors.push(vec3( 1,  0,  0 ));
        this.colors.push(vec3( 1,  0,  0 ));
        this.colors.push(vec3( 1,  0,  0 ));
        this.colors.push(vec3( 1,  0,  0 ));
    };
//The for for the circle in the base of the cone 
    for ( var i=1; i<=this.nrPoint; i++){
    this.vertices.push(vec3(this.r*Math.cos(i*2*this.pi/this.nrPoint),0, this.r*Math.sin(i*2*this.pi/this.nrPoint)));
    this.vertices.push(vec3(0,0,0));
    this.vertices.push(vec3(this.r*Math.cos((i-1)*2*this.pi/this.nrPoint), 0, this.r*Math.sin((i-1)*2*this.pi/this.nrPoint)));  
    };
    for ( var i=1; i<=this.nrPoint; i++){
        this.colors.push(vec3( 1,  0,  1 ));
        this.colors.push(vec3( 0,  1,  0 ));
        this.colors.push(vec3( 0,  1,  0 ));
    };

    }
    this.render = function(){

    // Load the data into the GPU
    var verticesId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, verticesId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var colorsId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorsId);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors),gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation (program, "vColor");
    gl.vertexAttribPointer( vColor,3,gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( vColor);

        // gl.clear( gl.COLOR_BUFFER_BIT );

    // tr[axisTr]=trInput;
    // sc[axisSc]=scInput;

    this.tr[this.translation_axis] = this.translationValue;
    this.sc[this.scalation_axis] = this.scalationValue;
    // console.log(this.vertices.length);
    // console.log(this.colors.length);
    this.theta[this.axis]  += 1;
    gl.uniform3fv(thetaLoc, this.theta);
    gl.uniform3fv(trLoc, this.tr);
    gl.uniform3fv(scLoc, this.sc);

    gl.drawArrays( gl.TRIANGLES, 0, this.vertices.length );
    }
  } 

  function Sphere (){
    this.xAxis = 0;
    this.yAxis = 1;
    this.zAxis = 2;

     this.theta = [ 0, 0, 0 ];
    this.axis = this.xAxis;
    this.translationValue = 0;

    this.tr = [ 0, 0, 0 ];
    this.translation_xAxis = 0;
    this.translation_yAxis = 1;
    this.translation_zAxis = 2;

    this.translation_axis = this.translation_xAxis;

    this.sc = [ 1, 1, 1 ];
    this.scalation_xAxis = 0;
    this.scalation_yAxis = 1;
    this.scalation_zAxis = 2;
    this.scalation_axis = this.scalation_xAxis;
    this.scalationValue = 1;

    this.rotationValue = 0;

    this.vertices = [];
    this.colors = [];
    this.pi = 3.14159;
    this.NumPoints = 5000;
    this.latPoints=100;
    this.longPoints=100;
    this.r=0.3;
    this.drawSphere = function(){
        for ( var i=0; i<=this.latPoints; i++){
            for ( var j=0; j<=this.longPoints; j++){
                this.vertices.push(vec3(this.r*Math.cos(j*2*this.pi/this.longPoints)*Math.sin(i*this.pi/this.latPoints), this.r*Math.cos(i*this.pi/this.latPoints), this.r*Math.sin(j*2*this.pi/this.longPoints)*Math.sin(i*this.pi/this.latPoints)));
                this.vertices.push(vec3(this.r*Math.cos(j*2*this.pi/this.longPoints)*Math.sin((i+1)*this.pi/this.latPoints), this.r*Math.cos((i+1)*this.pi/this.latPoints), this.r*Math.sin(j*2*this.pi/this.longPoints)*Math.sin((i+1)*this.pi/this.latPoints)));
                this.vertices.push(vec3(this.r*Math.cos((j+1)*2*this.pi/this.longPoints)*Math.sin(i*this.pi/this.latPoints), this.r*Math.cos(i*this.pi/this.latPoints), this.r*Math.sin((j+1)*2*this.pi/this.longPoints)*Math.sin(i*this.pi/this.latPoints)));
                this.colors.push(vec3(0,0,1));
                this.colors.push(vec3(0,1,0));
                this.colors.push(vec3(1,0,0));

                this.vertices.push(vec3(this.r*Math.cos(j*2*this.pi/this.longPoints)*Math.sin((i+1)*this.pi/this.latPoints), this.r*Math.cos((i+1)*this.pi/this.latPoints), this.r*Math.sin(j*2*this.pi/this.longPoints)*Math.sin((i+1)*this.pi/this.latPoints)));
                this.vertices.push(vec3(this.r*Math.cos((j+1)*2*this.pi/this.longPoints)*Math.sin(i*this.pi/this.latPoints), this.r*Math.cos(i*this.pi/this.latPoints), this.r*Math.sin((j+1)*2*this.pi/this.longPoints)*Math.sin(i*this.pi/this.latPoints)));
                this.vertices.push(vec3(this.r*Math.cos((j+1)*2*this.pi/this.longPoints)*Math.sin((i+1)*this.pi/this.latPoints), this.r*Math.cos((i+1)*this.pi/this.latPoints), this.r*Math.sin((j+1)*2*this.pi/this.longPoints)*Math.sin((i+1)*this.pi/this.latPoints)));
                
                this.colors.push(vec3(1,0,0));
                this.colors.push(vec3(0,1,0));
                this.colors.push(vec3(0,0,1));
            };
        };
    }
    this.render = function(){
    // Load the data into the GPU
    var verticesId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, verticesId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var colorsId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorsId);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors),gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation (program, "vColor");
    gl.vertexAttribPointer( vColor,3,gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( vColor);


    // if(flag) theta[axis] += 0.5;
    // tr[axisTr]=trInput;
    // sc[axisSc]=scInput;

   
    this.tr[this.translation_axis] = this.translationValue;
    this.sc[this.scalation_axis] = this.scalationValue;
    // console.log(this.vertices.length);
    // console.log(this.colors.length);
    this.theta[this.axis]  += 1;
    gl.uniform3fv(thetaLoc, this.theta);
    gl.uniform3fv(trLoc, this.tr);
    gl.uniform3fv(scLoc, this.sc);

    gl.drawArrays( gl.TRIANGLES, 0, 6*(this.latPoints+1)*(this.longPoints+1) ); 
    }
  }

  function Cone() {
    this.xAxis = 0;
    this.yAxis = 1;
    this.zAxis = 2;

     this.theta = [ 0, 0, 0 ];
    this.axis = this.xAxis;
    this.translationValue = 0;

    this.tr = [ 0, 0, 0 ];
    this.translation_xAxis = 0;
    this.translation_yAxis = 1;
    this.translation_zAxis = 2;

    this.translation_axis = this.translation_xAxis;

    this.sc = [ 1, 1, 1 ];
    this.scalation_xAxis = 0;
    this.scalation_yAxis = 1;
    this.scalation_zAxis = 2;
    this.scalation_axis = this.scalation_xAxis;
    this.scalationValue = 1;

    this.rotationValue = 0;

    this.vertices = [];
    this.colors = [];
    this.pi = 3.14159;
    this.r=0.2;
    this.nrPoint=1000;
    this.drawCone = function(){
                    //The for for the cone 
        for ( var i=1; i<=this.nrPoint; i++){
            this.vertices.push(vec3(this.r*Math.cos(i*2*this.pi/this.nrPoint),0, this.r*Math.sin(i*2*this.pi/this.nrPoint)));
            this.vertices.push(vec3(0,0.5,0));
            this.vertices.push(vec3(this.r*Math.cos((i-1)*2*this.pi/this.nrPoint), 0, this.r*Math.sin((i-1)*2*this.pi/this.nrPoint)));
        };
        for ( var i=1; i<=this.nrPoint; i++){
                this.colors.push(vec3( 1,  0,  0 ));
                this.colors.push(vec3( 0,  1,  0 ));
                this.colors.push(vec3( 0,  0,  1 ));   
        };
            //The for for the circle in the base of the cone 
        for ( var i=1; i<=this.nrPoint; i++){
            this.vertices.push(vec3(this.r*Math.cos(i*2*this.pi/this.nrPoint),0, this.r*Math.sin(i*2*this.pi/this.nrPoint)));
            this.vertices.push(vec3(0,0,0));
            this.vertices.push(vec3(this.r*Math.cos((i-1)*2*this.pi/this.nrPoint), 0, this.r*Math.sin((i-1)*2*this.pi/this.nrPoint)));   
        };
        for ( var i=1; i<=this.nrPoint; i++){
                this.colors.push(vec3( 1,  1,  0 ));
                this.colors.push(vec3( 0,  1,  1 ));
                this.colors.push(vec3( 1,  0,  1 ));  
        };
    }
    this.render = function(){
         // Load the data into the GPU
    var verticesId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, verticesId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var colorsId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorsId);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors),gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation (program, "vColor");
    gl.vertexAttribPointer( vColor,3,gl.FLOAT, false,0,0);
    gl.enableVertexAttribArray( vColor);


    
    // if(flag) theta[axis] += 0.5;
    // tr[axisTr]=trInput;
    // sc[axisSc]=scInput;

    this.tr[this.translation_axis] = this.translationValue;
    this.sc[this.scalation_axis] = this.scalationValue;
    // console.log(this.vertices.length);
    // console.log(this.colors.length);
    this.theta[this.axis]  += 1;
    gl.uniform3fv(thetaLoc, this.theta);
    gl.uniform3fv(trLoc, this.tr);
    gl.uniform3fv(scLoc, this.sc);
    gl.drawArrays( gl.TRIANGLES, 0, this.nrPoint*6 );
   
      // body...
    }
  }
   

   
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
        //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    thetaLoc = gl.getUniformLocation(program, "theta");
    trLoc = gl.getUniformLocation(program,"tr");
    scLoc = gl.getUniformLocation(program,"sc");

    document.getElementById( "xButton" ).onclick = function () {
        objects[currently_selectedINDEX].axis = objects[currently_selectedINDEX].xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        objects[currently_selectedINDEX].axis = objects[currently_selectedINDEX].yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        objects[currently_selectedINDEX].axis = objects[currently_selectedINDEX].zAxis;;
    };
        // document.getElementById( "tButton" ).onclick = function () {
        //     flag = !flag;
        // };

    document.getElementById( "slide1" ).oninput = function () {
        objects[currently_selectedINDEX].translation_axis = objects[currently_selectedINDEX].xAxis;
        objects[currently_selectedINDEX].translationValue = parseFloat(event.target.value,10);
    };
    document.getElementById( "slide2" ).oninput = function () {
        objects[currently_selectedINDEX].translation_axis = objects[currently_selectedINDEX].yAxis;
        objects[currently_selectedINDEX].translationValue = parseFloat(event.target.value,10);
    };
    document.getElementById( "slide3" ).oninput = function () {
        objects[currently_selectedINDEX].translation_axis = objects[currently_selectedINDEX].zAxis;
        objects[currently_selectedINDEX].translationValue = parseFloat(event.target.value,10);
    };

    document.getElementById( "slider1" ).oninput = function () {
        objects[currently_selectedINDEX].scalation_axis = objects[currently_selectedINDEX].xAxis;
        objects[currently_selectedINDEX].scalationValue = parseFloat(event.target.value,10);
    };
    document.getElementById( "slider2" ).oninput = function () {
        objects[currently_selectedINDEX].scalation_axis = objects[currently_selectedINDEX].yAxis;
        objects[currently_selectedINDEX].scalationValue = parseFloat(event.target.value,10);
    };
    document.getElementById( "slider3" ).oninput = function () {
        objects[currently_selectedINDEX].scalation_axis = objects[currently_selectedINDEX].zAxis;
        objects[currently_selectedINDEX].scalationValue = parseFloat(event.target.value,10);
    };
    //finish
    //  function getCilinder() {
    //     var myCilinder = new Cilinder() ;
    //     myCilinder.drawCilinder();
    //     objects.push(myCilinder);
    // }
    // function getSphere() {
    //     var mySphere = new Sphere() ;
    //     mySphere.drawSphere();
    //     objects.push(mySphere);
    // }
    // function getCone() {
    //     var myCone = new Cone();
    //     myCone.drawCone();
    //     objects.push(myCone);
    // }  
    document.getElementById("cilindru").onclick = function (){
    var myCilinder= new Cilinder();
    myCilinder.drawCilinder();
    objects.push(myCilinder);
    var button = document.createElement("BUTTON");
    var text = document.createTextNode("Cilinder "+ (index+1));
    button.appendChild(text);
    document.body.appendChild(button);
    var temp = index;
    button.onclick= function(){
        currently_selectedINDEX=temp;
    }
    index++;
};
    document.getElementById("Sphere").onclick = function (){
    var mySphere= new Sphere();
    mySphere.drawSphere();
    objects.push(mySphere);
    var button = document.createElement("BUTTON");
    var text = document.createTextNode("Sphere "+ (index+1));
    button.appendChild(text);
    document.body.appendChild(button);
    var temp = index;
    button.onclick= function(){
        currently_selectedINDEX=temp;
    }
    index++;
};
    document.getElementById("Cone").onclick = function (){
    var myCone= new Cone();
    myCone.drawCone();
    objects.push(myCone);
    var button = document.createElement("BUTTON");
    var text = document.createTextNode("Cone "+ (index+1));
    button.appendChild(text);
    document.body.appendChild(button);
    var temp = index;
    button.onclick= function(){
        currently_selectedINDEX=temp;
    }
    index++;
};
    // getCilinder();
    // getSphere();
    // getCone();
    //finish
    renderScene();
}

function renderScene() {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for ( var i = 0; i < objects.length; i++){
        console.log(objects.length);
        console.log(currently_selectedINDEX);
        objects[i].render();
    }   
          requestAnimFrame( renderScene );
   }
