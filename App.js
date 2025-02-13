// Initial vars
let inputs = document.getElementsByClassName("inputs")[0];
let check = document.getElementsByTagName("button")[0];
let hint = document.getElementsByTagName("button")[1];
let numberOfTries = 5;
let forms;

// set word
const words = [
    "logic", "array", "debug", "stack", "queue", "server", "client", "script",
    "module", "binary", "syntax", "object", "async", "branch", "commit", "deploy",
    "method", "secure", "public", "export", "import", "prompt", "design", "layout",
    "author", "system", "backup", "launch", "career", "leader", "manage", "vision",
    "startup", "scaling", "revenue", "finance", "profits", "savings", "success",
    "failure", "network", "freedom", "remote", "teamwork", "effort", "hustle",
    "growth", "market", "brands", "coding", "laptop", "server", "update", "pixels",
    "docker", "values", "ethics", "future", "insight", "wisdom", "vision", "impact",
    "cloud", "mobile", "launch", "policy", "lawyer", "supply", "demand", "export",
    "import", "safety", "backup", "resume", "hiring", "design", "mental", "focus",
    "writer", "author", "speech", "reason", "intent", "coding", "define", "energy",
    "status", "mindset", "reboot", "effort", "action", "skills", "talent", "mentor",
    "values", "legacy", "future", "income", "budget", "growth", "vision", "credit"
];
const word = words[parseInt(Math.random() * words.length)].toUpperCase();
const wordLength = word.length;


// build the check charector
check.addEventListener("click",handleGuesses);
// hint machenism
hint.addEventListener("click", handleHint);
// render the main inputs
function render(){
    for (let i = 0; i < 5; i++) {
        let form = document.createElement("form");
        form.classList.add("Guess");
        (i!=0) ? form.classList.add("disabled"):null;   
        form.id = `form${i}`;

        let h5 = document.createElement("h5");
        h5.innerText = `Try ${i+1}`;
        form.appendChild(h5)

        for (let j = 0; j < wordLength; j++) {
            let inp = document.createElement("input")
            inp.maxLength = 1;
            inp.id = `Guess${i}-inp${j}`
            inp.type = "text";

            inp.addEventListener("keydown",(e) => {
                let nextinp = document.getElementById(`Guess${i}-inp${j+1}`);
                let previnp = document.getElementById(`Guess${i}-inp${j-1}`);
                if(e.key == "Enter"){
                    check.click();
                }
                else if( e.key == "Backspace" && previnp){
                    e.preventDefault()
                    if(inp.value.length == 1){
                        inp.value = "";
                    }
                    else{
                        previnp.focus();
                    }
                }
                else if((e.key == "ArrowRight" && nextinp) || (e.key == "Tab" && j === wordLength -1)){
                    e.preventDefault()
                    nextinp.focus();
                }
                else if(e.key == "ArrowLeft" && previnp){
                    previnp.focus();
                }

            })
            inp.addEventListener("input",(e) => {
                let nextinp = document.getElementById(`Guess${i}-inp${j+1}`);
                inp.value = inp.value.toUpperCase();
                if(nextinp && inp.value.length === 1) nextinp.focus();
            })



            form.appendChild(inp)
        }

        inputs.appendChild(form)
    }
    document.getElementById("Guess0-inp0").focus()
    forms = document.getElementsByTagName("form");
}
//Handle Guess
function handleGuesses(){
    let form = document.querySelector("form:not(.disabled)")
    let id = +form.id.at(-1);
    form.classList.add("disabled")

    if(id != numberOfTries-1){
        forms[id+1].classList.remove("disabled");
    }
    won(form.id)
}
// Handle hint
function handleHint(){
    let inps = Array.from(document.querySelectorAll("form:not(.disabled) input")).filter(input => input.value === "");
    let current_inp = inps[parseInt(inps.length * Math.random())];
    if(!current_inp){
        current_inp = document.querySelector("form:not(.disabled) input:last-child");
    }
    

    let rand = parseInt(word.length * Math.random());
    current_inp.value = word.at(rand);

    if(current_inp.id.at(-1) == rand){
        current_inp.classList.add("correct");
    }
    else{
        current_inp.classList.add("mostly")
    }

    document.querySelector("button span").innerHTML--;
    
    if(document.querySelector("button span").innerHTML == 0){
        this.classList.add("disabled");
    }
}
// Won?
function won(id){
    let inps = document.querySelectorAll(`#${id} input`);
    let counter = 0;
    let buttons = Array.from(document.querySelectorAll("button"));

    for (let i = 0; i < inps.length; i++) {
        counter += letterChecking(inps[i],i);
    }

    if(counter == wordLength){
        for (let i = 0; i < forms.length; i++) {
            forms[i].classList.add("disabled"); 
        }

        let div = document.createElement("div");
        div.classList.add("finish");
        div.innerHTML = `
            <h5>You Won</h5>
            <span>The word was <span class="won">${word}</span> </span>
        `;

        document.getElementsByClassName("game-container")[0].append(div);
        buttons.forEach((el)=>{el.classList.add("disabled")})
    }
    else if(inps[0].id.at(5) == numberOfTries-1){
        for (let i = 0; i < forms.length; i++) {
            forms[i].classList.add("disabled"); 
        }
        let div = document.createElement("div");
        div.classList.add("finish");
        div.innerHTML = `
            <h5>You Lose</h5>
            <span>The word was <span class="lose">${word}</span> </span>
        `;
        
        document.getElementsByClassName("game-container")[0].append(div);
        buttons.forEach((el)=>{el.classList.add("disabled")})        
    }
    else{
        document.querySelector(`#${`form${+id.at(-1)+1}`} :nth-child(2)`).focus()
    }
}
// letter checking
function letterChecking(inp,i){
    inp.value = inp.value.toUpperCase();
    inp.setAttribute("disabled",true);
    inp.blur();
    
    if(inp.value === word[i]){
        inp.classList.add("correct");
        return 1;
    }
    else if (word.includes(inp.value) && inp.value !== ""){
        inp.classList.add("mostly");
    }
    else{
        inp.classList.add("wrong");
    }
    
}

window.onload = render();

