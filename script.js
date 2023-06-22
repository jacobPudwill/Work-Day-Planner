// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs().format('dddd, MMMM D');
var hour = dayjs().hour();

$(function () {
  for (let i = 9; i <= 12; i++){
    var timeBlockDiv = $('<div>');
    timeBlockDiv.attr('id', 'hour-' + i);
    timeBlockDiv.attr('class', 'row time-block');
    if (i < hour){
      timeBlockDiv.addClass('past');
    } else if (i === hour) {
      timeBlockDiv.addClass('present');
    } else if (i > hour) {
      timeBlockDiv.addClass('future');
    }
  
    var timeAM = $('<div>' + i + 'AM</div>');
    if (i === 12){
      timeAM = $('<div>' + i + 'PM</div>');
    }
    timeAM.attr('class', 'col-2 col-md-1 hour text-center py-3');
  
    var textArea = $('<textarea>');
    textArea.attr('class', 'col-8 col-md-10 description');
    textArea.attr('rows', '3');
    textArea.text(localStorage.getItem('hour-' + i));
  
    var saveButton = $('<button>');
    saveButton.attr('class', 'btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
  
    var icon = $('<i>');
    icon.attr('class', 'fas fa-save');
    icon.attr('aria-hidden', 'true');
  
    saveButton.append(icon);
    timeBlockDiv.append(timeAM);
    timeBlockDiv.append(textArea);
    timeBlockDiv.append(saveButton);

    $('.container-lg').append(timeBlockDiv);
  }

  for (let i = 1; i <= 5; i++){
    var timeBlockDiv = $('<div>');
    timeBlockDiv.attr('id', 'hour-' + i);
    timeBlockDiv.attr('class', 'row time-block');
    if (hour < 13 || hour >= 13 && hour < i + 12){
      timeBlockDiv.addClass('future');
    } else if (hour >= 13 && hour === (i + 12)){
      timeBlockDiv.addClass('present');
    } else if (hour >= 13 && hour > (i + 12)){
      timeBlockDiv.addClass('past');
    }
  
    var timeAM = $('<div>' + i + 'PM</div>');
    timeAM.attr('class', 'col-2 col-md-1 hour text-center py-3');
  
    var textArea = $('<textarea>');
    textArea.attr('class', 'col-8 col-md-10 description');
    textArea.attr('rows', '3');
    textArea.text(localStorage.getItem('hour-' + i));
  
    var saveButton = $('<button>');
    saveButton.attr('class', 'btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
  
    var icon = $('<i>');
    icon.attr('class', 'fas fa-save');
    icon.attr('aria-hidden', 'true');
  
    saveButton.append(icon);
    timeBlockDiv.append(timeAM);
    timeBlockDiv.append(textArea);
    timeBlockDiv.append(saveButton);

    $('.container-lg').append(timeBlockDiv);
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var timeBlocks = $('.container-lg').children();

  for (let i = 0; i < timeBlocks.length; i++){
    timeBlock = timeBlocks.eq(i);

    timeBlock.children('button').on("click", function(){
      var currentTimeBlock = $(this).parent();

      localStorage.setItem(currentTimeBlock.attr('id'), currentTimeBlock.children('textarea').val());
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(today);
});
