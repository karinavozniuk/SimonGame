var gamePattern = [];
var userClickedPattern = [];
var buttonsColors = ["blue", "red", "green", "yellow"];
var starter = false;
var level = 0;


$(document).keypress(function() {
    if (!starter) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        starter = true;
    }

});

$('.btn').click(function () {

    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    fadedSquares(userChosenColor);
    animatedPress(userChosenColor);
    playSound(userChosenColor);
    checkAnswers(userClickedPattern.length - 1);

});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    return audio.play();
}

function wrongSound() {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
}

function animatedPress(currentColor) {

    $('#' + currentColor).addClass("pressed");

    setTimeout(function () {
        $('#' + currentColor).removeClass("pressed");
    }, 100);

}


function fadedSquares(currentSquare) {

    $('#' + currentSquare).fadeIn(100).fadeOut(100).fadeIn(100);

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonsColors[randomNumber];
    gamePattern.push(randomChosenColor);

    fadedSquares(randomChosenColor);
    animatedPress(randomChosenColor);
    playSound(randomChosenColor);

}

function checkAnswers(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else {
        wrongSound();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $('#level-title').text('Game Over. Press any key to restart');

        startOver();

        console.log("wrong");

    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    starter = false;
}



checkAnswers(1);

