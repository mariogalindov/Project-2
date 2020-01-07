// This file grabs user selection data to send it to the users-api-route. There it will create a new url

// Var declaration
var selectedDoctor = "";
var selectedDoctorID = "";
var selectedOffice = "";
var selectedTimeSlot = "";
var queryURL = "/patient/create_appointment";

// JQUERY event listener function on click of time slot button synchronous after "document" is loaded and ready
$(document).ready(function() {
  console.log("Document loaded and ready");

  $("button").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked!!");
    selectedDoctor = $(this).attr("data-doctor");
    selectedDoctorID = $(this).attr("data-doctor");
    selectedOffice = $(this).attr("data-office");
    selectedTimeSlot = $(this).attr("id");
    queryURL += "/drname=";
    queryURL += selectedDoctor;
    queryURL += "/id=";
    queryURL += selectedDoctorID;
    queryURL += "/office=";
    queryURL += selectedOffice;
    queryURL += "/timeslot=";
    queryURL += selectedTimeSlot;
    console.log("Dynamically constructing URL with patient selection and sending it to server...");
    console.log(queryURL);
    // Creating an AJAX call for the specific selected button clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function() {
      console.log("Calling server with URL created!!!!");
    });
  });
});
