const questions = [
  {
    question: "What is your Discord Username?",
    answerType: "text", // new property for open ended question
    answer: "doesnt matter", // case insensitive comparison
  },
  {
    question: "Will you Mod Abuse?",
    choices: ["Yes", "No"],
    answer: 2,
  },
  {
    question: "If someone is VDMing what will you do?",
    answerType: "text", // new property for open ended question
    answer: "you decide", // case insensitive comparison
  },
  // Add more questions here...
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const answerContainer = document.getElementById("answer-container");

  questionElement.textContent = questions[currentQuestion].question;

  // Clear answer input and hide/show elements based on answer type
  if (questions[currentQuestion].answerType === "text") {
    answerContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Enter your answer here">`;
    document.getElementById("submit-btn").textContent = "Submit Answer";
  } else {
    answerContainer.innerHTML = `<ul class="choices"></ul>`;
    document.getElementById("submit-btn").textContent = "Choose Answer";

    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
      const choiceElement = document.createElement("li");
      choiceElement.textContent = questions[currentQuestion].choices[i];
      choiceElement.addEventListener("click", function () {
        submitAnswer(i);
      });
      answerContainer.querySelector(".choices").appendChild(choiceElement);
    }
  }
}

function submitAnswer(selectedChoice) {
  // Check if answer type is text
  if (typeof selectedChoice === "undefined") {
    const userAnswer = document.getElementById("answer-input").value.toLowerCase().trim();

    if (userAnswer === questions[currentQuestion].answer) {
      alert("Correct!");
      score++;
    } else {
      alert("Incorrect. The correct answer is " + questions[currentQuestion].answer);
    }
  } else {
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedChoice === correctAnswer) {
      alert("Correct!");
      score++;
    } else {
      alert("Incorrect. The correct answer is " + questions[currentQuestion].choices[correctAnswer]);
    }
  }

  currentQuestion++;

  if (currentQuestion === questions.length) {
    alert("Quiz completed! Your score is " + score + "/" + questions.length);

    // Send score and answers to Discord webhook
    const webhookUrl = "https://discord.com/api/webhooks/1183276554495729756/01ct9ck1Ddi7KC5dRTqmtfmXeRvgp5mljk6c8-w_Rl7M72XR3UkaTOnpygKKl0h90oyN";

    const data = {
      content: `Quiz completed! Score: <span class="math-inline">\{score\}/</span>{questions.length}`,
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => console.log("Discord webhook sent successfully"))
      .catch(error => console.error("Error sending Discord webhook", error));

    //
