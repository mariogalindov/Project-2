
document.addEventListener("DOMContentLoaded", function() {
    var officeDropdown = $("#dropdown-toggle");

    // Funcion para mostrar los horarios disponibles para una oficina
    var showOfficeAvailability = function(elementId){
        $("#" + elementId).removeClass("d-none")
    }

    $("#officePickerButton").on("click",function(){
      var officeId = $("#officesDropdown").val()
      console.log("Selected office Id = " + officeId)
      $(".officeRow").each(function(i, obj){
          if(!$(this).hasClass("d-none") && $(this).attr("id") != officeId){
              $(this).addClass("d-none")
          }
          else if($(this).hasClass("d-none") && $(this).attr("id") === officeId){
            $(this).removeClass("d-none")
          }
      })
      })
});