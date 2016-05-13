/*
//job functionality
*/

/*
//job buttons
*/

//used this button as temp button for deleting certain jobs from jobsArray in localStorage
//remove this button at some point
var deleteJob = document.getElementsByTagName("button")[0];

var jobsDropdown = document.getElementById("jobsDropdown");
var viewJobs = document.getElementById("viewJobs");
var viewArchived = document.getElementById("viewArchived");
var hideJobs = document.getElementById("hideJobs");
var hideArchivedJobs = document.getElementById('hideArchivedJobs');
var jobSubmit = document.getElementById("jobSubmit");
var jobCancel = document.getElementById('jobCancel');
var jobArchives = document.getElementById("jobArchives");
var archiveJobs = document.getElementById("archiveJobs");
var finalArchive = document.getElementById("finalArchive");
var jobEditSave = document.getElementById("jobEditSave");
var jobForm = document.getElementById("jobCreateForm");
var jobDropList = document.getElementById("jobDropList");
var jobList = document.getElementById("jobList");
var jobArchSelect = document.getElementById("jobArchSelect");
var archJobList = document.getElementById('archJobList');


//jobAttrs array used to construct job objects using reduce
var jobAttrs = ["jobName", "jobNumber", "street", "cityState", "foreman", "PM", "jobDescription"];

//newly created job is pushed to jobsArray in localStorage
var createJob = function (job) {
	var jobUL = document.createElement('ul');
	localStorage.pushArrayItem("jobsArray", job);
	jobList.appendChild(appendJobListItem(job, jobUL));
	jobDropList.appendChild(jobList);
	updateJobSelects();
}

//submit job form
var jobFormSubmit = function () {
	return formSubmit(event, jobAttrs, createJob, hideJobForm, jobsDropdown, viewJobs, jobForm, jobCancel); 
}
//submit edited job
var editJobFormSubmit = function () {
	return formSubmit(event, jobAttrs, doNothing, hideJobForm, jobsDropdown, viewJobs, jobForm, jobCancel);
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
//cancel job archiving
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

//functions for displaying jobs and employees
var makeJobUL = function () {
	makeUL("jobsArray", "jobs", hideJobs, viewJobs, jobDropList);
}

var makeArchJobUL = function () {
	//need to create some of these elements
	makeUL("archivedJobs", "archived jobs", hideArchivedJobs, viewArchived, jobArchives);
}

//hides jobs list
var hideUL = function() {
	showElement(viewJobs);
	hideElement(jobDropList);
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
	ul.appendChild(createButton("", "Edit Job", "btn btn-primary", editJob));
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
	showElement(jobForm);
	showElement(jobCancel);
	showElement(jobEditSave);
	hideElement(jobSubmit);
	hideElement(jobDropList);
	showElement(viewJobs);
}

//submit edits, update lists
var submitJobEdits = function () {
	var editedJob = editJobFormSubmit();
	localStorage.editArrayItem("jobsArray", "jobNumber", selectedJob["jobNumber"], editedJob);
	hideElement(jobEditSave);
	clearList(jobList);
	constructUL("jobsArray", jobList, jobDropList);
	updateJobSelects();
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

//appends created job list
var appendJobSelect = function(element, idName, arrayName) {
	var jobArray = createJobList(arrayName);
	var jobSelect = selectOptionCreate(jobArray, "Select Job");
	jobSelect.id = idName;
	element.appendChild(jobSelect);
	return jobSelect;	
}

//when creating new job and archiving a job
//jobSelects must be updated without refresh
//so this would be element jobMoveDrop, with select of id "jobSelected"
//element jobArchSelect, with select of id "jobSelecting"
//element jobEmpViewDrop, with select of id jobSelector"

//updates job selects when called
//call this when submitting form for new job, after editing a job, and after archiving a job
//these functions are: submitJobEdits, archiveSelectedJob, createJob
var updateJobSelects = function () {
	clearList(jobMoveDrop);
	clearList(jobEmpViewDrop);
	clearList(jobArchSelect);
	appendJobSelect(jobMoveDrop, "jobSelected", "jobsArray");
	appendJobSelect(jobEmpViewDrop, "jobSelector", "jobsArray");
	appendJobSelect(jobArchSelect, "jobSelecting", "jobsArray");
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
	alert("Job successfully archived.");
	//clear lists
	clearList(jobList);
	clearList(archJobList);
	//re-populate lists
	constructUL("jobsArray", jobList, jobDropList);
	constructUL("archivedJobs", archJobList, jobArchives);
	showElement(archiveJobs);
	hideElement(jobArchCancel);
	hideElement(finalArchive);
	hideElement(jobArchSelect);
	updateJobSelects();
}

//job event listeners
jobsDropdown.addEventListener("click", showJobForm);
jobSubmit.addEventListener("click", jobFormSubmit);
deleteJob.addEventListener("click", erase);
viewJobs.addEventListener("click", makeJobUL);
hideJobs.addEventListener("click", hideUL);
hideArchivedJobs.addEventListener("click", hideArchUL);
archiveJobs.addEventListener("click", showArchJobSelect);
finalArchive.addEventListener("click", archiveSelectedJob);
jobCancel.addEventListener("click", createJobCancel);
document.getElementById('jobArchCancel').addEventListener("click", createArchiveJobCancel);
jobEditSave.addEventListener("click", submitJobEdits);
viewArchived.addEventListener("click", makeArchJobUL);






