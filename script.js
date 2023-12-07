const inputBox = document.querySelector(".App .addItem input");
const listContainer = document.querySelector("#list-container");
const addBtn = document.querySelector(".App .addItem button");

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

addBtn.addEventListener("click",function(){
    if( inputBox.value === ""){
        alert("You must write something to add!");
    }
    else{
        const listItem = document.createElement("li");
        listItem.innerHTML = inputBox.value;
        listContainer.appendChild(listItem);
        inputBox.value = "";

        const Span = document.createElement("span");
        Span.innerHTML = `<i class="fa-solid fa-x"></i>`;
        listItem.appendChild(Span);

        addBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        addBtn.classList.add("bgGreen");
        setTimeout(function(){
            addBtn.innerHTML = `Add`;
            addBtn.classList.remove("bgGreen");
        }, 700);


        saveData();
    }
});

listContainer.addEventListener("click",function(ev){
    if(ev.target.tagName === "LI"){
        ev.target.classList.toggle("checked");
        saveData();
    }
    else if(ev.target.tagName === "SPAN"){
        ev.target.parentElement.classList.add("fadeOut");
        setTimeout(function(){
            ev.target.parentElement.remove();
            saveData();
        }, 290);
        
    }
}, false);



