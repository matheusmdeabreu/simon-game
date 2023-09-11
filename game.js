var gamePattern = [];

var buttonCollors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;
var level = 0;
var currentLevel = 0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer((userClickedPattern.length)-1);

});


function nextSequence(){

    userClickedPattern = [];
    level++;
    currentLevel++;

    $("#level-title").html("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonCollors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function gameOver(){
    setTimeout(function () {
        var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Your Score: " + (currentLevel-1) + "<br><span class='small-text'>Press any key to restart</span>");

    }, 400);
       
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

        console.log("success");
   
        if (userClickedPattern.length == gamePattern.length){
  
      setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
        gameOver();
        startOver();
      }
}







