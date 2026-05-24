let employees =
JSON.parse(localStorage.getItem("employees")) || [];

let timeRecords =
JSON.parse(localStorage.getItem("timeRecords")) || [];

let selectedEmployee = null;

// SAVE STORAGE
function saveStorage(){
localStorage.setItem("employees",JSON.stringify(employees));
localStorage.setItem("timeRecords",JSON.stringify(timeRecords));
}

// NAVIGATION
function showAdd(){hideAll();addPage.style.display="block";}
function showTime(){hideAll();timePage.style.display="block";}
function showFile(){hideAll();filePage.style.display="block";renderFile();}
function showSearch(){hideAll();searchPage.style.display="block";}
function showUpdate(){hideAll();updatePage.style.display="block";}
function backHome(){hideAll();homePage.style.display="block";}

function hideAll(){
document.querySelectorAll(".form-container")
.forEach(e=>e.style.display="none");
homePage.style.display="none";
}

// ADD EMPLOYEE (UNCHANGED)
addForm.addEventListener("submit",e=>{
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

// ================= CHECK FILE (UNCHANGED STRUCTURE) =================
function renderFile(){

fileList.innerHTML="";
let grouped={};

employees.forEach(emp=>{
if(!grouped[emp.dept]) grouped[emp.dept]=[];
grouped[emp.dept].push(emp);
});

for(let dept in grouped){

fileList.innerHTML+=`<h3>${dept}</h3>`;

grouped[dept].forEach(emp=>{

let salary = emp.rate * emp.hours * 22;

fileList.innerHTML+=`
<div style="position:relative">

<pre style="text-align:left">
==================================================
Employee Name      : ${emp.fname} ${emp.mname} ${emp.lname}
Address            : ${emp.address}
Employee ID        : ${emp.id}
Department         : ${emp.dept}
Email              : ${emp.email}
Contact Number     : ${emp.number}
Date of Employment : ${emp.date}
Rate Per Hour      : ${emp.rate}
Daily Hours        : ${emp.hours}
Monthly Salary     : ₱${salary.toFixed(2)}
==================================================
</pre>

<button onclick="deleteEmployee('${emp.id}')"
style="
position:absolute;
top:5px;
right:5px;
background:red;
color:white;
border:none;
padding:5px 8px;
cursor:pointer;
">
X
</button>

</div>
`;
});

}
}

function deleteEmployee(id){
employees = employees.filter(e=>e.id!==id);
saveStorage();
renderFile();
}

// ================= SEARCH (SINGLE BAR ONLY) =================
function searchEmployee(){

searchResult.innerHTML="";

let q = searchBar.value.toLowerCase();

let results = employees.filter(emp=>{

let fullName =
`${emp.fname} ${emp.mname} ${emp.lname}`.toLowerCase();

let salary = emp.rate * emp.hours * 22;

return fullName.includes(q) ||
emp.id.includes(q) ||
String(salary).includes(q);

});

if(results.length===0){
searchResult.innerHTML="No employee found";
return;
}

results.forEach(emp=>{

let salary = emp.rate * emp.hours * 22;

searchResult.innerHTML+=`
<pre style="text-align:left">
==================================================
Employee Name      : ${emp.fname} ${emp.mname} ${emp.lname}
Address            : ${emp.address}
Employee ID        : ${emp.id}
Department         : ${emp.dept}
Email              : ${emp.email}
Contact Number     : ${emp.number}
Date of Employment : ${emp.date}
Rate Per Hour      : ${emp.rate}
Daily Hours        : ${emp.hours}
Monthly Salary     : ₱${salary.toFixed(2)}
==================================================
</pre>
`;
});

}

// ================= TIME =================
function saveTime(){

let emp = employees.find(e=>e.id===timeID.value);

if(!emp){
timeMsg.innerText="ID not found";
return;
}

timeRecords.push({
id:emp.id,
in:timeIn.value,
out:timeOut.value
});

saveStorage();
timeMsg.innerText="Saved!";
}

// ================= UPDATE (FIXED ONLY, STRUCTURE SAME) =================
function findEmployee(){

let emp = employees.find(e=>e.id===updateID.value);

if(!emp){
updateMsg.innerText="Employee not found";
return;
}

selectedEmployee = emp;
editForm.style.display="block";

ufname.value = emp.fname;
umname.value = emp.mname;
ulname.value = emp.lname;
uaddress.value = emp.address;
udept.value = emp.dept;
uemail.value = emp.email;
unumber.value = emp.number;
udate.value = emp.date;
urate.value = emp.rate;
uhours.value = emp.hours;
}

function saveUpdate(){

if(!selectedEmployee){
updateMsg.innerText="No employee selected";
return;
}

selectedEmployee.fname = ufname.value;
selectedEmployee.mname = umname.value;
selectedEmployee.lname = ulname.value;
selectedEmployee.address = uaddress.value;
selectedEmployee.dept = udept.value;
selectedEmployee.email = uemail.value;
selectedEmployee.number = unumber.value;
selectedEmployee.date = udate.value;
selectedEmployee.rate = +urate.value;
selectedEmployee.hours = +uhours.value;

saveStorage();
alert("Updated!");
}

// EXIT
function exitSystem(){
alert("Close tab manually.");
}
