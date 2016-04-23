window.onload = function() {

  // Check for LocalStorage support.
  if (localStorage) {

    // Add an event listener for form submissions
    document.getElementById('contactForm').addEventListener('submit', function() {
      //create new Job
	  	  
	  // Get the value of the name field.
      var name = document.getElementById('name').value;

      // Save the name in localStorage.
      localStorage.setItem('name', name);
    });

  }

}

window.onload = function() {
  // Check for LocalStorage support.
  if (localStorage) {

      //Create empty jobs array in localStorage
      localStorage.setItem('jobsArray', jobsArray);
	  localStorage.setItem('employeesArray', employeesArray);
    });

}