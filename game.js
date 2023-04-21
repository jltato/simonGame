var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var gamePlay = [];
var randomChosenColour;
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    newColor();
    started = true;
  }
});

for (var i = 0; i < 4; i++) {
  var color = buttonColors[i];
  var acierta = true;
  $("#" + color).on("click", function(event) {
    var col = event.currentTarget.id;
    playColor(col);
    gamePlay.push(col);
    checkAnswer(gamePlay.length-1);
  });

  function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === gamePlay[currentLevel]) {

      if (gamePattern.length === gamePlay.length) {
        setTimeout(newColor, 1000);
        gamePlay = [];
      }
    } else {
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }


  }
}



function newColor() {
  randomChosenColour = buttonColors[nextSequence()];
  gamePattern.push(randomChosenColour);
  playColor(randomChosenColour);
  level = gamePattern.length;
  $("h1").text("LEVEL " + level);
}

function playColor(color) {
  $("#" + color).fadeToggle("fast").fadeToggle("fast");
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function nextSequence() {
  return randomNumber = Math.floor(Math.random() * 4);

}

function startOver() {
  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePlay = [];
  gamePattern = [];
  started = false;
}
