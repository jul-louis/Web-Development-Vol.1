let mcsTFs = [];
let mcsTFsA = [];
let mas = [];
let masA = [];
let answerCollection = [];

function formatQuiz(xml) {
    let xmlDoc = xml.responseXML;
    // Main Theme of quiz and overview
    document.getElementById("heading").innerHTML = xmlDoc.getElementsByTagName("subject").item(0).innerHTML
    document.getElementById("overview").innerHTML = xmlDoc.getElementsByTagName("overview").item(0).innerHTML;
    // form creation:
    let quiz = document.getElementById('quiz');
    let hr = document.createElement("hr");
    let gap = "&#8195;&#8195;&#8195;";
    let gradeDiv = document.createElement("div");
    gradeDiv.className = "answer";
    gradeDiv.id = "g-area";
    quiz.appendChild(gradeDiv);

    let questions = xmlDoc.getElementsByTagName("question");
    // questionCount = questions.length;
    for (let i=0; i<questions.length; i++) {
        // Question Description:
        let questionTitle = document.createElement("h2");
        questionTitle.innerHTML = (i+1) + " ." + questions[i].getElementsByTagName("description").item(0).innerHTML;
        quiz.appendChild(questionTitle)
        quiz.appendChild(document.createElement("br"));
        answerCollection.push(questions[i].getElementsByTagName("explanation").item(0).innerHTML);
        let questionType = questions[i].getElementsByTagName("type").item(0).innerHTML;
        if (questionType === "TF" || questionType === "MC") {
            // Question Type: MC TF
            let qName = "QID"+i;
            mcsTFs.push(qName);
            mcsTFsA.push(qName + "CID" + questions[i].getElementsByTagName("answer").item(0).innerHTML);
            let choices = questions[i].getElementsByTagName("choice");
            for (let j=0; j<choices.length; j++) {
                let input = document.createElement("input");
                let group = document.createElement("div");
                group.className = "choices"
                input.type = "radio";
                input.name = qName;
                input.id = input.name + "CID" + j;
                let label = document.createElement("label");
                label.appendChild(input);
                label.innerHTML += gap + choices[j].innerHTML;
                group.appendChild(label);
                quiz.appendChild(group);
            }
        } else if (questionType === "MA") {
            let qNamePrefix = "QID"+i+"CID";
            let corrects = questions[i].getElementsByTagName("answer");
            let key="";
            for (let ind=0; ind<corrects.length; ind++) {
                key += qNamePrefix+corrects[ind].innerHTML;
            }
            masA.push(key)
            let boxes = [];
            let choices = questions[i].getElementsByTagName("choice");
            for (let j=0; j<choices.length; j++) {
                let input = document.createElement("input");
                let group = document.createElement("div");
                group.className = "choices"
                input.type = "checkbox";
                input.name = qNamePrefix + j;
                input.id = input.name;
                boxes.push(input.name);
                let label = document.createElement("label");
                label.appendChild(input);
                label.innerHTML += gap + choices[j].innerHTML;
                group.appendChild(label);
                quiz.appendChild(group);
            }
            mas.push(boxes);
        }

        quiz.appendChild(document.createElement("br"));
        let answerArea = document.createElement("div");
        // Answers to be printed here:
        answerArea.id = "QID" + i + "A";
        answerArea.className = "answer"
        quiz.appendChild(answerArea)
    }
    // Submission Button
    let buttonDiv = document.createElement("div");
    let submitButton = document.createElement("button");
    buttonDiv.className = "df aic jcse";
    submitButton.className = "btn";
    submitButton.type = "submit";
    submitButton.id = "submit-button";
    submitButton.innerHTML = "Submit";
    buttonDiv.appendChild(submitButton);
    quiz.appendChild(hr);
    quiz.appendChild(buttonDiv);
}

function printGrade(total_question, correct) {
    let gradeArea = document.getElementById("g-area");
    gradeArea.style.padding = "20px";
    gradeArea.innerHTML = "<h4>" +"Grade: " + correct/total_question*100 + "%, " + correct + " / " + total_question + "</h4>";
}


function grade() {
    let correctCount = 0;
    for (let i=0; i<mcsTFs.length; i++) {
        let qid = mcsTFs[i];
        if (document.querySelector('input[name='+qid+']:checked') !== null) {
            let answer = document.querySelector('input[name='+qid+']:checked').id;
            if (answer === mcsTFsA[i]) {
                correctCount++;
            }
        }
    }
    for (let i=0; i<mas.length; i++) {
        let qids = mas[i];
        let userAnswer = "";
        for (let i=0; i<qids.length; i++) {
            if (document.querySelector('input[name='+qids[i]+']:checked') !== null) {
                userAnswer += document.querySelector('input[name='+qids[i]+']:checked').id.toString();
            }
        }
        if (userAnswer === masA[i]) {
            correctCount++;
        }
    }
    printGrade(answerCollection.length, correctCount);
    alert("Quiz Submitted.\nYour Grade:\n" + correctCount/(mcsTFs.length+mas.length)*100 +"%, "+ correctCount +" out of " + (mcsTFs.length+mas.length))
}

function printAnswer() {
    for (let i=0; i<answerCollection.length; i++) {
        let area = document.getElementById("QID"+i+"A");
        area.style.padding = "15px"
        area.innerHTML = answerCollection[i];
    }
}

$('#quiz').submit(function () {
    grade();
    printAnswer();
    return false;
});