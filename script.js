 // Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = [],
 id = 0;

//Get item from localstorage
//let data = localStorage.getItem("TODO");

// Check if the localstorage is updated with data
//if(data){
    //LIST = JSON.parse(data);
    //id = LIST.length;
    //loadList(LIST);
//} else {
    //LIST = [];
    //id = 0;
//}

//Load items to the user's interface
//function loadList(array){
    //array.forEach(function(item){
        //addToDo(item.name, item.id, item.done, item.trash);
    //});
//}

//Show date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash){

    if(trash){return;};

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item =`<li class="item">
                    <i class="fa ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;

    const position = 'beforeend' ;
    list.insertAdjacentHTML(position, item);
}

//On click add an item to the list
document.addEventListener('click', function(event){
    if(event.target){
        const toDo = input.value;
         //if the input is empty
         if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item from localstorage
            //localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    
    }
});

//Complete to do 
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove item in the list
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true;
}

//target the event listener
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item from localstorage
    //localStorage.setItem("TODO", JSON.stringify(LIST))
});