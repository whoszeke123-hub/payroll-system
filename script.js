let employees = JSON.parse(localStorage.getItem("employees")) || [];
let timeRecords = JSON.parse(localStorage.getItem("timeRecords")) || [];
let selectedEmployee = null;

function saveStorage(){
localStorage.setItem("employees",JSON.stringify(employees));
localStorage.setItem("timeRecords",JSON.stringify(timeRecords));
}

function hideAll(){
document.querySelectorAll(".form-container")
.forEach(e=>e.style.display="none");
document.getElementById("homePage").style.display="none";
}

function showAdd(){hideAll();addPage.style.display="block";}
function showTime(){hideAll();timePage.style.display="block";}
function showFile(){hideAll();filePage.style.display="block";renderFile();}
function showSearch(){hideAll();searchPage.style.display="block";}
function showUpdate(){hideAll();updatePage.style.display="block";}
function backHome(){hideAll();homePage.style.display="block";}

document.getElementById("addForm").addEventListener("submit",e=>{
e.preventDefault();

employees.push({
fname:fname.value,
mname:mname.value,
lname:lname.value,
address:address.value,
id:id.value,
dept:dept.value,
email:email.value,
number:number.value,
date:date.value,
rate:+rate.value,
hours:+hours.value
});

saveStorage();
alert("Saved!");
e.target.reset();
});

function renderFile(){
fileList.innerHTML="";
employees.forEach(emp=>{
fileList.innerHTML += `
<div>
${emp.fname} ${emp.lname} - ${emp.id}
</div>`;
});
}

function saveTime(){
let emp = employees.find(e=>e.id===timeID.value);
if(!emp){timeMsg.innerText="Not found";return;}

timeRecords.push({
id:emp.id,
in:timeIn.value,
out:timeOut.value
});

saveStorage();
timeMsg.innerText="Saved!";
}

function searchByName(){
searchResult.innerHTML="";
let s = searchName.value.toLowerCase();

employees.forEach(e=>{
let full = (e.fname+" "+e.lname).toLowerCase();
if(full.includes(s)){
searchResult.innerHTML += `<div>${full}</div>`;
}
});
}

function searchByID(){
let emp = employees.find(e=>e.id===searchID.value);
searchResult.innerHTML = emp ? emp.fname+" "+emp.lname : "Not found";
}

function filterSalary(type){
searchResult.innerHTML="";
employees.forEach(emp=>{
let salary = emp.rate*emp.hours*22;

if(type==="below" && salary<50000 ||
type==="above" && salary>=50000){
searchResult.innerHTML += `<div>${emp.fname} - ₱${salary}</div>`;
}
});
}

function findEmployee(){
selectedEmployee = employees.find(e=>e.id===updateID.value);
if(!selectedEmployee){updateMsg.innerText="Not found";return;}

editForm.style.display="block";

ufname.value=selectedEmployee.fname;
umname.value=selectedEmployee.mname;
ulname.value=selectedEmployee.lname;
}

function saveUpdate(){
Object.assign(selectedEmployee,{
fname:ufname.value,
mname:umname.value,
lname:ulname.value
});

saveStorage();
alert("Updated!");
}

function exitSystem(){
alert("Close tab manually.");
}
