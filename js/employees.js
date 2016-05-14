/*
//employee functionality
*/

/*
//employee buttons
*/

var viewEmps = document.getElementById("viewEmps");
var hideEmployees = document.getElementById("hideEmployees");
var employeeDropdown = document.getElementById("addEmployee");
var employeeSubmit = document.getElementById("employeeSubmit");
var empCancel = document.getElementById('empCancel');
var empEditSave = document.getElementById("empEditSave");
var empForm = document.getElementById("employeeCreateForm");
var empList = document.getElementById("empList");
var empDropList = document.getElementById("empDropList");
var employees = document.getElementById("employees");

//empAttrs array used to create employee objects using reduce
var empAttrs = ["empFirstName","empLastName", "empNumber", "empAddress", "empCityState", "empType"];

//modeled after createJob function, using same functions but using empAttrs instead of jobAttrs
var createEmp = function (emp) {
	var empUL = document.createElement('ul');
	localStorage.pushArrayItem("employeesArray", emp);
	//this appends newly created job to the list, need to replicate this for the selects
	empList.appendChild(appendEmpListItem(emp, empUL));
	empDropList.appendChild(empList);
	updateEmpSelects();
}

//submit employee form
var empFormSubmit = function () {
	return formSubmit(event, empAttrs, createEmp, hideEmpForm, showFullEmpMenu, empForm, empCancel);
}
//submit edited employee
var editEmpFormSubmit = function () {
	return formSubmit(event, empAttrs, doNothing, hideEmpForm, showFullEmpMenu, empForm, empCancel);
}

//cancel new employee addition
var createEmpCancel = function (event) {
	hideEmpForm();
	hideElement(empCancel);
	hideElement(empEditSave);
	showFullEmpMenu();
	empForm.reset();
	event.preventDefault();
}

//shows form for adding new employees
var showEmpForm = function () {
	showElement(empForm);
	showElement(empCancel);
	showElement(employeeSubmit);
}

var showEditEmpForm = function () {
	showElement(empForm);
	showElement(empCancel);
	showElement(empEditSave);
}

//hides form
var hideEmpForm = function () {
	hideElement(empForm);
	hideElement(empCancel);
}

var showFullEmpMenu = function () {
	showElement(employeeDropdown);
	showElement(viewEmps);
}

var hideFullEmpMenu = function () {
	hideElement(employeeDropdown);
	hideElement(viewEmps);
}

var makeEmpUL = function () {
	makeUL("employeesArray", "employees", hideEmployees, empDropList, showFullEmpMenu, hideFullEmpMenu);
}

//hides emp list
var hideEmpUL = function () {
	showElement(viewEmps);
	showElement(employeeDropdown);
	hideElement(empDropList);
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
  ul.appendChild(createButton("", "Edit Employee", "btn btn-primary", editEmp));
  var par = document.createElement('p');
  par.innerHTML = ('====================');
  ul.appendChild(par);
  return ul;
}

var constructEmpUL = function (arrayName, list, element) {
	var parsedArray = localStorage.getArray(arrayName);
	
	for(var i = 0; i < parsedArray.length; i++) {
		var empUL = document.createElement('ul');
		list.appendChild(appendEmpListItem(parsedArray[i], empUL));
	}
	element.appendChild(list);
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
	showEditEmpForm();
	hideFullEmpMenu();
	hideElement(empDropList);
	hideElement(employeeSubmit);
}

//submit edits, update list
var submitEmpEdits = function () {
	var editedEmployee = editEmpFormSubmit();
	localStorage.editArrayItem("employeesArray", "empNumber", selectedEmployee["empNumber"], editedEmployee);
	clearList(empList);
	constructEmpUL("employeesArray", empList, empDropList);
	updateEmpSelects();
	hideEmpForm();
	showFullEmpMenu();
	hideElement(empEditSave);
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

//appends created employee list
var appendEmpSelect = function(element, idName, arrayName) {
	var empArray = createEmployeeList(arrayName);
	var empSelect = selectOptionCreate(empArray, "Select Employee");
	empSelect.id = idName;
	element.appendChild(empSelect);
	return empSelect;
}

//updates emp selects when called
//call this when submitting form for new employee, and after editing employee
//these functions are: submitEmpEdits, createEmp
var updateEmpSelects = function () {
	clearList(empMoveDrop);
	appendEmpSelect(empMoveDrop, "employeeSelected", "employeesArray");
}

//employee event listeners
employeeSubmit.addEventListener("click", empFormSubmit);
employeeDropdown.addEventListener("click", showEmpForm);
employeeDropdown.addEventListener("click", hideFullEmpMenu);
viewEmps.addEventListener("click", makeEmpUL);
hideEmployees.addEventListener("click", hideEmpUL);
empCancel.addEventListener("click", createEmpCancel);
empEditSave.addEventListener("click", submitEmpEdits);