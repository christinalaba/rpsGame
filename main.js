
const app = {
        playerName: "Mystery person",
        fate: "play with fate",
        userChoice:"",
        randomChoice:"",
        fateScore: 0,
        userScore: 0,
        userRound:"draw",
        fateRound:"draw"
    }

app.init = function(){
    console.log("init")
    console.log(app.playerName) 
    getPlayerName();
}

function getPlayerName(){
    console.log("getPlayerName")

    TweenMax.set([".gameAnimation", ".gameControls", messageBoard], { autoAlpha: 0});
    TweenMax.set(".introModal", { autoAlpha: 1 });
    
    $("#playerInputForm").on("submit", function(e){
        e.preventDefault();
        app.playerName = $('#nameInput').val();
        app.fate = $('#fateInput').val();
        console.log (app.playerName, app.fate );
        setGameScreen();
    });
}

function setGameScreen(){
    TweenMax.set("#rightHand", { x: 300, rotation: 30, });
    TweenMax.set("#leftHand", { x: -300, rotation: -30 });
    TweenMax.set(".gameControls", { autoAlpha: 0, clip: "0px 0px 300px 0px" });

    TweenMax.to([".introModal", ".pageTitle"],0.5, { autoAlpha: 0, display:"none" });
    
    TweenMax.to(".scoreBoard", 0.5, { autoAlpha: 1, delay: 0.5, display: 'block' });
    TweenMax.to(".gameAnimation", 1, { delay:0.5, autoAlpha: 1 });
    TweenMax.to(['#rightHand', '#leftHand'], 1, { autoAlpha: 1, delay: 0.5, x: 0, rotation: 0, ease: Back.easeOut.config(2.5), });
    TweenMax.to(".gameControls", 0.5, { autoAlpha: 0.95, delay: 1.5, clip: "0px 600px 300px 0px"});
}

$('.gameControls button').on('click', function () {
    $('.gameControls button').removeClass("selected");
    $(this).addClass('selected');
    app.userChoice = $(this).text();
    // console.log(app.userChoice);
    
    TweenMax.to(".gameControls", 0.5, { clip:'0px 0px 300px 0px' });
    TweenMax.to(".gameControls", 0.3, { delay:0.5, autoAlpha: 0 });

    getRandomChoice();
});

function getRandomChoice() {
    const choice = ["Rock", "Paper", "Scissors"]
    app.randomChoice = choice[Math.floor(Math.random() * 3)];
    // console.log(app.randomChoice);
    gameStartAnimation();
    compare();
}

function compare(){
    console.log ('Compare')
    if (app.userChoice === 'Rock' && app.randomChoice === 'Scissors' ||
        app.userChoice === 'Paper' && app.randomChoice === 'Rock' ||
        app.userChoice === 'Scissors' && app.randomChoice === 'Paper') {
        console.log("user win");
        app.userScore++;
        app.userRound = "Win";
        app.fateRound = "Lose";
       
    } else if (app.userChoice === 'Paper' && app.randomChoice === 'Scissors' ||
        app.userChoice === 'Scissors' && app.randomChoice === 'Rock' ||
        app.userChoice === 'Rock' && app.randomChoice === 'Paper') {
        console.log("fate win");
        app.fateScore++;
        app.userRound = "Lose";
        app.fateRound = "Win";
    } else if (app.userChoice === app.randomChoice) {
        console.log("draw");
        app.userRound = "Win";
        app.fateRound = "Win";
    }
    // console.log(app.userScore);
    // console.log(app.fateScore);
}

function gameStartAnimation(){
    TweenMax.to('#rightHand', 0.3, { x: 0 })
    TweenMax.to('#leftHand', 0.3, { x: 0 })

    $('#rightHand').css('background', `no-repeat url(images/right/RightRockWin.png)`)
    $('#rightHand').css('background-size', `contain`)
    TweenMax.to('#rightHand', 0.3, { delay:0.3, x: 0, rotation: 30, yoyo: true, repeat: 5, transformOrigin: "bottom right"})
    
    $('#leftHand').css('background', `no-repeat url(images/left/LeftRockWin.png)`)
    $('#leftHand').css('background-size', `contain`)
    TweenMax.to('#leftHand', 0.3, { delay: 0.3, x: 0, rotation: -30, yoyo: true, repeat: 5, transformOrigin: "bottom left", onComplete: resultOfRound  })
}

function resultOfRound (){
    console.log("result of round animation");
    $('#leftHand').css('background', `no-repeat url(images/left/Left${app.userChoice}Win.png)`)
    $('#leftHand').css('background-size', `contain`)
    
    $('#rightHand').css('background', `no-repeat url(images/right/Right${app.randomChoice}Win.png)`)
    $('#rightHand').css('background-size', `contain`)
    TweenMax.delayedCall(1, roundWinnerAnimation);
}

function checkForWin() {
    let userMessage;
    if (app.userScore === 3) {
        userMessage = `<p>You win! You should ${app.fate}</p>`
        console.log("game over - user win");
        endGame();
    } else if (app.fateScore === 3) {
        userMessage = `<p>You lose! Do not ${app.fate}</p>`
        console.log("game over - fate win");
        endGame();
    }
    
    $('.playerScore').text(app.userScore);
    $('.fateScore').text(app.fateScore);

    $('.gameOverModal').append(userMessage);
   
    TweenMax.to(".gameControls", 0.5, { autoAlpha: 0.95, clip: "0px 600px 300px 0px" });
}

function roundWinnerAnimation(){
    console.log("round winner animation")
    if (app.userRound === "Lose"){
        // console.log(app.userRound)
        // console.log(app.fateRound)
        $('#leftHand').css('background', `no-repeat url(images/left/Left${app.userChoice}${app.userRound}.png)`)
        $('#leftHand').css('background-size', `contain`)

        TweenMax.to('#leftHand', 1, { delay:0.3, x: -50 })
        TweenMax.to('#rightHand', 1, { x: -140 })
    } else if (app.fateRound === "Lose"){
        // console.log(app.userRound)
        // console.log(app.fateRound)
        $('#rightHand').css('background', `no-repeat url(images/right/Right${app.randomChoice}${app.fateRound}.png)`)
        $('#rightHand').css('background-size', `contain`)
        TweenMax.to('#rightHand', 1, { delay: 0.3,x: 50 })
        TweenMax.to('#leftHand', 1, { x: 140 })
    }
 
    TweenMax.delayedCall(1, checkForWin);
}

function endGame() {
    console.log("GAME OVER")
    $('.gameControls').toggleClass('hide');
    $('.gameAnimation').addClass('hide');
    $('.gameOverModal').toggleClass('hide');
 
}

$(function () {
    app.init();
})
