//attempt at DRY code
//use to replace lines 252 to 316

var selectCreate = function (name, id) {
	var select = document.createElement('select');
	select.name = name;
	select.id = id;
	return select;
}

var optionCreate = function (array, select) {
	array.forEach(function(arrayElement){
		var element = document.createElement('option');
		element.innerHTML = arrayElement;
		element.value = arrayElement;
		select.appendChild(element);
	})
	return select;
}
 
var createJobList = function (array) {
	//return array.map(function(job) {
		//return job["jobName"];
	//})
	var jobArray = [];
	array.forEach(function(job){
		var name = job["jobName"];
		jobArray.push(name);
	})
	console.log(jobArray);
	return jobArray;
}

var createEmployeeList = function (array) {
	var empArray = [];
	array.forEach(function(employee){
		var name = employee["empFirstName"] + " " + employee["empLastName"];
		empArray.push(name);
	})
	return empArray;
}

var createEmployeeSelect = function() {
	var empArray = createEmployeeList(localStorage.getArray("employeesArray"));
	var empSelect = selectCreate("employees", "employeeSelected");
	
	optionCreate(empArray, empSelect);
	empMoveDrop.appendChild(createButton("selectEmp", "Select Employee", "button-link"));
	return empSelect;
}

var createJobSelect = function() {
	var jobArray = createJobList(localStorage.getArray("jobsArray"));
	var jobSelect = selectCreate("jobs", "jobSelected");
	//selectOptionCreate(jobArray, jobSelect
	optionCreate(jobArray, jobSelect);
	jobMoveDrop.appendChild(createButton("selectJob", "Select Job", "button-link"));
	return jobSelect;	
}

var showEmpSelect = function () {
	empMoveDrop.appendChild(createEmployeeSelect());
	visibilityToggle(empShow);
	visibilityToggle(empMoveDrop);
	document.getElementById("selectEmp").addEventListener("click", moveEmployee);
}

var showJobSelect = function () {
	jobMoveDrop.appendChild(createJobSelect());
	visibilityToggle(jobSelect);
	visibilityToggle(jobMoveDrop);
	document.getElementById("selectJob").addEventListener("click", updateEmployeeJob);
}