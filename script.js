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
        inputBox.placeholder = "Write Something First!";
        addBtn.innerHTML = `<i class="fa-solid fa-ban"></i>`;
        addBtn.classList.add("bgRed");
        setTimeout(function(){
            addBtn.innerHTML = `Add`;
            addBtn.classList.remove("bgRed");

        }, 1000);
        setTimeout(function(){
            inputBox.placeholder = "Add Your Task";
        }, 3000);
        // alert("You must write something to add!");
    }
    else{
        const listItem = document.createElement("li");
        listItem.setAttribute('draggable',true);

        listItem.addEventListener("dragstart",()=>{
            setTimeout( ()=>{
                listItem.classList.add("dragging");
            }, 0);
        })
        listItem.addEventListener("dragend",()=>{
            listItem.classList.remove("dragging");
        })

        const inputt = document.createElement("input");
        inputt.classList.add("textCapitalize");
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
        addBtn.classList.add("bgGreen");
        setTimeout(function(){
            addBtn.innerHTML = `Add`;
            addBtn.classList.remove("bgGreen");

        }, 1500);

        listContainerLiArray = document.querySelectorAll("#list-container li");
        saveData();
    }
});


listContainer.addEventListener("click",function(ev){
    if(ev.target.tagName === "LI"){
        ev.target.classList.toggle("checked");
        ev.target.querySelector("input").classList.toggle("lineThrough");

        listContainerLiArray = document.querySelectorAll("#list-container li");
        saveData();
    }
    else if(ev.target.classList.contains("fa-x")){
        ev.target.parentElement.parentElement.classList.add("fadeOut");
        setTimeout(function(){
            ev.target.parentElement.parentElement.remove();
            listContainerLiArray = document.querySelectorAll("#list-container li");
            saveData();
        }, 1000);
        
    }
    else if(ev.target.classList.contains("fa-pen-to-square")){
        
        ev.target.classList.remove("fa-pen-to-square");
        ev.target.classList.add("fa-download");
        ev.target.classList.add("clrGreen");
        
        const parent =  ev.target.parentElement.parentElement;
        const inp = parent.querySelector("input");
        inp.style.cursor = "text";
        inp.readOnly = false;
        inp.classList.add("bg-differ");
        inp.focus();

        listContainerLiArray = document.querySelectorAll("#list-container li");

    }
    else if(ev.target.classList.contains("fa-download")){
        const parent =  ev.target.parentElement.parentElement;
        const inp = parent.querySelector("input");
        if(inp.value==""){
            alert(`You are adding "Empty Task"`);
            inp.focus();
            return;
        }
        inp.style.cursor = "pointer";
        inp.readOnly = true;
        inp.classList.remove("bg-differ");
        
        inp.setAttribute("data-in",String(inp.value));
        
        ev.target.classList.remove("fa-download");
        ev.target.classList.remove("clrGreen");
        ev.target.classList.add("fa-pen-to-square");
        listContainerLiArray = document.querySelectorAll("#list-container li");
        saveData();
    }
}, false);

let listContainerLiArray = document.querySelectorAll("#list-container li");

const initList = (ev) => {

    const draggingItem = listContainer.querySelector(".dragging");

    const siblings = [...listContainer.querySelectorAll("li:not(.dragging)")];

    let nextSibling = siblings.find(sib => {
        return ev.clientY <= sib.offsetTop + sib.offsetHeight*2.5;
    })
    // if(nextSibling && draggingItem)
        listContainer.insertBefore(draggingItem, nextSibling);
}
listContainer.addEventListener("dragover",initList);


