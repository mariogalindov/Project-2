// This file grabs form data to send it via AJAX POST to the servrer route. There it will create a new url
var selectedDoctor = $("").val().trim();
var selectedDoctorID = "";
var selectedOffice = "";
var selectedTimeSlot = "";

$(document).ready(function() {
  console.log("document 2 loaded and ready");

  $("#continue-btn").on("click", function(event) {
    event.preventDefault();
    alert("continue button clicked");

    //   selectedDoctorID = $(this).attr("data-doctor");
    //   selectedDoctor = $(this).attr("data-doctorname");
    //   selectedDoctorSp = $(this).attr("data-specialty");
    //   selectedOffice = $(this).attr("data-office");
    //   selectedAddress = $(this).attr("data-address")
    //   selectedTimeSlot = $(this).attr("id");
  });
});
