const questions = [
  {
    question: "What is the capital of France?",
    type: "multiple-choice",
    choices: ["London", "Paris", "Rome", "Berlin"],
    answer: 1,
  },
];

let currentQuestion = 1;
let score = 0;

function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const answerContainer = document.getElementById("answer-container");

  const question = questions[currentQuestion];

  // Clear answer container
  answerContainer.innerHTML = "";

  // Display question content
  questionContainer.textContent = question.question;

  if (question.type === "multiple-choice") {
    // Create and display radio buttons for choices
    for (let i = 0; i < question.choices.length; i++) {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `question-<span class="math-inline">\{currentQuestion\}\`;
radioInput\.value \= i;
answerContainer\.appendChild\(radioInput\);
const label \= document\.createElement\("label"\);
label\.textContent \= question\.choices\[i\];
label\.htmlFor \= radioInput\.id;
answerContainer\.appendChild\(label\);
\}
\} else if \(question\.type \=\=\= "text"\) \{
// Create and display text input for answer
const textInput \= document\.createElement\("textarea"\);
textInput\.placeholder \= "Enter your answer here";
answerContainer\.appendChild\(textInput\);
\}
\}
function submitAnswers\(\) \{
let userAnswer;
const question \= questions\[currentQuestion\];
if \(question\.type \=\=\= "multiple\-choice"\) \{
const radioButtons \= document\.querySelectorAll\(\`input\[name\="question\-</span>{currentQuestion}"]`);
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        userAnswer = parseInt(radioButton.value);
        break;
      }
    }
  } else if (question.type === "text") {
    userAnswer = document.getElementById("answer-container").children[0].value.toLowerCase().trim();
  }

  if (!userAnswer) {
    alert("Please provide an answer for both questions before submitting.");
    return;
  }

  // Check answer and update score
  score += (userAnswer === question.answer) ? 1 : 0;

  currentQuestion++;

  if (currentQuestion === questions.length) {
    // Quiz finished, display final score and send results to Discord webhook
    const webhookUrl = "https://discord.com/api/webhooks/1183279682838347887/f1kxyNvuviun6Gob1WCbTQEjz08BHbbsXH3nYkFWDwg42jLVOjb5fJwoWrjmREY5j9me";

    const embedContent = "";

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = (question.type === "multiple-choice") ? questions[i].choices[answers[i]] : answers[i];

      embedContent += `**Question ${(i + 1).toString().padStart(2, "0")}:** ${question.question}\n`;
      if (userAnswer === question.answer) {
        embedContent += `**Your Answer:** Correct\n`;
      } else {
        embedContent += `**Your Answer:** Incorrect. The correct answer is: ${question.answer}\n`;
      }

      embedContent += "\n";
    }

    const data = {
      content: `Quiz completed! Score: ${score}/${questions.length}`,
      embeds: [
        {
          description: embedContent,
          footer: {
            text: `Score: ${score}/${questions.length}`,
          },
        },
      ],
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

    // Disable submit button and display final score
    document.getElementById("submit-btn").disabled = true;
    alert(`Quiz completed! Your score is ${score}/${questions.length}`);
  } else {
    // Display next question
    displayQuestion();
  }
}

displayQuestion();
