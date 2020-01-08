// This file grabs user selection data to send it to the users-api-route. There it will create a new url
var selectedDoctor = "";
var selectedDoctorID = "";
var selectedOffice = "";
var selectedTimeSlot = "";
var queryURL = "/patient/create_appointment";

$(document).ready(function() {
  console.log("ready");

  $(".appt").on("click", function(event) {
    event.preventDefault();
    console.log("clicked");

    selectedDoctorID = $(this).attr("data-doctor");
    selectedDoctor = $(this).attr("data-doctorname");
    selectedDoctorSp = $(this).attr("data-specialty");
    selectedOffice = $(this).attr("data-office");
    selectedAddress = $(this).attr("data-address")
    selectedTimeSlot = $(this).attr("id");

    queryURL += "/";
    queryURL += selectedDoctorID;
    queryURL += "/";
    queryURL += selectedDoctor;
    queryURL += "/";
    queryURL += selectedDoctorSp;
    queryURL += "/";
    queryURL += selectedOffice;
    queryURL += "/";
    queryURL += selectedAddress;
    queryURL += "/";
    queryURL += selectedTimeSlot;
    queryURL += "/";

    console.log(queryURL);

    // Creating an AJAX call for the specific selected button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //  function to compile handlebars template
      console.log(response);
      $("html").html(response);
      console.log("success!!!!");
    });
  });
});