import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"

import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-59e43-default-rtdb.asia-southeast1.firebasedatabase.app/"
    // databaseURL: process.env.DATABASE_URL
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputValue = document.getElementById("input-el")
const saveInput = document.getElementById("input-btn")
const deleteAll = document.getElementById("del-btn")
const ulElement = document.getElementById("ul-el")
const deleteInd = document.getElementById("in-del-btn")


onValue(referenceInDB, function(snapshot){
    if(snapshot.exists()){
        const snapshotValues = Object.values(snapshot.val())
        printLeads(snapshotValues)
    }
})

saveInput.addEventListener("click", function(){
    // leads.push(inputValue.value)
    push(referenceInDB, inputValue.value)
    inputValue.value=""
})

function printLeads(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        listItems+= `
            <li>
                <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
            </li>
        `
    }
    ulElement.innerHTML = listItems
}

deleteAll.addEventListener("dblclick", function(){
    remove(referenceInDB)
    ulElement.innerHTML = ""
})