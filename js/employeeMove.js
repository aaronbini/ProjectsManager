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
var empShow = document.getElementById("empShow");
var empMoveCancel = document.getElementById("empMoveCancel");
var jobEmpCancel = document.getElementById("jobEmpCancel");
var hideEmps = document.getElementById("hideEmps");
var jobEmpViewDrop = document.getElementById("jobEmpViewDrop");
var viewEmpsOnJob = document.getElementById('viewEmpsOnJob');

var showFullEmpMoveMenu = function () {
	showElement(empShow);
	showElement(viewEmpDist);
}

var hideFullEmpMoveMenu = function () {
	hideElement(empShow);
	hideElement(viewEmpDist);
}

//cancel moving an employee to a job
var createEmpMoveCancel = function () {
	showFullEmpMoveMenu();
	hideElement(empMoveDrop);
	hideElement(jobMoveDrop);
	hideElement(moveEmployee);
	hideElement(empMoveCancel);
	document.getElementById('employeeSelected').selectedIndex = 0;
	if(document.getElementById('jobSelected')) {
		document.getElementById('jobSelected').selectedIndex = 0;
	}
}

var createJobEmpCancel = function () {
	showFullEmpMoveMenu();
	hideElement(jobEmpViewDrop);
	hideElement(empDist);
	hideElement(jobEmpCancel);
	if(document.getElementById('jobSelector')) {
		document.getElementById('jobSelector').selectedIndex = 0;
	}
}

//creates jobSelect appended to div jobMoveDrop
function showJobSelect(){
    showSelect(appendJobSelect, jobMoveDrop, empMoveCancel, showMoveEmp, "jobSelected", "jobsArray", "jobs", showFullEmpMoveMenu, hideFullEmpMoveMenu);
}

//runs showSelect function to display select with all current employees
var showEmpSelect = function () {
	showSelect(appendEmpSelect, empMoveDrop, empMoveCancel, showJobSelect, "employeeSelected", "employeesArray", "employees", showFullEmpMoveMenu, hideFullEmpMoveMenu);
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
	showFullEmpMoveMenu();
	hideElement(empMoveCancel);
	hideElement(empMoveDrop);
	hideElement(jobMoveDrop);
	hideElement(moveEmployee);
	document.getElementById('employeeSelected').selectedIndex = 0;
	document.getElementById('jobSelected').selectedIndex = 0;
}

var showDistEmp = function () {
	showElement(empDist);
}

//DRYed showSelect function for jobs and employees array
//call this function whenever a select element with all current jobs or employees is required
/* var showSelect = function (callback, element1, element2, func1, idName, arrayName, alertMessage, func2, func3) {
	if (localStorage.getArray(arrayName).length < 1) {
		alert("There are no current " + alertMessage + ".");
		func2();
		//func2 shows fullMenu
		return;
	} else if (!element.hasChildNodes()) {
		func3();
		//func3 hides fullMenu
		callback(element, idName, arrayName);
	}
	//below line assumes element already exists but is hidden
	showElement(element1);
	showElement(element2);
	document.getElementById(idName).addEventListener("change", func1);
} */

//runs showSelect, creating a select element with all current jobs
var jobsSelectList = function () {
	showSelect(appendJobSelect, jobEmpViewDrop, jobEmpCancel, showDistEmp, "jobSelector", "jobsArray", "jobs", showFullEmpMoveMenu, hideFullEmpMoveMenu);
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
		hideElement(jobEmpViewDrop);
		hideElement(empDist);
		hideElement(viewEmpsOnJob);
		hideElement(jobEmpCancel);
		showFullEmpMoveMenu();
	} else {
		employees.forEach(function(emp) {
			var element = document.createElement('li');
			element.innerHTML = emp;
			ul.appendChild(element);
		})
		if (!viewEmpsOnJob.hasChildNodes()) {
			viewEmpsOnJob.appendChild(ul);
		}
		hideEmps.addEventListener("click", hideEmpsOnJob);
		showElement(hideEmps);
		hideElement(jobEmpViewDrop);
		hideElement(empDist);
		showElement(viewEmpsOnJob);
		hideElement(jobEmpCancel);
	}
}

//clear employees on job list and reset views
var hideEmpsOnJob = function () {
	var element = viewEmpsOnJob;
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	showFullEmpMoveMenu();
	hideElement(hideEmps);
	hideElement(viewEmpsOnJob);
	hideElement(jobEmpCancel);
}

//employee move and employee distribution event listeners

empShow.addEventListener("click", showEmpSelect);
viewEmpDist.addEventListener("click", jobsSelectList);
empDist.addEventListener("click", makeEmpList);
moveEmployee.addEventListener("click", updateEmployeeJob);
empMoveCancel.addEventListener("click", createEmpMoveCancel);
jobEmpCancel.addEventListener("click", createJobEmpCancel);