//Create dynamic app to help visualize and organize Berg Projects

//idea: extend localStorage object to include a jobs array, and an employees array - check
//on new job form submit, create a new jobs object, and push it to the localStorage.jobsArray - check
//on new employee form submit, create a new employee object, and push it to the localStorage.employeesArray
//don't forget to JSON.stringify to push to localStorage, and JSON.parse to pull from localStorage - check


//used this button as temp button for deleting certain jobs from jobsArray in localStorage
//remove this button at some point
//var deleteJob = document.getElementsByTagName("button")[0];
//global vars
//page buttons
var jobsDropdown = document.getElementsByTagName("button")[1]; //second button
var viewJobs = document.getElementsByTagName("button")[2]; //third button
var hideJobs = document.getElementsByTagName("button")[3];//fourth button
var employeeDropdown = document.getElementsByTagName("button")[4];//fifth button

var jobForm = document.getElementById("jobForm");
var jobDropList = document.getElementById("jobDropList");
var jobsArray = [];
var employeesArray = [];
var manPower = [];
var job = {};

//creates form for adding new jobs
//should switch this to hardcoded html with display that toggles between none and inline
var createJobDropdown = function () {
	console.log("Create job dropdown...");
	
		//Job Name
		var jobName = document.createElement("input"); //text
		//Job Number
		var jobNumber = document.createElement("input");//text
		//Street Address
		var street = document.createElement("input");//text
		//City, State
		var cityState = document.createElement("input"); //text
		//Foreman
		var foreman = document.createElement("input"); //text
		//Project Manager
		var projectManager = document.createElement("input"); //text
		//Job Description
		var jobDescription = document.createElement("textarea"); //textarea
		//labels and submit button
		var nameLabel = document.createElement("label");
		var numberLabel = document.createElement("label");
		var streetLabel = document.createElement("label");
		var cityStateLabel = document.createElement("label");
		var foremanLabel = document.createElement("label");
		var PMLabel = document.createElement("label");
		var JDLabel = document.createElement("label");
		var submit = document.createElement("button");
			
		//each element needs to be modified
		jobName.type = "text";
		jobName.id = "jobName";
		nameLabel.setAttribute("for", "jobName");
		nameLabel.innerHTML = "Job Name: ";
		jobNumber.type = "text";
		jobNumber.id = "jobNumber";
		numberLabel.setAttribute("for", "jobNumber");
		numberLabel.innerHTML = "Job Number: ";
		street.type = "text";
		street.id = "street";
		streetLabel.setAttribute("for", "street");
		streetLabel.innerHTML = "Street Address: ";
		cityState.type = "text";
		cityState.id = "cityState";
		cityStateLabel.setAttribute("for", "cityState");
		cityStateLabel.innerHTML = "City, State: ";
		foreman.type = "text";
		foreman.id = "foreman";
		foremanLabel.setAttribute("for", "foreman");
		foremanLabel.innerHTML = "Foreman Name: ";
		projectManager.type = "text";
		projectManager.id = "PM"
		PMLabel.setAttribute("for", "PM");
		PMLabel.innerHTML = "PM Name: ";
		jobDescription.id = "jobDescription";
		JDLabel.setAttribute("for", "jobDescription");
		JDLabel.innerHTML = "Job Description: ";
		submit.type = "submit";
		submit.innerHTML = "Add Job";
		submit.id = "jobSubmit";
		submit.className = "button-link";
			
		//each element needs to be appended
		jobForm.appendChild(nameLabel);
		jobForm.appendChild(jobName);
		jobForm.appendChild(jobNumber);
		jobForm.appendChild(numberLabel);
		jobForm.appendChild(streetLabel);
		jobForm.appendChild(street);
		jobForm.appendChild(cityState);
		jobForm.appendChild(cityStateLabel);
		jobForm.appendChild(foreman);
		jobForm.appendChild(foremanLabel);
		jobForm.appendChild(projectManager);
		jobForm.appendChild(PMLabel);
		jobForm.appendChild(jobDescription);
		jobForm.appendChild(JDLabel);
		jobForm.appendChild(submit);
		jobsDropdown.style.display = 'none';
		jobForm.style.display = 'inline';
			
	return jobForm;
}

//create new job object based on user input
//push job to jobsArray in localStorage
var createJob = function () {
	job.name = document.getElementById("jobName").value;
	job.number = document.getElementById("jobNumber").value;
	job.street = document.getElementById("street").value;
	job.cityState = document.getElementById("cityState").value;
	job.foreman = document.getElementById("foreman").value;
	job.pm = document.getElementById("PM").value;
	job.description = document.getElementById("jobDescription").value;
	job.manPower = manPower;
	if (job.name == '' || job.number == '' || job.street == '' || job.cityState == '' || job.foreman == '' || job.pm == '' || job.description == '') {
		alert("There is an empty form field that must be filled out.");
		//return false;
	} else {
		localStorage.pushArrayItem("jobsArray", job);
		return job;
	}
}

//add event listener to jobSubmit button when create job button is clicked and jobSubmit button is created
var submitListen = function () {
	document.getElementById("jobSubmit").addEventListener("click", formSubmit);
}

//when form is submitted, form is hidden, create job button is displayed, form is hidden
var formSubmit = function () {
	createJob();
	//localStorage.pushArrayItem("jobsArray", job);
	jobsDropdown.style.display = 'inline';
	jobForm.style.display = 'none';
}

//runs constructUL using jobsArray in localStorage
//changes display accordingly
var makeUL = function () {
	console.log("Jobs List...");
	constructUL("jobsArray");
	jobDropList.appendChild(jobList);
	//need to hide view jobs button and create hide jobs button which when clicked hides jobs list, itself, and makes view jobs button visible
	viewJobs.style.display = 'none';
	hideJobs.style.display = 'inline';
	jobDropList.style.display = 'inline';
	
}

//hides jobs list
var hideUL = function() {
	hideJobs.style.display = 'none';
	viewJobs.style.display = 'inline';
	jobDropList.style.display = 'none';
}

var jobList = document.createElement('ul');

//parses jobsArray in localStorage and constructs a jobs list	
var constructUL = function (array) {
    //need to add if statement to alert when there are no jobs in jobsArray
	//parse localStorage array
    var parsedArray = localStorage.getArray(array);
	if (!jobList.hasChildNodes()) {
		for(var i = 0; i < parsedArray.length; i++) {
			// Create the list item
			//first make job["name"] the innerHTML of an h1
			//then make foreach loop that runs through each object and creates a list item
			//list item for each job attribute
			var job = document.createElement('ul');
			//var name = parsedArray[i]["name"];
			//var number = parsedArray[i]["number"];
			//var street = parsedArray[i]["street"];
			//var cityState = parsedArray[i]["cityState"];
			//var foreman = parsedArray[i]["foreman"];
			//var pm = parsedArray[i]["pm"];
			//var description = parsedArray[i]["description"];
			var edit = document.createElement("button");
			var nameLI = document.createElement('li');
			var numberLI = document.createElement('li');
			var streetLI = document.createElement('li');
			var cityStateLI = document.createElement('li');
			var foremanLI = document.createElement('li');
			var pmLI = document.createElement('li');
			var descriptionLI = document.createElement('li');
			nameLI.innerHTML = "Name:  " + parsedArray[i]["name"];
			numberLI.innerHTML = "Job Number:  " + parsedArray[i]["number"];
			streetLI.innerHTML = "Street:  " + parsedArray[i]["street"];
			cityStateLI.innerHTML = "City, State:  " + parsedArray[i]["cityState"];
			foremanLI.innerHTML = "Foreman:  " + parsedArray[i]["foreman"];
			pmLI.innerHTML = "Project Manager:  " + parsedArray[i]["pm"];
			descriptionLI.innerHTML = "Job Description:  " + parsedArray[i]["description"];
			edit.type = "submit";
			edit.innerHTML = "Edit Job";
			edit.id = "editJob";
			edit.className = "button-link";
			// Set its contents:
			job.appendChild(nameLI);
			job.appendChild(numberLI);
			job.appendChild(streetLI);
			job.appendChild(cityStateLI);
			job.appendChild(foremanLI);
			job.appendChild(pmLI);
			job.appendChild(descriptionLI);
			job.appendChild(edit);
			// Add it to the list:
			jobList.appendChild(job);
		}
	} else {
	viewJobs.style.display = 'none';
	hideJobs.style.display = 'inline';
	//Return the constructed jobList:
    return jobList;
	}
}

var editJob = function () {
	//created jobs are editable after user clicks to view list of jobs
	//when edit button is pressed job information is presented in editable inputs
	//edit button toggles to save button when user is editing
	//when save button is clicked edited user input is used to replace the contents of the job object within the jobsArray
}

//Edit jobs array
var editJobsArray = function () {
	//Add, Edit, Delete Individual Jobs
	//
}

//creates dropdown form for adding new employees
var createEmployeeDropdown = function () {
	
	document.getElementById("employeeForm").style.display = 'inline';
	employeeDropdown.style.display = 'none';
}

//function for deleting job from localStorage jobsArray when the index is known
//used during testing when I was creating many fake job entries
var erase = function () {
	console.log("deleting job...");
	localStorage.deleteItem("jobsArray", 4);
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

	
//Methods to bolster Storage prototype
//add method to localStorage prototype that returns array to be used with next method that pushes items to the array
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
		   if (existingArray[i]['name'] === document.getElementById("listName").innerHTML) { //innerHTML of list item would = "Job Name: " + job[i][name] so this needs to be modified
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

/* window.onload = function() {
  // Check for LocalStorage support.
      //Create empty jobs array in localStorage
	  //Create empty employees array in localStorage
	if (localStorage && !localStorage.jobsArray) {
	  localStorage.setItem('jobsArray', JSON.stringify(jobsArray));
	}
	if (localStorage && !localStorage.employeesArray) {
	  localStorage.setItem('employeesArray', JSON.stringify(employeesArray));
    }
} */

jobsDropdown.addEventListener("click", createJobDropdown);
jobsDropdown.addEventListener("click", submitListen);
deleteJob.addEventListener("click", erase);
employeeDropdown.addEventListener("click", createEmployeeDropdown);
//viewJobs.addEventListener("click", makeUL);
