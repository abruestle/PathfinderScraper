// // Grab the classes as a json
// $.getJSON("/classes", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#classes").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// Whenever someone clicks a note
$(document).on("click", ".notebadge, .notebadge a, .notebadge a span", function() {
  event.preventDefault();
  // Save the data
  var thisCategory = $(this).attr("data-category");
  var thisName = $(this).attr("data-name");
  // hide unseen notes; show other notes
  $(".hideablenotes").removeClass('invisible');
  $(".deletenote").addClass('invisible');
  $(".deletenote").removeClass('invisible');
  $(".hideablenotes").addClass('invisible');
  $(".savenote").not(".newsave").addClass('invisible');
  $("." +thisName+ thisCategory  + "note").removeClass('invisible');
  $("." +thisName+ thisCategory  + "delete").removeClass('invisible');
  $(".newnote").removeClass('invisible');
  $(".newnote").attr("data-category", thisCategory);
  $(".newnote").attr("data-name", thisName);
  $(".newsave").attr("data-category", thisCategory);
  $(".newsave").attr("data-name", thisName);
  $(".newdelete").attr("data-category", thisCategory);
  $(".newdelete").attr("data-name", thisName);
  $(".newdelete").removeClass('invisible');

});

// When you click the savenote button
$(document).on("click", ".newsave", function() {
  // Grab the id associated with the class from the submit button
  var thisCategory = $(this).attr("data-category");
  var thisName = $(this).attr("data-name");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/classes/" + thisCategory + "/" + thisName,
    data: {
      // Value taken from title input
      name: thisName,
      title: $("#inputtitlenew").val(),
      category: thisCategory,
      // Value taken from note textarea
      body: $("#inputtextnew").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      var html = '<form class="form-horizontal hideablenotes ' + thisName + '' + thisCategory + 'note" role="form"><div class="form-group"><p id="inputtitle' + thisName + '' + thisCategory + '" value="{{title}}" data-category="' + thisCategory + '" data-name="' + thisName + '">{{body}}</p></div><div class="form-group"><p id="inputbody' + thisName + '' + thisCategory + '" value="{{body}} data-category="' + thisCategory + '" data-name="' + thisName + '">{{body}}</p></div><div class="btn-group"><button class="btn btn-default ' + thisName + '' + thisCategory + 'delete deletenote" type="button"  data-category="' + thisCategory + '" data-name="' + thisName + '">Delete Note</button></div></form>';
      html.insertAfter(".newnote");
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput" +thisName+ thisCategory).val("");
  $("#bodyinput" +thisName+ thisCategory).val("");
});
