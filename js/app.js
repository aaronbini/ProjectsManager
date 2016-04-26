//Create dynamic app to help visualize and organize Berg Projects

//used this button as temp button for deleting certain jobs from jobsArray in localStorage
//remove this button at some point
var deleteJob = document.getElementsByTagName("button")[0];

//global vars
var empTest = document.getElementById("empTest");
var jobsDropdown = document.getElementById("jobsDropdown");
var viewJobs = document.getElementById("viewJobs");
var hideJobs = document.getElementById("hideJobs");
var employeeDropdown = document.getElementById("addEmployee");
var jobSubmit = document.getElementById("jobSubmit");
var employeeForm = document.getElementById("employeeForm");
var employeeSubmit = document.getElementById("employeeSubmit");

var jobForm = document.getElementById("jobForm");
var jobDropList = document.getElementById("jobDropList");
var jobList = document.getElementById("jobList");
var employeese = document.getElementById("employeese");

var jobAttrs = ["jobName", "jobNumber", "street", "cityState", "foreman", "PM", "jobDescription"] // "manPower"
//for empType, since it is radio button, need to modify setAttribute function with if statement to determine input type
var empAttrs = ["empFirstName","empLastName", "empNumber", "empAddress", "empCityState", "empType"];
var jobsArray = [];
var employeesArray = [];
var manPower = [];

//call on any element with id to toggle any class
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

var createJob = function () {
	var job = jobAttrs.reduce(setAttribute, {});
	var jobUL = document.createElement('ul');
	if (formIsValid(job)) {
		localStorage.pushArrayItem("jobsArray", job);
		jobsArray.push(job);
		jobList.appendChild(appendJobListItem(job, jobUL));
		jobDropList.appendChild(jobList);
	} else {
		alert("There is an empty form field that must be filled out.");
	}
}

 var setAttribute = function (obj, id) {
	
	obj[id] = extractValue(id);
	console.log(obj);
	
	return obj;
}

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

var appendJobListItem = function (jobObj, ul) {
  jobAttrs.forEach(function(attr) {
    var value = jobObj[attr];
    var element = document.createElement('li');
    element.innerHTML = getText(attr) + value;
    ul.appendChild(element);
  })
  return ul;
}
  
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
  //return attr.split('_').map(function(text) {
    //return text.toUpperCase();
  //}).join(' ') + ': ';
//}


//parses jobsArray in localStorage and constructs a jobs list
var constructUL = function (array) {
    var parsedArray = localStorage.getArray("jobsArray");
	
	for(var i = 0; i < parsedArray.length; i++) {
      var jobUL = document.createElement('ul');
      jobList.appendChild(appendJobListItem(parsedArray[i], jobUL));
	}
	jobDropList.appendChild(jobList);
}

var editJob = function () {
	//created jobs are editable after user clicks to view list of jobs
	//when edit button is pressed job information is presented in editable inputs
	//edit button toggles to save button when user is editing
	//when save button is clicked edited user input is used to replace the contents of the job object within the jobsArray
}

var editJobsArray = function () {
	//Delete or Archive Individual Jobs
}

//creates dropdown form for adding new employees
var createEmployeeDropdown = function () {
	visibilityToggle(employeeForm);
	visibilityToggle(employeeDropdown);
}

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
	console.log(array);
	var select = document.createElement('select');
	array.forEach(function(employee) {
		var element = document.createElement('option');
		element.innerHTML = employee;
		select.appendChild(element);
	})
	return select;
}

var showSelect = function () {
	employeese.appendChild(createEmployeeSelect());
}

var moveEmployee = function () {
	
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
Storage.prototype.deleteArrayItem = function(arrayName, arrayItem) {
	var arrayItem = {};
	var existingArray = this.getArray(arrayName);
	function filterByName () {
		for (var i =0; i < existingArray.length; i++)
		   if (existingArray[i]['name'] === document.getElementById("listName").innerHTML) { //innerHTML of list item would = "Job Name: " + job[i][name] 
																							 //so this needs to be modified
			  //var str = "Hello world, welcome to the universe.";
			  //var n = str.indexOf("welcome"); 
			  // if str.indexOf(n) != -1
			  return false;
		   } else {
			   return true;
		   }
	}
	
	existingArray.filter(filterByName);
	this.setItem(arrayName,JSON.stringify(existingArray));
}

window.onload = function() {
  // Check for LocalStorage support.
	if (localStorage) {
		jobsArray = localStorage.getArray("jobsArray");
		employeesArray = localStorage.getArray("employeesArray");
	}
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
empTest.addEventListener("click", showSelect); 

