
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-932bd-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorseInDB = ref(database, "endorsements")




const inputEl = document.getElementById("input-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const btnEl = document.getElementById("btn-el")
const likeEl = document.getElementById("likeButton")
const endorseEl = document.getElementById("endorse-el")




btnEl.addEventListener("click", function (){
    const inputValue = inputEl.value
    const fromValue = fromEl.value
    const toValue = toEl.value

    let dataObject = {
        tofield: toValue,
        fromfield: fromValue,
        inputfield: inputValue
    }

    push(endorseInDB, dataObject)
    clearInput()
})





function increaseLike(){
    if (clicks === 0) {
        // Disable the button after the first click
        button.disabled = true;
    }

    clicks++;

    // Update the real-time database with the number of clicks
    database.ref("endorsements").set(clicks);
    
}


onValue(endorseInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())
    console.log(Object.entries(snapshot.val()))
    
    clearEndorseEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        appendItemToEndorseEl(itemsArray[i])
        console.log(itemsArray[i])
    }
})

function clearEndorseEl() {
    endorseEl.innerHTML = ""
}



function appendItemToEndorseEl(itemValue) {
    endorseEl.innerHTML += `
                
                    <li>
                    <p class="to"> To ${itemValue[1].tofield}</p>
                        ${itemValue[1].inputfield} 
                      <div class="btnlike">
                      <p class="from"> From ${itemValue[1].fromfield}</p>
                        <div class="click">
                            <button id="likeButton">
                            <i class="fas fa-heart"></i>
                            </button><p class="count">3</p>
                            
                        </div>    
                      </div>
                    </li>
                
                        `
}

function clearInput(){
    inputEl.value = ""
    toEl.value = ""
    fromEl.value = ""
}

