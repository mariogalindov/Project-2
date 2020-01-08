// This file grabs user selection data to send it to the users-api-route. There it will create a new url
var selectedDoctor = "";
var selectedDoctorID = "";
var selectedOffice = "";
var selectedTimeSlot = "";
var queryURL = "/patient/create_appointment";

$(document).ready(function() {
  console.log("ready");

  $("button").on("click", function(event) {
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

// This regular expression will match all inputs that have a blacklisted character in them. The brackets define a character class, and the \ is necessary before the dollar sign because dollar sign has a special meaning in regular expressions.
// To add more characters to the black list, just insert them between the brackets; order does not matter.

// document.addEventListener("DOMContentLoaded", function() {
//     var officeDropdown = $("#dropdown-toggle");

//     // Funcion para mostrar los horarios disponibles para una oficina
//     var showOfficeAvailability = function(elementId){
//         $("#" + elementId).removeClass("d-none")
//     }

//     $("#officePickerButton").on("click",function(){
//       var officeId = $("#officesDropdown").val();
//       var doctorId = $("#officesDropdown").attr("data-doctor");
//       console.log("Selected doctor id = " + doctorId);
//       console.log("Selected office Id = " + officeId);
//       $(".officeRow").each(function(i, obj){
//           if(!$(this).hasClass("d-none") && $(this).attr("id") != officeId && $(this).attr("data-doctor") === doctorId){
//               $(this).addClass("d-none")
//           }
//           else if($(this).hasClass("d-none") && $(this).attr("id") === officeId && $(this).attr("data-doctor") === doctorId){
//             $(this).removeClass("d-none")
//           }
//       })
//       })

//       $("#goBackToIndex").on("click",function(){
//           location.href = "/"
//       })
// });
