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
let answerLog = [];

function displayQuestion() {
  const embedContainer = document.getElementById("embed-container");
  const answerContainer = document.createElement("div");

  let embedContent = "";

  // Generate embed content
  for (let i = 0; i < questions.length; i++) {
    embedContent += `**Question ${i + 1}:** ${questions[i].question}\n`;

    if (questions[i].answerType === "text") {
      embedContent += `**Your Answer:** ${answerLog[i] ? answerLog[i] : "Not answered"}\n`;
    } else {
      embedContent += `**Your Answer:** ${answerLog[i] && answerLog[i] === questions[i].answer ? "Correct" : "Incorrect"}\n`;
      embedContent += `**Correct Answer:** ${questions[i].choices[questions[i].answer]}\n`;
    }

    embedContent += "\n";
  }

  // Add footer with score
  embedContent += `**Score:** ${score}/${questions.length}`;

  embedContainer.innerHTML = `<pre>${embedContent}</pre>`;

  // Display answer input element only for the current question
  if (questions[currentQuestion].answerType === "text") {
    answerContainer.innerHTML = `<input type="text" id="answer-input" placeholder="Enter your answer here">`;
    embedContainer.appendChild(answerContainer);
  }
}

function submitAnswer(selectedChoice) {
  // Process answer based on type
  if (typeof selectedChoice === "undefined") {
    answerLog[currentQuestion] = document.getElementById("answer-input").value.toLowerCase().trim();
    score += answerLog[currentQuestion] === questions[currentQuestion].answer ? 1 : 0;
  } else {
    answerLog[currentQuestion] = selectedChoice;
    score += answerLog[currentQuestion] === questions[currentQuestion].answer ? 1 : 0;
  }

  currentQuestion++;

  if (currentQuestion === questions.length) {
    displayQuestion();
    document.getElementById("submit-btn").disabled = true;

    // Send score and answers to Discord webhook
    const webhookUrl = "https://discord.com/api/webhooks/1183276554495729756/01ct9ck1Ddi7KC5dRTqmtfmXeRvgp5mljk6c8-w_Rl7M72XR3UkaTOnpygKKl0h90oyN";

    const data = {
      content: `Quiz completed! Score: ${score}/${questions.length}`,
      embeds: [
        {
          description: answerLog.join("\n"),
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
  } else {
    displayQuestion();
  }
}

displayQuestion();
