peter_pan_song="";
harry_potter_theme_song="";

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

scoreleftWrist=0;
song_peter_pan=""; 
scorerightWrist=0;
song_harry_potter_theme=""; 

function preload(){
    peter_pan_song=loadSound("Peter Pan.mp3");
    harry_potter_theme_song=loadSound("Harry Potter.mp3");

}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center;

    video=createCapture(VIDEO);
    video.hide();
    video.center();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
image(video ,0,0,600,530);

fill("#fc2d2d");
stroke("#2ae859");

song_peter_pan=peter_pan_song.isPlaying();
console.log(song_peter_pan);

song_harry_potter_theme=harry_potter_theme_song.isPlaying();
console.log(song_harry_potter_theme);

if(scoreleftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    harry_potter_theme_song.stop();
    if(song_peter_pan ==false){
        peter_pan_song.play();
    }
    else{
document.getElementById("song_id").innerHTML="Song Name : Peter Pan Song";
    }
}

if(scorerightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    peter_pan_song.stop();
    if(song_harry_potter_theme ==false){
       harry_potter_theme_song.play();
    }
    else{
document.getElementById("song_id").innerHTML="Song Name : Harry Potter Theme Song";
    }
}

}



function play(){
    peter_pan_song.play();
}
function modelLoaded(){
    console.log("poseNet model loaded");

}

function gotPoses(results){
    if(results.length>0)
    {
        console.log(results);

        
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("leftWrist_score = " +scoreleftWrist);

        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("rightWrist_score = " +scorerightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
    }