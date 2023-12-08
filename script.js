const inputBox = document.querySelector(".App .addItem input");
const listContainer = document.querySelector("#list-container");
const addBtn = document.querySelector(".App .addItem button");
const AppContainer = document.querySelector(".App");
// localStorage.clear();

const listDataObj = {};

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    const listArr = listContainer.querySelectorAll("li");
    listArr.forEach(function(list){
        const inputtt = list.querySelector("input");
        inputtt.value = inputtt.getAttribute("data-in");
    });
}
showTask();

addBtn.addEventListener("click",function(){
    if( inputBox.value === ""){
        addBtn.innerHTML = `<i class="fa-solid fa-ban"></i>`;
        inputBox.placeholder = "Write Something First!";
        setTimeout(function(){
            addBtn.innerHTML = `Add`;
        }, 1000);
        setTimeout(function(){
            inputBox.placeholder = "Add Your Task";
        }, 3000);
        // alert("You must write something to add!");
    }
    else{
        const listItem = document.createElement("li");
        const inputt = document.createElement("input");
        inputt.value = inputBox.value;
        inputt.setAttribute("data-in", String(inputt.value));
        inputt.readOnly = true;

        listItem.appendChild(inputt);
        // listItem.innerHTML = inputBox.value;
        listContainer.appendChild(listItem);
        inputBox.value = "";

        const Span = document.createElement("span");
        Span.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-x"></i>`;
        listItem.appendChild(Span);

        addBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        setTimeout(function(){
            addBtn.innerHTML = `Add`;
        }, 700);


        saveData();
    }
});

listContainer.addEventListener("click",function(ev){
    if(ev.target.tagName === "LI"){
        ev.target.classList.toggle("checked");
        ev.target.querySelector("input").classList.toggle("lineThrough");
        saveData();
    }
    else if(ev.target.classList.contains("fa-x")){
        ev.target.parentElement.parentElement.classList.add("fadeOut");
        setTimeout(function(){
            ev.target.parentElement.parentElement.remove();
            saveData();
        }, 290);
        
    }
    else if(ev.target.classList.contains("fa-pen-to-square")){

        ev.target.classList.remove("fa-pen-to-square");
        ev.target.classList.add("fa-download");

        const parent =  ev.target.parentElement.parentElement;
        const inp = parent.querySelector("input");
        inp.readOnly = false;
        inp.focus();;  
    }
    else if(ev.target.classList.contains("fa-download")){

        const parent =  ev.target.parentElement.parentElement;
        const inp = parent.querySelector("input");
        inp.readOnly = true;
        
        inp.setAttribute("data-in",String(inp.value));

        ev.target.classList.remove("fa-download");
        ev.target.classList.add("fa-pen-to-square");
        saveData();
    }
}, false);

