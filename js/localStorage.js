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

//helper functions for above Storage methods

//function for deleting job from localStorage array when the index is known
//used during testing when I was creating many fake job and employee entries
var erase = function () {
	console.log("deleting job...");
	localStorage.deleteItem("archivedJobs", 0);
}

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