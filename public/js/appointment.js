document.addEventListener("DOMContentLoaded", function() {
  console.log(
    "this is working********************************************************"
  );
  $("button").on("click", function() {
    alert("The paragraph was clicked.");
  });
});
