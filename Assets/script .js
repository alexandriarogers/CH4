var btnStartEl = document.querySelector("#startQuiz");
var btnGoBackEl = document.querySelector("#back")

var containerQuestionEl = document.getElementById("questions");
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")
var startEl = document.getElementById("start");
var endEl = document.getElementById("end")
var scoreEl = document.getElementById("scores")
var formInitials = document.getElementById("enterName")
var containerHighScoresEl = document.getElementById("highScoreSection")
var ViewHighScoreEl = document.getElementById("highScores")
var listHighScoreEl = document.getElementById("scoresList")
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answers")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;
var HighScores = []; 
var arrayShuffledQuestions
var QuestionIndex = 0

    
      
      // Questions
      var questions = [
        { q: "Which tag is used for JavaScript in HTML?", 
          a: "D. <script>", 
          choices: [{choice: "A. <p>"}, {choice: "B. <div>"}, {choice: "C. <body>"}, {choice: "D. <script>"}]
        },
        { q: "How do yor write a function on JavaScript?", 
          a: "C. function(myfunction)", 
          choices: [{choice: "A. function:myfunction"}, {choice: "B. function = myfunction"}, {choice: "C. function(myfunction)"}, {choice: "D. function/ myfunction"}]
        },
        { q: "Which of these is a JavaScript libary?", 
          a: "A. JQuery", 
          choices: [{choice: "A. JQuery"}, {choice: "B. HTML"}, {choice: "C. BootStrap"}, {choice: "D. CSS"}]
        },
        { q: "In which tag should the <script> tag be placed in HTML", 
          a: "D. <body", 
          choices: [{choice: "A. <header>"}, {choice: "B. <p>"}, {choice: "C. <div>"}, {choice: "D. <body"}]
        },
        { q: "How would you write 'Hello World' in an alert window?", 
          a: "A. alert('Hello World')", 
          choices: [{choice: "A. alert('Hello World')"}, {choice: "B. window('Hello World)"}, {choice: "alertbox('Hello World')"}, {choice: "function (alert'Hello World')"}]
        },
        
      ];
      
        //Go back button starts quiz over
    var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        startEl.classList.remove("hide")
        startEl.classList.add("show")
        scoreEl.removeChild(scoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    //timer 
    var setTime = function () {
        timeleft = 45;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        //add classes to show/hide start and quiz screen
        startEl.classList.add('hide');
        startEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        //Shuffle the questions so they show in random order
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    
    //show next question
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

    //resets answers
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    //shows current question
    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };
    //lets you know if your answer was correct
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  
    //lets you know if your answer was wrong
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    //function to make sure answer is correct   
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 1
            }

            else {
              answerWrong()
              score = score - 1;
              timeleft = timeleft - 5;
          };

        //go to next question or end quiz if there are no more questions
          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        endEl.classList.remove("hide");
        endEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Final score " + score);
        scoreEl.appendChild(scoreDisplay);
    }       
    
    
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

     
    //highscores list
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }
    //save high score
    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    // high scores list
    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    //show name when it is entered
    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (endEl.className = "show") {
            endEl.classList.remove("show");
            endEl.classList.add("hide");
            }
        if (startEl.className = "show") {
            startEl.classList.remove("show");
            startEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }
    
   

    loadHighScore()
        
      //on start click, start game
      btnStartEl.addEventListener("click", startGame)
      //on submit button -- enter or click
      formInitials.addEventListener("submit", createHighScore)
      //when view high-scores is clicked
      ViewHighScoreEl.addEventListener("click", displayHighScores)
      //Go back button
      btnGoBackEl.addEventListener("click", renderStartPage)
      //clear scores button
      btnClearScoresEl.addEventListener("click", clearScores)