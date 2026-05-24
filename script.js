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

// DATE LIMIT
date.max = new Date().toISOString().split("T")[0];
udate.max = new Date().toISOString().split("T")[0];

// ADD EMPLOYEE (UNCHANGED LOGIC)
addForm.addEventListener("submit",e=>{
e.preventDefault();

document.querySelectorAll(".error")
.forEach(e=>e.innerText="");

let valid=true;

if(fname.value.trim()==""){fnameError.innerText="Invalid Input";valid=false;}
if(mname.value.trim()==""){mnameError.innerText="Invalid Input";valid=false;}
if(lname.value.trim()==""){lnameError.innerText="Invalid Input";valid=false;}
if(address.value.trim()==""){addressError.innerText="Invalid Input";valid=false;}

if(!/^\d{4}-\d{3}$/.test(id.value)){idError.innerText="Invalid Input";valid=false;}
if(dept.value.trim()==""){deptError.innerText="Invalid Input";valid=false;}

if(!email.value.includes("@")){emailError.innerText="Invalid Input";valid=false;}
if(!/^\d{11}$/.test(number.value)){numberError.innerText="Invalid Input";valid=false;}

if(date.value==""){dateError.innerText="Invalid Input";valid=false;}
if(+rate.value<=0){rateError.innerText="Invalid Input";valid=false;}
if(+hours.value<=0){hoursError.innerText="Invalid Input";valid=false;}

if(!valid) return;

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


// ================= CHECK FILE (GROUPED + TOP RIGHT DELETE) =================
function renderFile(){

fileList.innerHTML="";

let grouped = {};

employees.forEach(emp=>{
if(!grouped[emp.dept]) grouped[emp.dept]=[];
grouped[emp.dept].push(emp);
});

// GROUP BY DEPARTMENT
for(let dept in grouped){

fileList.innerHTML += `
<h3 style="color:#93c5fd;margin-top:15px">${dept}</h3>
`;

grouped[dept].forEach(emp=>{

let salary = emp.rate * emp.hours * 22;

fileList.innerHTML += `
<div style="position:relative;">

<!-- DELETE BUTTON TOP RIGHT -->
<button onclick="deleteEmployee('${emp.id}')"
style="
position:absolute;
top:8px;
right:8px;
background:#7f1d1d;
color:white;
border:none;
padding:6px 10px;
border-radius:6px;
cursor:pointer;
">
DELETE
</button>

<pre style="
color:white;
background:rgba(255,255,255,0.05);
padding:15px;
margin:10px 0;
border-radius:10px;
border:1px solid rgba(255,255,255,0.2);
font-family:monospace;
text-align:left;
">

==================================================
Employee Name        : ${emp.fname} ${emp.mname} ${emp.lname}
Employee Address     : ${emp.address}
Employee ID Number   : ${emp.id}
Department           : ${emp.dept}
Email                : ${emp.email}
Contact Number       : ${emp.number}
Date of Employment   : ${emp.date}
Rate Per Hour        : ${emp.rate.toFixed(2)}
Daily Hours          : ${emp.hours}
Monthly Salary       : Php ${salary.toFixed(2)}
==================================================
</pre>

</div>
`;
});

}
}

// DELETE
function deleteEmployee(id){

if(confirm("Delete this employee?")){

employees = employees.filter(emp=>emp.id!==id);
saveStorage();
renderFile();

}
}


// ================= SEARCH (SINGLE BAR: NAME / ID / SALARY) =================
function searchEmployee(){

searchResult.innerHTML="";

let query = searchBar.value.toLowerCase();

let results = employees.filter(emp=>{

let fullName =
`${emp.fname} ${emp.mname} ${emp.lname}`.toLowerCase();

let salary = emp.rate * emp.hours * 22;

return (
fullName.includes(query) ||
emp.id.includes(query) ||
String(salary).includes(query)
);

});

if(results.length===0){
searchResult.innerHTML="No employee found";
return;
}

// SHOW FULL FORMAT (SAME AS CHECK FILE)
results.forEach(emp=>{

let salary = emp.rate * emp.hours * 22;

searchResult.innerHTML += `
<pre style="
color:white;
background:rgba(255,255,255,0.05);
padding:15px;
margin:10px 0;
border-radius:10px;
border:1px solid rgba(255,255,255,0.2);
font-family:monospace;
text-align:left;
">

==================================================
Employee Name        : ${emp.fname} ${emp.mname} ${emp.lname}
Employee Address     : ${emp.address}
Employee ID Number   : ${emp.id}
Department           : ${emp.dept}
Email                : ${emp.email}
Contact Number       : ${emp.number}
Date of Employment   : ${emp.date}
Rate Per Hour        : ${emp.rate.toFixed(2)}
Daily Hours          : ${emp.hours}
Monthly Salary       : Php ${salary.toFixed(2)}
==================================================
</pre>
`;
});

}


// TIME
function saveTime(){

let emp = employees.find(e=>e.id===timeID.value);

if(!emp){
timeMsg.innerText="This ID does not exist";
return;
}

timeRecords.push({
id:emp.id,
in:timeIn.value,
out:timeOut.value
});

saveStorage();

timeMsg.innerText="Time saved!";
}


// UPDATE
function findEmployee(){

let emp = employees.find(e=>e.id===updateID.value);

if(!emp){
updateMsg.innerText="Employee not found";
return;
}

selectedEmployee = emp;

editForm.style.display="block";

ufname.value=emp.fname;
umname.value=emp.mname;
ulname.value=emp.lname;
uaddress.value=emp.address;
udept.value=emp.dept;
uemail.value=emp.email;
unumber.value=emp.number;
udate.value=emp.date;
urate.value=emp.rate;
uhours.value=emp.hours;
}

function saveUpdate(){

selectedEmployee.fname=ufname.value;
selectedEmployee.mname=umname.value;
selectedEmployee.lname=ulname.value;
selectedEmployee.address=uaddress.value;
selectedEmployee.dept=udept.value;
selectedEmployee.email=uemail.value;
selectedEmployee.number=unumber.value;
selectedEmployee.date=udate.value;
selectedEmployee.rate=+urate.value;
selectedEmployee.hours=+uhours.value;

saveStorage();

alert("Updated!");
}

// EXIT
function exitSystem(){
alert("Close tab manually.");
}
