// This file grabs user selection data to send it to the users-api-route. There it will create a new url
var selectedDoctor = "";
var selectedDoctorID = "";
var selectedOffice = "";
var selectedTimeSlot = "";
var queryURL = "";

$(document).ready(function() {
  console.log("ready");

  $("button").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");
    console.log(selectedDoctor);
    selectedDoctor = $(this).attr("data-doctor");
    selectedDoctorID = $(this).attr("data-doctor");
    selectedOffice = $(this).attr("data-office");
    selectedTimeSlot = $(this).attr("id");
    var root = "/patient/create_appointment/";
    queryURL =
      root +
      "&doctor-slection=" +
      selectedDoctor +
      "&doctor-id=" +
      selectedDoctorID +
      "&doctor-office=" +
      selectedOffice +
      "&timeslot=" +
      selectedTimeSlot;
    console.log(queryURL);
    // Creating an AJAX call for the specific selected button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log("success!!!!");
    });
  });
});
