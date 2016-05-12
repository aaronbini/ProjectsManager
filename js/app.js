//Create application to help visualize and organize ongoing construction projects and employees for electrical contractor

//used this button as temp button for deleting certain jobs from jobsArray in localStorage
//remove this button at some point
var deleteJob = document.getElementsByTagName("button")[0];

//buttons
var jobsDropdown = document.getElementById("jobsDropdown");
var viewJobs = document.getElementById("viewJobs");
var viewEmps = document.getElementById("viewEmps");
var viewArchived = document.getElementById("viewArchived");
var hideJobs = document.getElementById("hideJobs");
var hideArchivedJobs = document.getElementById('hideArchivedJobs');
var hideEmployees = document.getElementById("hideEmployees");
var employeeDropdown = document.getElementById("addEmployee");
var jobSubmit = document.getElementById("jobSubmit");
var employeeForm = document.getElementById("employeeForm");
var employeeSubmit = document.getElementById("employeeSubmit");
var empShow = document.getElementById("empShow");
var selectEmp = document.getElementById("selectEmp");
var empMoveDrop = document.getElementById("empMoveDrop");
var jobMoveDrop = document.getElementById("jobMoveDrop");
//var updateEmpJob = document.getElementById("updateEmpJob");
var moveEmployee = document.getElementById("moveEmployee");
var jobCancel = document.getElementById('jobCancel');
var empCancel = document.getElementById('empCancel');

var viewEmpDist = document.getElementById("viewEmpDist");
var empDist = document.getElementById("empDist");
var jobArchives = document.getElementById("jobArchives");
var archiveJobs = document.getElementById("archiveJobs");
var finalArchive = document.getElementById("finalArchive");
var jobEditSave = document.getElementById("jobEditSave");
var empEditSave = document.getElementById("empEditSave");

var jobForm = document.getElementById("jobCreateForm");
var empForm = document.getElementById("employeeCreateForm");
var jobDropList = document.getElementById("jobDropList");
var jobList = document.getElementById("jobList");
var empList = document.getElementById("empList");
var empDropList = document.getElementById("empDropList");
var employees = document.getElementById("employees");
var jobArchSelect = document.getElementById("jobArchSelect");
var archJobList = document.getElementById('archJobList');

var jobAttrs = ["jobName", "jobNumber", "street", "cityState", "foreman", "PM", "jobDescription"];
var empAttrs = ["empFirstName","empLastName", "empNumber", "empAddress", "empCityState", "empType"];

//show an html element
var showElement = function (element) {
	if(element.classList.contains("hidden")) {
		element.classList.remove("hidden");
	}
}

//hide an html element
var hideElement = function (element) {
	if(!element.classList.contains("hidden")) {
		element.classList.add("hidden");
	}
}

//newly created job is pushed to jobsArray in localStorage
var createJob = function (job) {
	var jobUL = document.createElement('ul');
	localStorage.pushArrayItem("jobsArray", job);
	jobList.appendChild(appendJobListItem(job, jobUL));
	jobDropList.appendChild(jobList);
}

//modeled after createJob function, using same functions but using empAttrs instead of jobAttrs
var createEmp = function (emp) {
	var empUL = document.createElement('ul');
	localStorage.pushArrayItem("employeesArray", emp);
	//this appends newly created job to the list, need to replicate this for the selects
	empList.appendChild(appendEmpListItem(emp, empUL));
	empDropList.appendChild(empList);
}

//sets object value to returned value from extractValue
 var setAttribute = function (obj, id) {
	
	obj[id] = extractValue(id);
	//console.log(obj);
	
	return obj;
}

//returns value of input element with the id that is passed as parameter
//if statement returns values for !radio buttons and the else returns value of selected radio button
var extractValue = function (id) {
	if (id != "empType") {
		return document.getElementById(id).value;
	} else {
		
		var radios = document.getElementsByName("empRadio");
		
		for (var i = 0; i < radios.length; i++) {
			 if (radios[i].checked) {
				 return radios[i].value;
			 } else {
				console.log("button not checked"); 
			 }
		}
	}
}

//form validation returns false if a field is empty
 var formIsValid = function (obj) {
	for(var field in obj) {
		if(obj.hasOwnProperty(field)) {
			if(obj[field].length === 0) {
				return false;
			}
		}
	}
	return true;
}

//DRYed form submit function for creating new job or employee, and editing job or employee
var formSubmit = function (event, reduceArray, func1, func2, element1, element2, element3) {
	var obj = reduceArray.reduce(setAttribute, {});
	if (formIsValid(obj)) {
		func1(obj);
		func2();
		showElement(element1);
		showElement(element3);
		element3.reset();
		//event.preventDefault();
	} else {
		alert("There is an empty form field that must be filled out.");
		event.preventDefault();
	}
	return obj;
}

//functions for creating and editing jobs and employees
var jobFormSubmit = function () {
	return formSubmit(event, jobAttrs, createJob, hideJobForm, jobsDropdown, viewJobs, jobForm); 
}

var editJobFormSubmit = function () {
	return formSubmit(event, jobAttrs, doNothing, hideJobForm, jobsDropdown, viewJobs, jobForm);
}

var empFormSubmit = function () {
	return formSubmit(event, empAttrs, createEmp, hideEmpForm, employeeDropdown, viewEmps, empForm);
}

var editEmpFormSubmit = function () {
	return formSubmit(event, empAttrs, doNothing, hideEmpForm, employeeDropdown, viewEmps, empForm);
}

//cancel new job creation
var createJobCancel = function (event) {
	hideJobForm();
	showElement(viewJobs);
	hideElement(jobEditSave);
	hideElement(jobCancel);
	jobForm.reset();
	event.preventDefault();
}

//cancel new employee addition
var createEmpCancel = function (event) {
	console.log('empcancel working');
	hideEmpForm();
	hideElement(empCancel);
	hideElement(empEditSave);
	showElement(viewEmps);
	empForm.reset();
	event.preventDefault();
}

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

var createArchiveJobCancel = function () {
	if(document.getElementById('jobSelecting')) {
		showElement(document.getElementById('jobSelecting'));
		
	}
	hideElement(finalArchive);
	hideElement(jobArchives);
	showElement(archiveJobs);
	hideElement(document.getElementById('jobArchCancel'));
	hideElement(jobArchSelect);
	document.getElementById('jobSelecting').selectedIndex = 0;
}

//shows form for adding new jobs
var showJobForm = function () {
	showElement(jobForm);
	hideElement(jobsDropdown);
	showElement(jobCancel);
	showElement(jobSubmit);
}
//hides form
var hideJobForm = function () {
	hideElement(jobForm);
	showElement(jobsDropdown);
	hideElement(jobCancel);
}
//shows form for adding new employees
var showEmpForm = function () {
	showElement(empForm);
	hideElement(employeeDropdown);
	showElement(empCancel);
	showElement(employeeSubmit);
}
//hides form
var hideEmpForm = function () {
	hideElement(empForm);
	showElement(employeeDropdown);
	showElement(empCancel);
}

//creates unordered list depending on passed in parameters
var makeUL = function (arrayName, items, element1, element2, element3) {
	if (localStorage.getArray(arrayName).length < 1) {
		//instead of alert this should be hard-coded html message that is visibility toggled
		alert("There are no " + items + " to view.");
		hideElement(element1);
	} else {
		hideElement(element2);
		showElement(element3);
	}
}

//functions for displaying jobs and employees
var makeJobUL = function () {
	makeUL("jobsArray", "jobs", hideJobs, viewJobs, jobDropList);
}

var makeArchJobUL = function () {
	//need to create some of these elements
	makeUL("archivedJobs", "archived jobs", hideArchivedJobs, viewArchived, jobArchives);
}

var makeEmpUL = function () {
	makeUL("employeesArray", "employees", hideEmployees, viewEmps, empDropList);
}

//hides jobs list
var hideUL = function() {
	showElement(viewJobs);
	hideElement(jobDropList);
}
//hides emp list
var hideEmpUL = function () {
	showElement(viewEmps);
	hideElement(empDropList);
}
//hides archived jobs list
var hideArchUL = function () {
	showElement(viewArchived);
	hideElement(jobArchives);
}

//creates an unordered list for each current job using string values in jobAttrs array
//runs getText on each string value from jobAttrs and returns a certain string depending on value
//should dry this code and combine with appendEmpListItem
var appendJobListItem = function (jobObj, ul) {
    jobAttrs.forEach(function(attr) {
		var attribute = getJobText(attr);
		var value = jobObj[attr];
		var element = document.createElement('li');
		element.innerHTML = attribute + value;
		ul.appendChild(element);
		if(attr="jobNumber") {
			ul.id= jobObj[attr];
		}
	})	
	ul.appendChild(createButton("", "Edit Job", "button-link edit", editJob));
	var par = document.createElement('p');
	par.innerHTML = ('====================');
	ul.appendChild(par);
	return ul;
}

//creates an unordered list for each current employee using string values in empAttrs array
//runs getText on each string value from jobAttrs and returns a certain string depending on value
var appendEmpListItem = function (empObj, ul) {
  empAttrs.forEach(function(attr) {
    var attribute = getEmpText(attr);
	var value = empObj[attr];
	var element = document.createElement('li');
	element.innerHTML = attribute + value;
	ul.appendChild(element);
	if(attr = "empNumber") {
		ul.id = empObj[attr];
	}
  })
  ul.appendChild(createButton("", "Edit Employee", "button-link edit", editEmp));
  var par = document.createElement('p');
  par.innerHTML = ('====================');
  ul.appendChild(par);
  return ul;
}

 //parses jobsArray in localStorage and constructs a jobs list from it using appendJobListItem function
//appends job list element in argument list (this must be a javascript variable set to an element with particular id)
var constructUL = function (arrayName, list, element) {
    var parsedArray = localStorage.getArray(arrayName);
	
	for(var i = 0; i < parsedArray.length; i++) {
      var jobUL = document.createElement('ul');
      list.appendChild(appendJobListItem(parsedArray[i], jobUL));
	}
	element.appendChild(list);
}

var constructEmpUL = function (arrayName, list, element) {
	var parsedArray = localStorage.getArray(arrayName);
	
	for(var i = 0; i < parsedArray.length; i++) {
		var empUL = document.createElement('ul');
		list.appendChild(appendEmpListItem(parsedArray[i], empUL));
	}
	element.appendChild(list);
}

//for jobList, returns different text for each case  
var getJobText = function (attr) {
	switch (attr) {
		case("jobName"):
			return "Job Name: ";
			break;
		case("jobNumber"):
			return "Job Number: ";
			break;
		case("street"):
			return "Street: ";
			break;
		case("cityState"):
			return "City, State: ";
			break;
		case("foreman"):
			return "Foreman: ";
			break;
		case("PM"):
			return "Project Manager: ";
			break;
		case("jobDescription"):
			return "Job Description: ";
		default:
			return "Job Attribute: ";
	}
}

//for empList, returns different text for each case  
var getEmpText = function (attr) {
	switch (attr) {
		case("empFirstName"):
			return "First Name: ";
			break;
		case("empLastName"):
			return "Last Name: ";
			break;
		case("empNumber"):
			return "ID Number: ";
			break;
		case("empAddress"):
			return "Street: ";
			break;
		case("empCityState"):
			return "City, State: ";
			break;
		case("empType"):
			return "Employee Type: ";
			break;
		default:
			return "Job Attribute: ";
	}
}

//edit job information and update jobsArray
//DRY this and editEmp function and combine at some point
var selectedJob;
var editJob = function() {
	var jobs = localStorage.getArray("jobsArray");
	var ul = this.parentNode;
	jobs.forEach(function(job) {
		if(ul.id === job["jobNumber"]) {
			selectedJob = job;
		}
	})
	for(var attr in selectedJob) {
		var field = document.getElementById(attr);
		var val = selectedJob[attr];
        field.value = val;
	}
	//showForm?
	showElement(jobForm);
	showElement(jobCancel);
	showElement(jobEditSave);
	hideElement(jobSubmit);
	hideElement(jobDropList);
	showElement(viewJobs);
}

//clears children from passed in element
var clearList = function (element) {
	if (element.hasChildNodes()) {
		while (element.firstChild) 
			element.removeChild(element.firstChild);
	}
}

//submit edits, update lists
var submitJobEdits = function () {
	var editedJob = editJobFormSubmit();
	localStorage.editArrayItem("jobsArray", "jobNumber", selectedJob["jobNumber"], editedJob);
	hideElement(jobEditSave);
	hideElement(jobForm);
	//clear job list
	clearList(jobList);
	//clearList(archJobList);
	//re-populate lists
	constructUL("jobsArray", jobList, jobDropList);
	//constructUL("archivedJobs", archJobList, jobArchives);
}

//retrieves employeesArray
//repopulates employee form with selected employees information
var selectedEmployee;
var editEmp = function () {
	var employees = localStorage.getArray("employeesArray");
	var ul = this.parentNode;
	employees.forEach(function(emp) {
		if(ul.id === emp["empNumber"]) {
			selectedEmployee = emp;
		}
	})
	for(var attr in selectedEmployee) {
		var field = document.getElementById(attr);
		var val = selectedEmployee[attr];
        if(attr === 'empType') {
			field = document.getElementById(val);
			field.checked = true;
		} else if (attr === 'jobAssignment') {
			//do nothing
		} else {
			field.value = val;
		}
	}
	
	showElement(empForm);
	showElement(empEditSave);
	showElement(empCancel);
	hideElement(employeeDropdown);
	hideElement(empDropList);
	showElement(viewEmps);
	hideElement(employeeSubmit);
}

//submit edits, update list
var submitEmpEdits = function () {
	var editedEmployee = editEmpFormSubmit();
	localStorage.editArrayItem("employeesArray", "empNumber", selectedEmp["empNumber"], editedEmployee);
	hideElement(empEditSave);
	hideElement(empForm);
	//clear employee list
	clearList(empList);
	//re-populate lists
	constructEmpUL("employeesArray", empList, empDropList);
}

//create button with certain id, innerHTML, class, and callback
var createButton = function (buttonId, buttonText, buttonClass, callback) {
	var button = document.createElement('button');
	button.innerHTML = buttonText;
	button.id = buttonId;
	button.classList = buttonClass;
	button.onclick = callback;
	return button;
}

//create select element with options created based on the array passed, html sets the innerHTML of the very first option
var selectOptionCreate = function (array, html) {
	var select = document.createElement('select');
	//var parsedArray = array;
	var option = document.createElement('option');
	option.innerHTML = html;
	select.appendChild(option);
	array.forEach(function(arrayElement){
		var element = document.createElement('option');
		element.innerHTML = arrayElement;
		element.value = arrayElement;
		select.appendChild(element);
	})
	return select;
}

//create array that contains only job names
//dry this so you can use for current and archived jobs
var createJobList = function (arrayName) {
	var jobArray = [];
	var parsedArray = localStorage.getArray(arrayName);
	parsedArray.forEach(function(job){
		var name = job["jobName"];
		jobArray.push(name);
	})
	return jobArray;
}

//creates array that contains only employee names
var createEmployeeList = function (arrayName) {
	
	var empArray = [];
	var parsedArray = localStorage.getArray(arrayName);
	parsedArray.forEach(function(employee){
		var name = employee["empFirstName"] + " " + employee["empLastName"];
		empArray.push(name);
	})
	return empArray;
}

//appends created job list
var appendJobSelect = function(element, idName, arrayName) {
	var jobArray = createJobList(arrayName);
	var jobSelect = selectOptionCreate(jobArray, "Select Job");
	jobSelect.id = idName;
	element.appendChild(jobSelect);
	return jobSelect;	
}

//appends created employee list
var appendEmpSelect = function(element, idName, arrayName) {
	var empArray = createEmployeeList(arrayName);
	var empSelect = selectOptionCreate(empArray, "Select Employee");
	empSelect.id = idName;
	element.appendChild(empSelect);
	return empSelect;
}

//DRYed showSelect function for jobs and employees array
//call this function whenever a select element with all current jobs or employees is required
var showSelect = function (callback, element, func, idName, arrayName, alertMessage) {
	if (localStorage.getArray(arrayName).length < 1) {
		alert("There are no current " + alertMessage + ".");
		return;
	} else if (!element.hasChildNodes()) {
		callback(element, idName, arrayName);
	}
	//below line assumes element already exists but is hidden
	showElement(element);
	document.getElementById(idName).addEventListener("change", func);
}

//creates jobSelect
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

var showArchiveButton = function () {
	document.getElementById("finalArchive").classList.remove("hidden");
}

//shows jobSelect when user clicks archive job button
var showArchJobSelect = function () {
    showSelect(appendJobSelect, jobArchSelect, showArchiveButton, "jobSelecting", "jobsArray", "jobs");
	showElement(jobArchSelect);
	hideElement(archiveJobs);
	showElement(document.getElementById('jobArchCancel'));
}


//archives the job selected by the user
var archiveSelectedJob = function () {
	localStorage.moveArrayItem("jobsArray", "archivedJobs", filterByJobName, updateJobsArray);
	//clear lists
	clearList(jobList);
	clearList(archJobList);
	//re-populate lists
	constructUL("jobsArray", jobList, jobDropList);
	constructUL("archivedJobs", archJobList, jobArchives);
	hideElement(finalArchive);
}

//function for deleting job from localStorage array when the index is known
//used during testing when I was creating many fake job and employee entries
var erase = function () {
	console.log("deleting job...");
	localStorage.deleteItem("archivedJobs", 0);
}

/*
//
Methods that extend Storage prototype
//
*/

//returns array from localStorage when array name is known
Storage.prototype.getArray = function(arrayName) {
  var thisArray = [];
  var fetchArrayObject = this.getItem(arrayName);
  if (typeof fetchArrayObject !== 'undefined') {
    if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
  }
  return thisArray;
}

//push items to array in localStorage
Storage.prototype.pushArrayItem = function(arrayName,arrayItem) {
  var existingArray = this.getArray(arrayName);
  existingArray.push(arrayItem);
  this.setItem(arrayName,JSON.stringify(existingArray));
}

//delete a particular array item from an array in localStorage when index is known
Storage.prototype.deleteItem = function(arrayName, index) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	existingArray.splice(index, 1);
	this.setItem(arrayName, JSON.stringify(existingArray));
}

//storage method for editing employees and jobs and then saving those edits to respective arrays in localStorage
Storage.prototype.editArrayItem = function(arrayName, itemAttr, itemVal, updatedItem) {
	var updatedStorageArray = this.getArray(arrayName).map(function(item) {
		if (item[itemAttr] === itemVal) {
			return updatedItem
		} else {
			return item
		}
	})
	this.setItem(arrayName, JSON.stringify(updatedStorageArray))
};

//next three functions are helper functions for below Storage method moveArrayItem
//these are used to archive jobs and to remove employees
//would be good to DRY first two functions because they are just returning opposites from one another
var filterByJobName = function (element) {
	return element["jobName"] === document.getElementById("jobSelecting").value;

}

//if name equals jobname push to other array, return false, else return true;
var updateJobsArray = function (element) {
	return element["jobName"] !== document.getElementById("jobSelecting").value;
}

//helper function for below Storage method moveArrayItem in order to remove employees

var filterByEmployeeName = function (element) {
	//this will run on each element in employeesArray
	return (element["empFirstName"] + element["empLastName"]) === document.getElementById("selectItem").value;//change "selectItem" based on id of select item
}

//method for archiving jobs, to be used with above helper functions
Storage.prototype.moveArrayItem = function(arrayName1, arrayName2, callback1, callback2) {
	var fromArray = localStorage.getArray(arrayName1);
	var toArray = localStorage.getArray(arrayName2);
	var newArray = fromArray.filter(callback1);
	var fromArrayUpdated = fromArray.filter(callback2);//to update employees array and jobs array, maybe could call !callback, not sure?
	//return matching job and put in newArray, then push each element in newArray to toArray
	newArray.forEach(function(element) {
		toArray.push(element);
	})
	localStorage.setItem(arrayName1, JSON.stringify(fromArrayUpdated));
	localStorage.setItem(arrayName2, JSON.stringify(toArray));
	console.log(fromArrayUpdated);
	console.log(newArray);
}

var doNothing = function () {}

//check if Storage exist in browser and if so do these things on window load
window.onload = function() {
  // Check for LocalStorage support.
	if (localStorage) {
		//constructs jobs list when window is loaded, but is not visible because has class "hidden"
		constructUL("jobsArray", jobList, jobDropList);
		constructEmpUL("employeesArray", empList, empDropList);
		constructUL("archivedJobs", archJobList, jobArchives);
	}
    //Create empty jobs array in localStorage
	//Create empty employees array in localStorage
	if (localStorage && !localStorage.jobsArray) {
	  localStorage.setItem('jobsArray', JSON.stringify([]));
	}
	if (localStorage && !localStorage.employeesArray) {
	  localStorage.setItem('employeesArray', JSON.stringify([]));
    }
	if (localStorage && !localStorage.archivedJobs) {
		localStorage.setItem('archivedJobs', JSON.stringify([]));
	}
}

jobsDropdown.addEventListener("click", showJobForm);
jobSubmit.addEventListener("click", jobFormSubmit);
deleteJob.addEventListener("click", erase);
employeeDropdown.addEventListener("click", showEmpForm);
viewEmps.addEventListener("click", makeEmpUL);
viewJobs.addEventListener("click", makeJobUL);
hideJobs.addEventListener("click", hideUL);
hideArchivedJobs.addEventListener("click", hideArchUL);
hideEmployees.addEventListener("click", hideEmpUL);
employeeSubmit.addEventListener("click", empFormSubmit);
empShow.addEventListener("click", showEmpSelect);
viewEmpDist.addEventListener("click", jobsSelectList);
empDist.addEventListener("click", makeEmpList);
moveEmployee.addEventListener("click", updateEmployeeJob);
archiveJobs.addEventListener("click", showArchJobSelect);
finalArchive.addEventListener("click", archiveSelectedJob);
jobCancel.addEventListener("click", createJobCancel);
empCancel.addEventListener("click", createEmpCancel);
document.getElementById('empMoveCancel').addEventListener("click", createEmpMoveCancel);
//need to write this functionality
document.getElementById('jobArchCancel').addEventListener("click", createArchiveJobCancel);
jobEditSave.addEventListener("click", submitJobEdits);
empEditSave.addEventListener("click", submitEmpEdits);
viewArchived.addEventListener("click", makeArchJobUL);