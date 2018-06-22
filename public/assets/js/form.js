// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-eaten").on("click", function(event) {
        console.log("change-eaten button clicked");

      var id = $(this).data("id");
      var hasBeenEaten = $(this).data("true");
  
      var newEatenStatus = {
        eaten: hasBeenEaten
      };
  
      // Send the PUT request.
      $.ajax("/" + id, {
        type: "PUT",
        data: newEatenStatus
      }).then(
        function(response) {
          console.log("response is ", response);
          // console.log("changed eaten to", newEatenStatus);
          // Reload the page to get the updated list
          // location.reload();
        }
      );

      // Delete <li> tag containing button that was just clicked
      $(this).parent().detach();

      // Reload page to show current data
      location.reload(true);

    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      console.log("clicked submit!");
  
      var newBurger = {
        burger_name: $("#create-new-burger").val().trim(),
        // sleepy: $("[name=sleepy]:checked").val().trim()
        eaten: false
      };

      console.log("newBurger is", newBurger);
  
      // Send the POST request.
      $.ajax("/", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );

      console.log("ajax request done");
    });


  });
  