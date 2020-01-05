// =============================================================
// Loading data from page elements using JQUERY (@MEMO)
// =============================================================

// Patient appointment selection from search.handlebars
var $doctorSelected = $("#doctor");

document.addEventListener("DOMContentLoaded", function() {
  var specialtiesDropdown = $("#specialtiesDropdown");
  var doctorResults;

  // Funcion para agregar todas las especialidades al dropdown para que el usuario pueda buscar por especialidades
  var AddDropdownOptions = function(dropdown, specialties) {
    dropdown.empty();
    var specialtiesToAdd = [];
    for (var i = 0; i < specialties.length; i++) {
      var newOption = $("<option>");
      newOption.attr("value", specialties[i].id);
      newOption.text(specialties[i].specialization_name);
      specialtiesToAdd.push(newOption);
    }
    dropdown.append(specialtiesToAdd);
  };

  // Funcion para hacer el query a la BD de la especialidades y alimentarlas a la funcion AddDropdownOptions
  var getSpecialties = function() {
    $.get("/api/specializations", function(data) {
      specialtiesInfo = data;
      console.log(specialtiesInfo);
      AddDropdownOptions(specialtiesDropdown, specialtiesInfo);
    });
  };

  // Corremos la funcion getSpecialties que a su vez corre la funcion AddDropdownOptions que es la que agrega las especialidades al dropdown
  getSpecialties();

  $("#searchButton").on("click", function() {
    event.preventDefault();
    var choosenSpecialtyId = $("#specialtiesDropdown")
      .find(":selected")
      .attr("value");
    console.log(choosenSpecialtyId);
    location.href =
      "/specializations/" +
      choosenSpecialtyId +
      "/doctors/offices/availability";
  });
});
