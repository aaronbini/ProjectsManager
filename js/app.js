//Create dynamic app to help visualize and organize Berg Projects

//used this button as temp button for deleting certain jobs from jobsArray in localStorage
//remove this button at some point
var deleteJob = document.getElementsByTagName("button")[0];

//buttons
var jobsDropdown = document.getElementById("jobsDropdown");
var viewJobs = document.getElementById("viewJobs");
var hideJobs = document.getElementById("hideJobs");
var employeeDropdown = document.getElementById("addEmployee");
var jobSubmit = document.getElementById("jobSubmit");
var employeeForm = document.getElementById("employeeForm");
var employeeSubmit = document.getElementById("employeeSubmit");
var empShow = document.getElementById("empShow");
var selectEmp = document.getElementById("selectEmp");
var empMoveDrop = document.getElementById("empMoveDrop");
var jobSelect = document.getElementById("jobSelect");
var jobMoveDrop = document.getElementById("jobMoveDrop");

var jobForm = document.getElementById("jobForm");
var jobDropList = document.getElementById("jobDropList");
var jobList = document.getElementById("jobList");
var employees = document.getElementById("employees");

var jobAttrs = ["jobName", "jobNumber", "street", "cityState", "foreman", "PM", "jobDescription"] // "manPower"
//for empType, since it is radio button, need to modify setAttribute function with if statement to determine input type
var empAttrs = ["empFirstName","empLastName", "empNumber", "empAddress", "empCityState", "empType"];
var jobsArray = [];
var employeesArray = [];
var manPower = [];

//call on any element with an id to toggle any class
var classToggle = function (element, cssClass) {
	element.classList.toggle('"' + cssClass + '"');
}

//call on an element to toggle visibility
var visibilityToggle = function (element) {
	element.classList.toggle("hidden");
}

//creates form for adding new jobs
var createJobDropdown = function () {
	visibilityToggle(jobForm);
	visibilityToggle(jobsDropdown);
}

//job object is created by running reduce on the jobAttrs array, with setAttribute as the callback for reduce
//reduce runs first with empty {} as first parameter of setAttribute and the first element in the jobAttrs array as the second parameter
//newly created job is pushed to jobsArray in localStorage, and jobsArray in application (not necessary, need to change that)
//also appendJobListItem is run on newly created job so that it is immediately viewable 
var createJob = function () {
	var job = jobAttrs.reduce(setAttribute, {});
	var jobUL = document.createElement('ul');
	if (formIsValid(job)) {
		localStorage.pushArrayItem("jobsArray", job);
		jobsArray.push(job);
		jobList.appendChild(appendJobListItem(job, jobUL));
		jobDropList.appendChild(jobList);
	} else {
		//instead of alert, visibilityToggle should be run on a hard-coded html message
		//as well as in the future keeping form visible and highlighting field that needs to be filled out
		alert("There is an empty form field that must be filled out.");
	}
}

//sets object value to returned value from extractValue
 var setAttribute = function (obj, id) {
	
	obj[id] = extractValue(id);
	console.log(obj);
	
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
			if(field.length<1) {
				return false;
			}
		}
	}
	return true;
}

//when form is submitted, form is hidden, create job button is displayed
var formSubmit = function () {
	createJob();
	visibilityToggle(jobsDropdown);
	visibilityToggle(jobForm);
}

//when form is submitted, form is hidden, add employee button is displayed
var empFormSubmit = function () {
	createEmp();
	visibilityToggle(employeeForm);
	visibilityToggle(employeeDropdown);
}

//runs constructUL using jobsArray in localStorage
//changes display accordingly
var makeUL = function () {
	console.log("Jobs List...");
	if (jobsArray.length < 1) {
		//instead of alert this should be hard-coded html message that is visibility toggled
		alert("There are no jobs to view.");
		visibilityToggle(hideJobs);
	} else {
		visibilityToggle(viewJobs);
		visibilityToggle(jobDropList);
	}
}

//hides jobs list
var hideUL = function() {
	visibilityToggle(viewJobs);
	visibilityToggle(jobDropList);
}

//creates an unordered list for each job that exists using string values in jobAttrs array
//runs getText on each string value from jobAttrs and returns a certain string depending on value
var appendJobListItem = function (jobObj, ul) {
  jobAttrs.forEach(function(attr) {
    var value = jobObj[attr];
    var element = document.createElement('li');
    element.innerHTML = getText(attr) + value;
    ul.appendChild(element);
	ul.appendChild(createButton("", "Edit Job", "button-link"));
  })
  return ul;
}

//switch statement that returns a different string for each string passed to it  
var getText = function (attr) {
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

//another way to write getText function
//if jobAttrs was set up with underscores between words	
  //return attr.split('_').map(function(text) {
    //return text.toUpperCase();
  //}).join(' ') + ': ';
//}


//parses jobsArray in localStorage and constructs a jobs list from it using appendJobListItem function
//appends job list to div with id jobDropList
var constructUL = function (arrayName) {
    var parsedArray = localStorage.getArray(arrayName);
	
	for(var i = 0; i < parsedArray.length; i++) {
      var jobUL = document.createElement('ul');
      jobList.appendChild(appendJobListItem(parsedArray[i], jobUL));
	}
	jobDropList.appendChild(jobList);
}

//edit job information and update jobsArray
var editJob = function () {
	//created jobs are editable after user clicks to view list of jobs
	//when edit button is pressed job information is presented in editable inputs
	//edit button toggles to save button when user is editing
	//when save button is clicked edited user input is used to replace the contents of the job object within the jobsArray
}

//creates dropdown form for adding new employees
var createEmployeeDropdown = function () {
	visibilityToggle(employeeForm);
	visibilityToggle(employeeDropdown);
}

//modeled after createJob function, using same functions but using empAttrs instead of jobAttrs
var createEmp = function () {
	var emp = empAttrs.reduce(setAttribute, {});
	
	if (formIsValid(emp)) {
		localStorage.pushArrayItem("employeesArray", emp);
		employeesArray.push(emp);
		console.log(emp);
	} else {
		alert("There is an empty form field that must be filled out.");
	}
}

var getEmployeeSelectText = function (attr) {
	switch (attr) {
		case("empFirstName"):
			return true;
			break;
		case("empLastName"):
			return true;
			break;
		default:
			return false;
	}
 }

//not using yet, but could be used to dynamically create button
var createButton = function (buttonId, buttonText, buttonClass) {
	var button = document.createElement('button');
	button.innerHTML = buttonText;
	button.id = buttonId;
	button.className = buttonClass;
	return button;
}

var createJobList = function (array) {
	var jobArray = [];
	array.forEach(function(job){
		var name = job["jobName"];
		jobArray.push(name);
	})
	console.log(jobArray);
	return jobArray;
}

var createJobSelect = function() {
	var array = createJobList(localStorage.getArray("jobsArray"));
	var select = document.createElement('select');
	select.name = "jobs";
	select.id = "jobSelected";
	
	array.forEach(function(job){
		var element = document.createElement('option');
		element.innerHTML = job;
		element.value = job;
		select.appendChild(element);
	})
	jobMoveDrop.appendChild(createButton("selectJob", "Move Employee", "button-link"));
	return select;	
}

var createEmployeeList = function (array) {
	var empArray = [];
	for (var i = 0; i < array.length; i++) {
		var name = array[i]["empFirstName"] + " " + array[i]["empLastName"];
		empArray.push(name);
	}
	return empArray;
}

var createEmployeeSelect = function() {
	var array = createEmployeeList(localStorage.getArray("employeesArray"));
	var select = document.createElement('select');
	select.name = "employees";
	select.id = "employeeSelected";
	
	array.forEach(function(employee) {
		var element = document.createElement('option');
		element.innerHTML = employee;
		element.value = employee;
		select.appendChild(element);
	})
	empMoveDrop.appendChild(createButton("selectEmp", "Select Employee", "button-link"));
	return select;
}

var showEmpSelect = function () {
	empMoveDrop.appendChild(createEmployeeSelect());
	visibilityToggle(empShow);
	visibilityToggle(empMoveDrop);
	document.getElementById("selectEmp").addEventListener("click", showJobSelect);
}

var showJobSelect = function () {
	jobMoveDrop.appendChild(createJobSelect());
	visibilityToggle(jobSelect);
	visibilityToggle(jobMoveDrop);
	document.getElementById("selectJob").addEventListener("click", updateEmployeeJob);
}

var updateEmployeeJob = function () {
	var array = localStorage.getArray("employeesArray");
	var array2 = localStorage.getArray("jobsArray");
	
	var emp = document.getElementById("employeeSelected").value;
	var job = document.getElementById("jobSelected").value;
	//iterate through employees, if name matches emp, and if employee job key is either empty or does not equal job
	//push job to that employee[job] within employeesArray
	array.forEach(function(employee){
		if(employee["empFirstName"] + " " + employee["empLastName"] === emp && employee["jobAssignment"] === job) {
			alert(emp + " is already assigned to that job.");
		} else if (employee["empFirstName"] + " " + employee["empLastName"] === emp) {
			employee["jobAssignment"] = job;
			alert(emp + " has been successfully moved to " + job);
		}
	})
	localStorage.setItem("employeesArray", JSON.stringify(array));
	console.log("Move employee: " + emp + " to " + job);
}

var jobCheckbox = function () {
	//iterate through jobsArray, return checkbox with jobName as value and innerHTML
	//change this to a series of radio buttons for each job, that way only one can be chosen
}

var viewManPower = function (array) {
	empsOnJob = [];
	//call jobCheckbox, var checked = jobCheckbox.checked.value or something like that
	//var job = jobCheckbox.selected.value (radio button)
	array.forEach(function(employee){
		//if jobName matches employee jobAssignment
		if (employee["jobAssignment"] === /*checked job value (var job)*/) {
			empsOnJob.push(employee["empFirstName"] + " " + employee["empLastName"]);
		} else {
			alert("There are no employees on that job.");
		}
	})
	return empsOnJob;
	//call this within a function that creates list of these employees to display
}

var filterByName = function () {
		for (var i =0; i < existingArray.length; i++)
		   if (existingArray[i]['name'] === document.getElementById("listName").innerHTML) { //innerHTML of list item would = "Job Name: " + job[i][name] 
																							 //so this needs to be modified
			  //var str = "Hello world, welcome to the universe.";
			  //var n = str.indexOf("welcome"); 
			  // if str.indexOf(n) != -1
			  //before returning false, push this item to archivedJobs;
			  newArray.push(existingArray[i]);
			  return false;
		   } else {
			   return true;
		   }
	}

//function for deleting job from localStorage jobsArray when the index is known
//used during testing when I was creating many fake job entries
var erase = function () {
	console.log("deleting job...");
	localStorage.deleteItem("employeesArray", 0);
}
			
//Create and edit an Employee object
	//Attributes of the Employee object (all dynamically created based on user input)
		//Name - Static
		//Status - AP, JW, FM, MH
		//Current job

//Create and edit an Employee array
	//This will contain all current field employees
	
//Manpower array
	//When new employee is created, employee is dynamically added to both employee array and manpower array?
	//array of arrays - each job will be an array, containing all the employees that are on that job

	
//Methods that extend Storage prototype
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

//delete an array item if the job name matches substring within job name in "listName"
//function needs work but is important for base functionality
//job needs to be deleted but also appended to archivedJobs array
//this may involve deleting, or running .filter, .map, or other array method
Storage.prototype.moveArrayItem = function(arrayName1, arrayName2, arrayItem) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName1);
	var newArray = this.getArray(arrayName2);
	//extract this helper function and just call it in this Storage method
	function filterByName () {
		for (var i =0; i < existingArray.length; i++)
		   if (existingArray[i]['name'] === document.getElementById("listName").innerHTML) { //innerHTML of list item would = "Job Name: " + job[i][name] 
																							 //so this needs to be modified
			  //var str = "Hello world, welcome to the universe.";
			  //var n = str.indexOf("welcome"); 
			  // if str.indexOf(n) != -1
			  //before returning false, push this item to archivedJobs;
			  newArray.push(existingArray[i]);
			  return false;
		   } else {
			   return true;
		   }
	}
	
	existingArray.filter(filterByName);
	this.setItem(arrayName,JSON.stringify(existingArray));
}

//check if Storage exist in browser and if so 
window.onload = function() {
  // Check for LocalStorage support.
	if (localStorage) {
		//below two lines are not necessary, functionality works everything through local storage arrays
		jobsArray = localStorage.getArray("jobsArray");
		employeesArray = localStorage.getArray("employeesArray");
	}
	//constructs jobs list when window is loaded, but is not visible because has class "hidden"
	constructUL("jobsArray");	
    //Create empty jobs array in localStorage
	//Create empty employees array in localStorage
	if (localStorage && !localStorage.jobsArray) {
	  localStorage.setItem('jobsArray', JSON.stringify(jobsArray));
	}
	if (localStorage && !localStorage.employeesArray) {
	  localStorage.setItem('employeesArray', JSON.stringify(employeesArray));
    }
}

jobsDropdown.addEventListener("click", createJobDropdown);
jobSubmit.addEventListener("click", formSubmit);
deleteJob.addEventListener("click", erase);
employeeDropdown.addEventListener("click", createEmployeeDropdown);
viewJobs.addEventListener("click", makeUL);
hideJobs.addEventListener("click", hideUL);
employeeSubmit.addEventListener("click", empFormSubmit);
empShow.addEventListener("click", showEmpSelect); 
//selectEmp.addEventListener("click", moveEmployee);
