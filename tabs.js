var classlogger = 0;
var classlogger2 = 0;


const d =new Date();
// getting the elements from html
const maindiv = document.getElementById("maindiv");
const lefttaskdiv = document.getElementById("left00");
const alltaskdiv = document.getElementById("all");
const comtaskdiv = document.getElementById("com");


function opentab(evt , cityname){
var i,  content;
    content = document.getElementsByClassName("content");
    console.log(content.length);
    for(i =0 ; i < content.length; i++){
        content[i].style.display = "none";
    }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tabs");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

    document.getElementById(cityname).style.display= "flex";
    evt.currentTarget.className += " active";
}



const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB9xLzxlxMkoltjbMWBjgilErxHbC-P4_4",
    authDomain: "final-task-panda.firebaseapp.com",
    projectId: "final-task-panda",
    storageBucket: "final-task-panda.appspot.com",
    messagingSenderId: "920136531628",
    appId: "1:920136531628:web:9d2c9f939c2b1cd46f2909",
    measurementId: "G-Z8320V2WBH"
});


const db = firebaseApp.firestore();

const saveData = (event) => {
  var month_name;
  var month_prompt = prompt("enter the deadline's month (if feb enter 2)" , nsame);
  console.log(month_prompt);
  var date_prompt = prompt("enter the deadline's month (if feb enter 2)", hahdfryt  );
  console.log(date_prompt);

  classlogger++;
  console.log(classlogger);
  const task = document.getElementById("task00").value
if(!task){
  alert("Please dont leave the field empty");
}
else{
const div = document.createElement("div");
// div.className= "div" + classlogger;
div.id = "didi"+classlogger;
div.className = "taskboxes";
console.log(div.className);
console.log(div.id);
let input = document.createElement("input");
input.contentEditable= true;
// input.classList.add("taskboxes")
input.value= task;
input.id = div.id+ "input";
// let editbutton = document.createElement("button");
// editbutton.innerHTML= "edit";
// editbutton.id = div.id + "e";
let removebutton = document.createElement("button");
removebutton.innerHTML="remove";
removebutton.id = div.id  + "r";

div.appendChild(input);
// div.appendChild(editbutton);
div.appendChild(removebutton);
maindiv.appendChild(div);
document.body.appendChild(maindiv);

  db.collection('users')
  .add({
    task : task,
    done : "f"

  })
  .then((docRef) => {
    console.log(docRef.id);
  })
  .catch((error) => {
    console.log(error);
  })

}
}

maindiv.addEventListener('click', checkIt);
lefttaskdiv.addEventListener('click', checkIt);

function checkIt(event){
  const thebutton = event.target;
console.log(thebutton.value);

if(thebutton.innerHTML == "remove"){
console.log( );
console.log(document.getElementById(thebutton.parentElement.id));
const thetext = document.getElementById(thebutton.parentElement.id + "input").value;
document.getElementById(thebutton.parentElement.id).remove();
var id_of_element_tobe_removed;
db.collection('users').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    // console.log(doc.data().task);
    console.log(thebutton.parentElement.id );
    if(thetext == doc.data().task){
      id_of_element_tobe_removed = doc.id;
      db.collection('users').doc(id_of_element_tobe_removed).update({
        done :"t"
      })
      
    }


  })
})

}

}


db.collection('users').get().then((snapshot) =>  {
  // console.log(snapshot.docs);
  snapshot.docs.forEach(doc => {
    classlogger2++;
    let taskjkkks = doc.data().task;
    console.log(doc.data().done)
    if(doc.data().done === "f"){
let lef_task_update_reload_div = document.createElement("div");
lef_task_update_reload_div.id = "done_false_wale_task" + classlogger2;
lef_task_update_reload_div.className = "taskboxes";

let task_input_box = document.createElement("input");
task_input_box.readOnly = true;
task_input_box.value =taskjkkks;
task_input_box.id = lef_task_update_reload_div.id + "input";

let task_remove_btn_for_left = document.createElement("button");
task_remove_btn_for_left.innerHTML = "remove";


lef_task_update_reload_div.appendChild(task_input_box);
lef_task_update_reload_div.appendChild(task_remove_btn_for_left);
lefttaskdiv.appendChild(lef_task_update_reload_div);
}


if (doc.data().done === "t"){
let completed_task_div = document.createElement("div");
completed_task_div.id = "doen_true_wale_task"  +classlogger2;
completed_task_div.className = "taskboxes";

let completed_task_input = document.createElement("input");
completed_task_input.id = completed_task_div.id + "input";
completed_task_input.readOnly = true;
completed_task_input.value = taskjkkks;

completed_task_div.appendChild(completed_task_input);
comtaskdiv.appendChild(completed_task_div);

}
    

    // let task_already_there_div = document.createElement("div");
    // task_already_there_div.id = "firestore_se_aye_task" + classlogger2;
    // task_already_there_div.className = "taskboxes";

    // let task_input_at = document.createElement("input");
    // task_input_at.id = task_already_there_div.id + "input";
    // task_input_at.readOnly = true;
    // task_input_at.value = taskjkkks;

    // let page_reload_btn_rmv = document.createElement("button");
    // page_reload_btn_rmv.innerHTML = "remove";
    
    // task_already_there_div.appendChild(task_input_at);
    // task_already_there_div.appendChild(page_reload_btn_rmv);


    // // maindiv.appendChild(task_already_there_div);
    // alltaskdiv.appendChild(task_already_there_div);
  })
})

