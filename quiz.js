const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Rome", "Berlin"],
    answer: 1,
  },
  // Add more questions here...
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.querySelector(".choices");

  questionElement.textContent = questions[currentQuestion].question;

  choicesElement.innerHTML = "";
  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    const choiceElement = document.createElement("li");
    choiceElement.textContent = questions[currentQuestion].choices[i];
    choiceElement.addEventListener("click", function () {
      submitAnswer(i);
    });
    choicesElement.appendChild(choiceElement);
  }
}

function submitAnswer(selectedChoice) {
  const correctAnswer = questions[currentQuestion].answer;

  if (selectedChoice === correctAnswer) {
    alert("Correct!");
    score++;
  } else {
    alert("Incorrect. The correct answer is " + questions[currentQuestion].choices[correctAnswer]);
  }

  currentQuestion++;

  if (currentQuestion === questions.length) {
    alert("Quiz completed! Your score is " + score + "/" + questions.length);

    // Send score and answers to Discord webhook
    const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL"; // Replace with your actual webhook URL

    const data = {
      content: `Quiz completed! Score: ${score}/${questions.length}`,
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

    // Reset quiz
    currentQuestion = 0;
    score = 0;
  } else {
    displayQuestion();
  }
}

displayQuestion();
