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
  $(".hideablenotes").removeClass('collapse');
  $(".deletenote").addClass('collapse');
  $(".deletenote").removeClass('collapse');
  $(".hideablenotes").addClass('collapse');
  $(".savenote").not(".newsave").addClass('collapse');
  $("." +thisName+ thisCategory  + "note").removeClass('collapse');
  $("." +thisName+ thisCategory  + "delete").removeClass('collapse');
  $(".newnote").removeClass('collapse');
  $(".newnote").attr("data-category", thisCategory);
  $(".newnote").attr("data-name", thisName);
  $(".newsave").attr("data-category", thisCategory);
  $(".newsave").attr("data-name", thisName);
  $(".newdelete").attr("data-category", thisCategory);
  $(".newdelete").attr("data-name", thisName);
  $(".newdelete").removeClass('collapse');
  $("#newnote")[0].scrollIntoView();

});

// When you click the savenote button
$(document).on("click", ".newsave", function() {
  // Grab the id associated with the class from the submit button
  var thisCategory = $(this).attr("data-category");
  var thisName = $(this).attr("data-name");
  var thisTitle = $("#inputtitlenew").val();
  var thisBody = $("#inputtextnew").val();

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/classes/" + thisCategory + "/" + thisName,
    data: {
      // Value taken from title input
      name: thisName,
      title: thisTitle,
      category: thisCategory,
      // Value taken from note textarea
      body: thisBody
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log("Response:");
      console.log(data);
      var html = '<form class="form-horizontal hideablenotes ' + thisName + '' + thisCategory + 'note" role="form" data-id="'+data.notes[data.notes.length - 1].id+'" id="'+data.notes[data.notes.length - 1].id+'NoteBlock"><div class="form-group"><p id="' + thisTitle + thisName + '' + thisCategory + '" value="' + thisTitle + '" data-category="' + thisCategory + '" data-name="' + thisName + '">' + thisTitle + '</p></div><div class="form-group"><p id="inputbody' + thisName + '' + thisCategory + '" value="' + thisBody + ' data-category="' + thisCategory + '" data-name="' + thisName + '">' + thisBody + '</p></div><div class="btn-group"><button class="btn btn-default ' + thisName + '' + thisCategory + 'delete deletenote" type="button"  data-category="' + thisCategory + '" data-id="'+data.notes[data.notes.length - 1].id+'" data-name="' + thisName + '">Delete Note</button></div></form>';
      $(html).insertAfter(".newnote");
      // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput" +thisName+ thisCategory).val("");
    $("#bodyinput" +thisName+ thisCategory).val("");
    });

 
});


// When you click the deletenote button
$(document).on("click", ".deletenote:not(.newdelete)", function() {
  // Grab the id associated with the class from the submit button
  var thisCategory = $(this).attr("data-category");
  var thisName = $(this).attr("data-name");
  var thisId = $(this).attr("data-id");
  console.log("deleting " + thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/classNote/",
    data: {
      // Value taken from title input
      _id: thisId,
      name: thisName,
      category: thisCategory
    }
  })
    // With that done
    .then(function(response) {
      // Log the response
      // Also, remove the values shown on page
    
    });

 $('#'+thisId+'NoteBlock').remove();
});

// When you click the deletenote button on new button
$(document).on("click", ".newdelete", function() {
  $('#inputtitlenew').val('');
  $('#inputtextnew').val('');
});

// // When you click the deletenote button on new button
// $(document).on("click", ".panel-heading", function() {
//   thisLink = $(' div div .panel-title', this).attr('href');
//   console.log(thisLink);
//   //$('.in').collapse("toggle");
//   thisLink.toggle();
// });

// toggle collapse with header
$(document).on("click", ".panel-heading", function() {
  thisLink = $(' div div .panel-title', this).attr('data-target');
  console.log(thisLink);
  //$('.in').collapse("toggle");
  thisLink.toggle();
});