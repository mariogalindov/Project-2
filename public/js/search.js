
document.addEventListener("DOMContentLoaded", function() {
    var officeDropdown = $("#dropdown-toggle");

    // Funcion para mostrar los horarios disponibles para una oficina
    var showOfficeAvailability = function(elementId){
        $("#" + elementId).removeClass("d-none")
    }

    $("#officePickerButton").on("click",function(){
      var officeId = $("#officesDropdown").val();
      var doctorId = $("#officesDropdown").attr("data-doctor");
      console.log("Selected doctor id = " + doctorId);
      console.log("Selected office Id = " + officeId);
      $(".officeRow").each(function(i, obj){
          if(!$(this).hasClass("d-none") && $(this).attr("id") != officeId && $(this).attr("data-doctor") === doctorId){
              $(this).addClass("d-none")
          }
          else if($(this).hasClass("d-none") && $(this).attr("id") === officeId && $(this).attr("data-doctor") === doctorId){
            $(this).removeClass("d-none")
          }
      })
      })

      $("#goBackToIndex").on("click",function(){
          location.href = "/"
      })
});