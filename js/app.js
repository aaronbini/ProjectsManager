//Create dynamic app to help visualize and organize ongoing construction projects for made-up electrical contractor

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
var jobMoveDrop = document.getElementById("jobMoveDrop");
var updateEmpJob = document.getElementById("updateEmpJob");
var viewEmpDist = document.getElementById("viewEmpDist");
var empDist = document.getElementById("empDist");
var jobArchives = document.getElementById("jobArchives");
var archiveJobs = document.getElementById("archiveJobs");
var finalArchive = document.getElementById("finalArchive");

var jobForm = document.getElementById("jobForm");
var jobDropList = document.getElementById("jobDropList");
var jobList = document.getElementById("jobList");
var employees = document.getElementById("employees");

var jobAttrs = ["jobName", "jobNumber", "street", "cityState", "foreman", "PM", "jobDescription"];
var empAttrs = ["empFirstName","empLastName", "empNumber", "empAddress", "empCityState", "empType"];

//call on any element with an id to toggle any class
var classToggle = function (element, cssClass) {
	element.classList.toggle(cssClass);
}

//call on an element to toggle display: hidden
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
//newly created job is pushed to jobsArray in localStorage
//also appendJobListItem is run on newly created job so that it is immediately viewable 
var createJob = function () {
	var job = jobAttrs.reduce(setAttribute, {});
	var jobUL = document.createElement('ul');
	if (formIsValid(job)) {
		console.log("Form is Valid");
		localStorage.pushArrayItem("jobsArray", job);
		//jobsArray.push(job);
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

//form validation is not currently working, need to troubleshoot
//form validation returns false if a field is empty
 var formIsValid = function (obj) {
	for(var field in obj) {
		if(obj.hasOwnProperty(field)) {
			if(field.length === 0) {
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
	//reset only works on html forms, need to troubleshoot this
	//jobForm.reset();
}

//when form is submitted, form is hidden and reset, add employee button is displayed
var empFormSubmit = function () {
	createEmp();
	visibilityToggle(employeeForm);
	visibilityToggle(employeeDropdown);
	document.getElementById("employeeCreateForm").reset();
	
}

//changes form display to show job add form
var makeUL = function () {
	console.log("Jobs List...");
	if (localStorage.getArray("jobsArray").length < 1) {
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

//creates an unordered list for each current job using string values in jobAttrs array
//runs getText on each string value from jobAttrs and returns a certain string depending on value
var appendJobListItem = function (jobObj, ul) {
  jobAttrs.forEach(function(attr) {
    var attribute = getText(attr);
	var value = jobObj[attr];
	var label = document.createElement('label');
    var element = document.createElement('li');
	var br = document.createElement('br');
	element.innerHTML = /*getText(attr) + */ value;
	label.innerHTML = attribute;
	//label.appendChild(element);
    ul.appendChild(label);
	ul.appendChild(element);
	ul.appendChild(br);
  })
  ul.appendChild(createButton("", "Edit Job", "button-link edit"));
  return ul;
}

//parses jobsArray in localStorage and constructs a jobs list from it using appendJobListItem function
//appends job list element in argument list (this must be a javascript variable set to an element with particular id
var constructUL = function (arrayName, list, element) {
    var parsedArray = localStorage.getArray(arrayName);
	
	for(var i = 0; i < parsedArray.length; i++) {
      var jobUL = document.createElement('ul');
      list.appendChild(appendJobListItem(parsedArray[i], jobUL));
	}
	element.appendChild(list);
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

//use splice to remove job object from array

//add data-attribute to edit button that has job id for that particular job
//onclick on the edit button, pass data attribute to function that is called onclick
//function then finds job with that job id and 
//data-attribute

//edit job information and update jobsArray
var editJob = function () {
	console.log("edit button functional");
	//look at unordered list, forEach list item within ul, split at the colon and text to the right of the colon becomes text input
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
		//employeesArray.push(emp);
		console.log(emp);
	} else {
		alert("There is an empty form field that must be filled out.");
	}
}

//create button with certain id, innerHTML, and class
var createButton = function (buttonId, buttonText, buttonClass) {
	var button = document.createElement('button');
	button.innerHTML = buttonText;
	button.id = buttonId;
	button.className = buttonClass;
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

//create array that contains only employee names
//could be dryed and combined with previous 2 functions in order to create an array of names from any array containing objects with key of "name"
var createEmployeeList = function (arrayName) {
	
	var empArray = [];
	var parsedArray = localStorage.getArray(arrayName);
	parsedArray.forEach(function(employee){
		var name = employee["empFirstName"] + " " + employee["empLastName"];
		empArray.push(name);
	})
	return empArray;
}

var appendJobSelect = function(element, idName, arrayName) {
	var jobArray = createJobList(arrayName);
	var jobSelect = selectOptionCreate(jobArray, "Select Job");
	jobSelect.id = idName;
	element.appendChild(jobSelect);
	return jobSelect;	
}

var appendEmpSelect = function(element, idName, arrayName) {
	var empArray = createEmployeeList(arrayName);
	var empSelect = selectOptionCreate(empArray, "Select Employee");
	empSelect.id = idName;
	element.appendChild(empSelect);
	return empSelect;
}

//this is the function that is called to show job select dropdown, DRYed in order to create this list in multiple locations
//can be used for archivedJobs array, but not employees array yet
//has to be called inside helper function(below showJobSelectFinal) because otherwise it runs when showEmpSelect is run?
var showJobSelect = function (element, func, idName, arrayName) {
	if (localStorage.getArray(arrayName).length < 1) {
		alert("There are no current jobs.");
		return;
	} else if (!element.hasChildNodes()) {
		appendJobSelect(element, idName, arrayName);
	}
	//below line assumes element already exists but is hidden
	element.classList.remove("hiddenButPresent");
	document.getElementById(idName).addEventListener("change", func);
}

var showJobSelectFinal = function () {
	showJobSelect(jobMoveDrop, showMoveEmp, "jobSelected", "jobsArray");
}

var showEmpSelect = function (element, func, idName, arrayName) {
	if (localStorage.getArray(arrayName).length < 1) {
		alert("There are no current jobs.");
		return;
	} else if (!element.hasChildNodes()) {
		appendEmpSelect(element, idName, arrayName);
	}
	visibilityToggle(empShow);
	//below line assumes element already exists but is hidden
	element.classList.remove("hiddenButPresent");
	document.getElementById(idName).addEventListener("change", func);
}

var showEmpSelectFinal = function () {
	showEmpSelect(empMoveDrop, showJobSelectFinal, "employeeSelected", "employeesArray");
}

var showMoveEmp = function () {
	updateEmpJob.classList.remove("hidden");
}

var updateEmployeeJob = function () {
	
	var array = localStorage.getArray("employeesArray");
	var array2 = localStorage.getArray("jobsArray");
	//set a data-attr attribute equal to JSON.stringify (employee object), then JSON.parse
	//document.getElementById("employeeSelected").value.getAttribute
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
	visibilityToggle(empShow);
	empMoveDrop.classList.add("hiddenButPresent");
	jobMoveDrop.classList.add("hiddenButPresent");
	updateEmpJob.classList.add("hidden");
	document.getElementById('employeeSelected').selectedIndex = 0;
	document.getElementById('jobSelected').selectedIndex = 0;
}

var showDistEmp = function () {
	empDist.classList.remove("hidden");
}

//create another job list when viewEmpDist button is clicked
//when job is selected ("onchange"), remove hidden class from another button
//when that button is clicked, run function that creates list of all employees on the selected job (emp name and empType)
//and then turns that list into html ul with employee list elements

//runs showJobSelect, creating a select element with all current jobs
var jobsSelectList = function () {
	console.log("jobs list...");
	showJobSelect(jobEmpViewDrop, showDistEmp, "jobSelector", "jobsArray");
	visibilityToggle(jobEmpViewDrop);
	visibilityToggle(viewEmpDist);
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
		visibilityToggle(document.getElementById("hideEmps"));
		visibilityToggle(document.getElementById("jobEmpViewDrop"));
		visibilityToggle(empDist);
		visibilityToggle(document.getElementById("viewEmpsOnJob"));
	}
}

//clear employees on job list and reset views
var hideEmpsOnJob = function () {
	var element = document.getElementById("viewEmpsOnJob");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	visibilityToggle(viewEmpDist);
	visibilityToggle(document.getElementById("hideEmps"));
	visibilityToggle(viewEmpsOnJob);
}

//create jobSelect list and add "onchange" event listener to the list
//once job is selected, make "archive job" button visible, which will have event listener attached
//this event listener should run the Storage move array item method in order to move job to archivedJobs array
//needs to also update jobsArray
var showArchiveButton = function () {
	document.getElementById("finalArchive").classList.remove("hidden");
}

var jobsSelectArchive = function () {
	console.log("jobs archive list...");
	showJobSelect(jobArchives, showArchiveButton, "jobSelecting", "jobsArray");
	visibilityToggle(jobArchives);
	visibilityToggle(archiveJobs);
}

var archiveSelectedJob = function () {
	localStorage.moveArrayItem("jobsArray", "archivedJobs", filterByJobName, updateJobsArray);
	constructUL("jobsArray", jobList, jobDropList);
	
	//need to un-append archived job from the jobDropList that is viewable when "View Jobs" is clicked
}


//next three functions are helper functions for below Storage method moveArrayItem
//these are used to archive jobs and to remove employees
//would be good to DRY first two functions because they are just returning opposites from one another
var filterByJobName = function (element) {
	//this will run on each element in jobsArray
	return element["jobName"] === document.getElementById("jobSelecting").value;//change "selectItem based on the id of the select item
}

//if name equals jobname push to other array, return false, else return true;

var updateJobsArray = function (element) {
	return element["jobName"] !== document.getElementById("jobSelecting").value;
}

//helper function for below Storage method moveArrayItem
//would be good to DRY this function and filterByJobName, how to do this?
var filterByEmployeeName = function (element) {
	//this will run on each element in employeesArray
	return (element["empFirstName"] + element["empLastName"]) === document.getElementById("selectItem").value;//change "selectItem" based on id of select item
}

//function for deleting job from localStorage array when the index is known
//used during testing when I was creating many fake job and employee entries
var erase = function () {
	console.log("deleting job...");
	localStorage.deleteItem("jobsArray", 4);
}
			
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



//move an array item if the name matches select.value
//this does not update current array, may have to create another Storage method that uses reduce to 
//job needs to be deleted but also appended to archivedJobs array
//this may involve deleting, or running .filter, .map, or other array method
Storage.prototype.moveArrayItem = function(arrayName1, arrayName2, callback1, callback2) {
	var fromArray = localStorage.getArray(arrayName1);
	var toArray = localStorage.getArray(arrayName2);
	var newArray = fromArray.filter(callback1);
	var fromArrayUpdated = fromArray.filter(callback2);//to update employees array and jobs array, maybe could call !callback, not sure?
	//return matching job and put in newArray, then push each element in newArray to toArray
	newArray.forEach(function(element) {
		toArray.push(JSON.stringify(element));
	})
	localStorage.setItem(arrayName1, JSON.stringify(fromArrayUpdated));
	console.log(fromArrayUpdated);
	console.log(newArray);
}

//check if Storage exist in browser and if so do these things on window load
window.onload = function() {
  // Check for LocalStorage support.
	if (localStorage) {
		//constructs jobs list when window is loaded, but is not visible because has class "hidden"
		constructUL("jobsArray", jobList, jobDropList);
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

jobsDropdown.addEventListener("click", createJobDropdown);
jobSubmit.addEventListener("click", formSubmit);
deleteJob.addEventListener("click", erase);
employeeDropdown.addEventListener("click", createEmployeeDropdown);
viewJobs.addEventListener("click", makeUL);
hideJobs.addEventListener("click", hideUL);
employeeSubmit.addEventListener("click", empFormSubmit);
empShow.addEventListener("click", showEmpSelectFinal);
viewEmpDist.addEventListener("click", jobsSelectList);
empDist.addEventListener("click", makeEmpList);
document.getElementById("moveEmployee").addEventListener("click", updateEmployeeJob);
archiveJobs.addEventListener("click", jobsSelectArchive);
finalArchive.addEventListener("click", archiveSelectedJob);
jobList.addEventListener("click", editJob);

