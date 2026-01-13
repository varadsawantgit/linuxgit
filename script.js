const MARKS_PER_QUESTION = 2;
const PASS_MARKS = 50;
let timeLeft = 3600;

let studentName = "";
let index = 0;
let score = 0;
let userAnswers = [];

const quizModal = new bootstrap.Modal(document.getElementById("quizModal"));
const resultModal = new bootstrap.Modal(document.getElementById("resultModal"));

const questions = [
  // GIT (20)
  {q:"What does Git use to track changes?",c:["Snapshots","Diff files","Logs","Commits"],a:"Snapshots"},
  {q:"Which command initializes a repository?",c:["git init","git start","git new","git create"],a:"git init"},
  {q:"Which command stages files?",c:["git add","git stage","git save","git commit"],a:"git add"},
  {q:"Which command saves changes?",c:["git commit","git push","git sync","git update"],a:"git commit"},
  {q:"Which command uploads commits?",c:["git push","git send","git upload","git sync"],a:"git push"},
  {q:"Which command downloads and merges?",c:["git pull","git fetch","git get","git merge"],a:"git pull"},
  {q:"Which command shows history?",c:["git log","git status","git diff","git show"],a:"git log"},
  {q:"Which command compares changes?",c:["git diff","git compare","git delta","git status"],a:"git diff"},
  {q:"Which command creates branch?",c:["git branch","git fork","git checkout","git new"],a:"git branch"},
  {q:"Which command switches branch?",c:["git checkout","git change","git move","git branch"],a:"git checkout"},
  {q:"Which command merges branches?",c:["git merge","git join","git combine","git rebase"],a:"git merge"},
  {q:"Which file ignores files?",c:[".gitignore",".gitkeep",".ignore",".gitconfig"],a:".gitignore"},
  {q:"Which command shows remotes?",c:["git remote","git origin","git link","git connect"],a:"git remote"},
  {q:"Which command clones repo?",c:["git clone","git copy","git pull","git fork"],a:"git clone"},
  {q:"Which is default branch now?",c:["main","master","root","dev"],a:"main"},
  {q:"Which command stashes changes?",c:["git stash","git save","git hide","git park"],a:"git stash"},
  {q:"Which command deletes branch?",c:["git branch -d","git delete","git remove","git drop"],a:"git branch -d"},
  {q:"Which command renames branch?",c:["git branch -m","git rename","git move","git edit"],a:"git branch -m"},
  {q:"Which command shows config?",c:["git config","git env","git info","git settings"],a:"git config"},
  {q:"Which command fetches only?",c:["git fetch","git pull","git sync","git get"],a:"git fetch"},

  // LINUX (15)
  {q:"Which command lists files?",c:["ls","dir","show","list"],a:"ls"},
  {q:"Which command shows current path?",c:["pwd","path","cwd","where"],a:"pwd"},
  {q:"Which command changes directory?",c:["cd","mv","go","open"],a:"cd"},
  {q:"Which command copies files?",c:["cp","mv","copy","clone"],a:"cp"},
  {q:"Which command moves files?",c:["mv","cp","move","shift"],a:"mv"},
  {q:"Which command deletes files?",c:["rm","del","erase","delete"],a:"rm"},
  {q:"Which command views file?",c:["cat","view","open","show"],a:"cat"},
  {q:"Which command searches text?",c:["grep","find","search","look"],a:"grep"},
  {q:"Which command changes permissions?",c:["chmod","chown","perm","access"],a:"chmod"},
  {q:"Which command changes owner?",c:["chown","chmod","owner","user"],a:"chown"},
  {q:"Which command shows last lines?",c:["tail","end","last","bottom"],a:"tail"},
  {q:"Which command shows first lines?",c:["head","top","first","start"],a:"head"},
  {q:"Which file stores shell config?",c:[".bashrc",".env",".profile",".conf"],a:".bashrc"},
  {q:"Which symbol means root?",c:["#","$","/","~"],a:"#"},
  {q:"Which permission is execute?",c:["x","r","w","e"],a:"x"},

  // SHELL (15)
  {q:"Which line starts bash script?",c:["#!/bin/bash","#!/sh","#!/usr/bash","#!/bin"],a:"#!/bin/bash"},
  {q:"Which symbol accesses variable?",c:["$","@","%","#"],a:"$"},
  {q:"Which loop repeats list?",c:["for","if","case","select"],a:"for"},
  {q:"Which command reads input?",c:["read","input","scan","get"],a:"read"},
  {q:"Which keyword starts condition?",c:["if","for","while","case"],a:"if"},
  {q:"Which loop runs while true?",c:["while","for","until","repeat"],a:"while"},
  {q:"Which operator compares numbers?",c:["-eq","==","=","==="],a:"-eq"},
  {q:"Which operator AND?",c:["&&","||","&","and"],a:"&&"},
  {q:"Which operator OR?",c:["||","&&","|","or"],a:"||"},
  {q:"Which command exits script?",c:["exit","quit","stop","break"],a:"exit"},
  {q:"Which command prints output?",c:["echo","print","show","out"],a:"echo"},
  {q:"Which scheduler runs jobs?",c:["cron","at","job","task"],a:"cron"},
  {q:"Which file runs at boot?",c:["/etc/rc.local",".bashrc","/etc/init","boot.sh"],a:"/etc/rc.local"},
  {q:"Which symbol comments line?",c:["#","//","/*",";"],a:"#"},
  {q:"Which command makes executable?",c:["chmod +x","chmod 777","exec","run"],a:"chmod +x"}
];

// ===== START =====
function startQuiz() {
  studentName = document.getElementById("studentName").value.trim();
  if (!studentName) return alert("Enter name");

  bootstrap.Modal.getInstance(document.getElementById("nameModal")).hide();
  quizModal.show();
  loadQuestion();
}

// ===== TIMER =====
setInterval(() => {
  if (timeLeft <= 0) endQuiz();
  timeLeft--;
  document.getElementById("timer").textContent =
    `${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,"0")}`;
}, 1000);

// ===== QUIZ =====
function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").textContent = q.q;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("current").textContent = index + 1;
  document.getElementById("progressBar").style.width = `${(index/50)*100}%`;
  document.getElementById("nextBtn").classList.add("d-none");

  q.c.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-success w-100 choice-btn";
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(btn, choice);
    document.getElementById("choices").appendChild(btn);
  });
}

function selectAnswer(btn, choice) {
  const correct = questions[index].a;
  userAnswers[index] = choice;

  document.querySelectorAll(".choice-btn").forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.replace("btn-outline-success","btn-success");
  });

  if (choice === correct) {
    score += MARKS_PER_QUESTION;
    document.getElementById("score").textContent = score;
  } else {
    btn.classList.replace("btn-outline-success","btn-danger");
  }

  document.getElementById("nextBtn").classList.remove("d-none");
}

document.getElementById("nextBtn").onclick = () => {
  index++;
  index < 50 ? loadQuestion() : endQuiz();
};

// ===== END =====
function endQuiz() {
  quizModal.hide();
  resultModal.show();

  const pass = score >= PASS_MARKS;
  document.getElementById("resultContent").innerHTML = `
    <h3 class="${pass?'text-success':'text-danger'}">${pass?'PASS':'FAIL'}</h3>
    <h5>${studentName}</h5>
    <h4>${score}/100</h4>
  `;

  if (pass) document.getElementById("certBtn").classList.remove("d-none");

  const review = document.getElementById("reviewSection");
  review.innerHTML = "<h5 class='text-success fw-bold'>Answer Review</h5>";

  questions.forEach((q,i)=>{
    const user = userAnswers[i] || "Not Answered";
    review.innerHTML += `
      <div>
        <strong>Q${i+1}:</strong> ${q.q}<br>
        <span class="text-success">Correct:</span> ${q.a}<br>
        <span class="${user===q.a?'text-success':'text-danger'}">Your:</span> ${user}
      </div>`;
  });
}

// ===== CERT =====
document.getElementById("certBtn").onclick = () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("landscape");
  pdf.setFontSize(26);
  pdf.text("Certificate of Completion",148,35,{align:"center"});
  pdf.text(studentName,148,70,{align:"center"});
  pdf.text(`Score: ${score}/100`,148,100,{align:"center"});
  pdf.text("Mantara Labs",148,130,{align:"center"});
  pdf.save(`${studentName}_Certificate.pdf`);
};
