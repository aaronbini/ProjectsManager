/*
//employee movement functionality
*/

/*
//employee movement buttons
*/

var empMoveDrop = document.getElementById("empMoveDrop");
var jobMoveDrop = document.getElementById("jobMoveDrop");
var moveEmployee = document.getElementById("moveEmployee");
var viewEmpDist = document.getElementById("viewEmpDist");
var empDist = document.getElementById("empDist");

//cancel moving an employee to a job
var createEmpMoveCancel = function () {
	showElement(empShow);
	hideElement(empMoveDrop);
	hideElement(jobMoveDrop);
	hideElement(moveEmployee);
	hideElement(document.getElementById('empMoveCancel'));
	document.getElementById('employeeSelected').selectedIndex = 0;
	if(document.getElementById('jobSelected')) {
		document.getElementById('jobSelected').selectedIndex = 0;
	}
}

//creates jobSelect appended to div jobMoveDrop
function showJobSelect(){
    showSelect(appendJobSelect, jobMoveDrop, showMoveEmp, "jobSelected", "jobsArray", "jobs");
}

//runs showSelect function to display select with all current employees
var showEmpSelect = function () {
	showSelect(appendEmpSelect, empMoveDrop, showJobSelect, "employeeSelected", "employeesArray", "employees");
	showElement(document.getElementById('empMoveCancel'));
	hideElement(empShow);
}

var showMoveEmp = function () {
	showElement(moveEmployee);
}

//moves selected employee to selected job, changes employee["jobAssignment"] in localStorage employeesArray
var updateEmployeeJob = function () {
	
	var array = localStorage.getArray("employeesArray");
	var array2 = localStorage.getArray("jobsArray");
	var emp = document.getElementById("employeeSelected").value;
	var job = document.getElementById("jobSelected").value;
	//iterate through employees, if name matches emp, and if employee job key is either empty or does not equal job
	//push job to that employee[jobAssignment] within employeesArray
	array.forEach(function(employee){
		if(employee["empFirstName"] + " " + employee["empLastName"] === emp && employee["jobAssignment"] === job) {
			alert(emp + " is already assigned to that job.");
		} else if (employee["empFirstName"] + " " + employee["empLastName"] === emp) {
			employee["jobAssignment"] = job;
			alert(emp + " has been successfully moved to " + job);
		}
	})
	localStorage.setItem("employeesArray", JSON.stringify(array));
	showElement(empShow);
	hideElement(document.getElementById('empMoveCancel'));
	hideElement(empMoveDrop);
	hideElement(jobMoveDrop);
	hideElement(moveEmployee);
	document.getElementById('employeeSelected').selectedIndex = 0;
	document.getElementById('jobSelected').selectedIndex = 0;
}

var showDistEmp = function () {
	showElement(empDist);
}

//runs showSelect, creating a select element with all current jobs
var jobsSelectList = function () {
	console.log("jobs list...");
	showSelect(appendJobSelect, jobEmpViewDrop, showDistEmp, "jobSelector", "jobsArray", "There are no current jobs.");
	hideElement(viewEmpDist);
}

//runs forEach loop on employees array and returns new array with all employees on the job selected from job dropdown
var viewManPower = function () {
	var parsedArray = localStorage.getArray("employeesArray");
	var empsOnJob = [];
	var job = document.getElementById("jobSelector").value;
	empsOnJob.push(job);
	parsedArray.forEach(function(employee){
		if (employee["jobAssignment"] === job) {
			empsOnJob.push(employee["empFirstName"] + " " + employee["empLastName"] + " (" + employee["empType"] + ")");
		}
	})
	
	document.getElementById('jobSelector').selectedIndex = 0;
	return empsOnJob;
}

//calls viewManPower to create list of employees on job, makes it visible
var makeEmpList = function () {
	var employees = viewManPower();
	var ul = document.createElement('ul');
	if (employees.length<2) {
		alert("There are no employees on that job.");
		hideElement(document.getElementById("jobEmpViewDrop"));
		hideElement(empDist);
		hideElement(document.getElementById("viewEmpsOnJob"));
		showElement(viewEmpDist);
	} else {
		employees.forEach(function(emp) {
			var element = document.createElement('li');
			element.innerHTML = emp;
			ul.appendChild(element);
		})
		if (!document.getElementById("viewEmpsOnJob").hasChildNodes()) {
			document.getElementById("viewEmpsOnJob").appendChild(ul);
		}
		
		document.getElementById("hideEmps").addEventListener("click", hideEmpsOnJob);
		showElement(document.getElementById('hideEmps'));
		hideElement(document.getElementById('jobEmpViewDrop'));
		hideElement(empDist);
		showElement(document.getElementById("viewEmpsOnJob"));
	}
}

//clear employees on job list and reset views
var hideEmpsOnJob = function () {
	var element = document.getElementById("viewEmpsOnJob");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	showElement(viewEmpDist);
	hideElement(document.getElementById("hideEmps"));
	hideElement(viewEmpsOnJob);
}

//employee move and employee distribution event listeners

employeeSubmit.addEventListener("click", empFormSubmit);
empShow.addEventListener("click", showEmpSelect);
viewEmpDist.addEventListener("click", jobsSelectList);
empDist.addEventListener("click", makeEmpList);
moveEmployee.addEventListener("click", updateEmployeeJob);
document.getElementById('empMoveCancel').addEventListener("click", createEmpMoveCancel);