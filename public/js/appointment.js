// This file grabs form data to send it via AJAX POST to the servrer route. There it will create a new url

$(document).ready(function() {
  console.log("document confirmation loaded and ready");

  $("#confirm-btn").on("click", function(event) {
    event.preventDefault();

    var drName = $("#name_1").attr("data-value");
    var timeslot = $("#timeslot_1").attr("data-value");
    var object = {
      drName: drName,
      timeslot: timeslot
    };

    console.log(drName);
    console.log(timeslot);
    console.log(object);

    $.ajax({
      url: "/appointment_confirmation",
      type: "POST",
      // dataType: "json",
      // contentType: "application/json",
      data: object,
      success: function(result) {
        console.log("Success!!!");
        $("body").html(result) ;
      },
      error: function(result) {console.log("ERROR")}
    }).then(function(result) {console.log(result)});
  });
});
