const questions = [
  // ===== Git Questions =====
  { q: "Which command initializes a Git repository?", c: ["git start", "git init", "git new", "git create"], a: "git init" },
  { q: "Which command checks repository status?", c: ["git check", "git status", "git info", "git state"], a: "git status" },
  { q: "Which command stages files?", c: ["git stage", "git add", "git commit", "git save"], a: "git add" },
  { q: "Which command saves changes to history?", c: ["git push", "git save", "git commit", "git update"], a: "git commit" },
  { q: "Which command uploads commits?", c: ["git upload", "git push", "git send", "git share"], a: "git push" },
  { q: "Which command downloads changes?", c: ["git fetch", "git pull", "git get", "git sync"], a: "git pull" },
  { q: "Which command creates a new branch?", c: ["git checkout", "git new", "git branch", "git fork"], a: "git branch" },
  { q: "Which command switches branches?", c: ["git move", "git switch", "git checkout", "git go"], a: "git checkout" },
  { q: "Which file ignores files?", c: [".gitkeep", ".ignore", ".gitignore", ".gitconfig"], a: ".gitignore" },
  { q: "Which command shows commit history?", c: ["git history", "git log", "git commits", "git show"], a: "git log" },
  { q: "Which command compares changes?", c: ["git diff", "git compare", "git status", "git delta"], a: "git diff" },
  { q: "Which command adds a remote?", c: ["git remote add", "git add remote", "git push remote", "git connect"], a: "git remote add" },
  { q: "Which branch is default?", c: ["main/master", "root", "dev", "head"], a: "main/master" },
  { q: "Which command merges branches?", c: ["git join", "git merge", "git combine", "git rebase"], a: "git merge" },
  { q: "Which command clones a repo?", c: ["git copy", "git pull", "git clone", "git fork"], a: "git clone" },

  // ===== Linux Questions =====
  { q: "Which command lists files?", c: ["ls", "list", "dir", "show"], a: "ls" },
  { q: "Which command shows current directory?", c: ["cwd", "pwd", "where", "path"], a: "pwd" },
  { q: "Which command changes directory?", c: ["cd", "mv", "go", "open"], a: "cd" },
  { q: "Which command copies files?", c: ["mv", "copy", "cp", "clone"], a: "cp" },
  { q: "Which command moves files?", c: ["mv", "cp", "move", "shift"], a: "mv" },
  { q: "Which command deletes files?", c: ["rm", "del", "erase", "delete"], a: "rm" },
  { q: "Which command views file content?", c: ["view", "cat", "show", "open"], a: "cat" },
  { q: "Which command searches text?", c: ["find", "search", "grep", "look"], a: "grep" },
  { q: "Which command changes permissions?", c: ["chmod", "chown", "perm", "access"], a: "chmod" },
  { q: "Which command changes owner?", c: ["chmod", "chown", "owner", "user"], a: "chown" },
  { q: "Which symbol starts bash scripts?", c: ["#!", "$$", "//", "##"], a: "#!" },
  { q: "Which command shows last lines?", c: ["tail", "end", "last", "bottom"], a: "tail" },
  { q: "Which file stores env vars?", c: [".bashrc", ".env", "env.sh", "vars"], a: ".bashrc" },
  { q: "Which permission allows execution?", c: ["r", "w", "x", "e"], a: "x" },
  { q: "Which command runs a script?", c: ["run.sh", "./script.sh", "bash start", "exec"], a: "./script.sh" }
];

let index = 0;
let score = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const scoreEl = document.getElementById("score");
const currentEl = document.getElementById("current");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  const q = questions[index];
  questionEl.textContent = q.q;
  choicesEl.innerHTML = "";
  currentEl.textContent = index + 1;
  nextBtn.classList.add("d-none");

  q.c.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary w-100 choice-btn";
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(btn, choice);
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(btn, choice) {
  const correct = questions[index].a;

  document.querySelectorAll(".choice-btn").forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) {
      b.classList.replace("btn-outline-primary", "btn-success");
    }
  });

  if (choice === correct) {
    score++;
    scoreEl.textContent = score;
  } else {
    btn.classList.replace("btn-outline-primary", "btn-danger");
  }

  nextBtn.classList.remove("d-none");
}

nextBtn.onclick = () => {
  index++;
  if (index < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    choicesEl.innerHTML = `<h5 class="text-center">Final Score: ${score}/30</h5>`;
    nextBtn.classList.add("d-none");
  }
};

loadQuestion();
