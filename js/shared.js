/*
//Functions shared by employees and jobs
*/

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

//sets object value to returned value from extractValue
 var setAttribute = function (obj, id) {
	obj[id] = extractValue(id);
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
var formSubmit = function (event, reduceArray, func1, func2, func3, element1, element2) {
	var obj = reduceArray.reduce(setAttribute, {});
	if (formIsValid(obj)) {
		func1(obj);
		func2();
		func3();
		hideElement(element2);
		element1.reset();
		event.preventDefault();
	} else {
		alert("There is an empty form field that must be filled out.");
		event.preventDefault();
	}
	return obj;
	//debugger;
}

//creates unordered list depending on passed in parameters
var makeUL = function (arrayName, items, element1, element2, func1, func2) {
	if (localStorage.getArray(arrayName).length < 1) {
		//instead of alert this should be hard-coded html message that is visibility toggled
		alert("There are no " + items + " to view.");
		hideElement(element1);
		func1();
	} else {
		func2();
		showElement(element1);
		showElement(element2);
	}
}

//clears children from passed in element
var clearList = function (element) {
	if (element.hasChildNodes()) {
		while (element.firstChild) 
			element.removeChild(element.firstChild);
	}
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

//DRYed showSelect function for jobs and employees array
//call this function whenever a select element with all current jobs or employees is required
var showSelect = function (callback, element1, element2, func1, idName, arrayName, alertMessage, func2, func3) {
	if (localStorage.getArray(arrayName).length < 1) {
		alert("There are no current " + alertMessage + ".");
		func2();
		//func2 shows fullMenu
		return;
	} else if (!element1.hasChildNodes()) {
		//func3 hides fullMenu
		callback(element1, idName, arrayName);
	}
	//below line assumes element already exists but is hidden
	showElement(element1);
	showElement(element2);
	func3();
	document.getElementById(idName).addEventListener("change", func1);
}

var doNothing = function () {}

//check if Storage exist in browser and if so do these things on window load
window.onload = function() {
  // Check for LocalStorage support.
	if (localStorage) {
		//constructs jobs list when window is loaded, but is not visible because has class "hidden"
		constructUL("jobsArray", jobList, jobDropList, appendJobListItem);
		constructEmpUL("employeesArray", empList, empDropList);
		constructUL("archivedJobs", archJobList, jobArchives, appendArchJobListItem);
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