/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let addButton = document.getElementById("addTask");
let askUserButton = document.getElementById("askUser");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

function createListElement() {
    let li = document.createElement("li")
    const existingItems = Array.from(document.getElementsByTagName("li"));
    const taskExists = existingItems.some(item => item.textContent.replace("X", "").trim() === input.value.trim());
    
    if (taskExists) {
        alert("Task already exists!");
        return; 
    } 
    li.appendChild(document.createTextNode(input.value)); //makes text from input field the li text
    ul.appendChild(li); //adds li to ul
    input.value = ""; //Reset text input field
    

    //START STRIKETHROUGH
    // because it's in the function, it only adds it for new items
    function crossOut() {
        li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);
    //END STRIKETHROUGH


    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click", function () {
        ul.removeChild(li); 
    })
}
function askUser() {
    let userInput;
    do {
        userInput = prompt("Enter a new task (or type 'exit' to stop):");
        if (userInput && userInput.toLowerCase() !== 'exit' && userInput.trim().length > 0) {
            input.value = userInput.trim(); // Set prompt input as value in the input field
            createListElement();
        }
    } while (userInput && userInput.toLowerCase() !== 'exit');
}


function addListAfterClick() {
    if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { //this now looks to see if you hit "enter"/"return"
        //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
        createListElement();
    }
}


addButton.addEventListener("click", addListAfterClick);
askUserButton.addEventListener("click", askUser);
input.addEventListener("keypress", addListAfterKeypress);