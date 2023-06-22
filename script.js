// Gets the date and hour using dayjs
var today = dayjs().format('dddd, MMMM D');
var hour = dayjs().hour();

$(function () {

  // Displays the current date in the header of the page.
  $('#currentDay').text(today);
  
  // Creates the html for the page and styles it by setting the classes of elements
  // Also pulling any previous input from local storage and displaying it
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
    if (hour < 13 || hour >= 13 && hour < (i + 12)){
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

  // Adds event listener on all save buttons and puts any text inputed and saved to localStorage
  var timeBlocks = $('.container-lg').children();

  for (let i = 0; i < timeBlocks.length; i++){
    timeBlock = timeBlocks.eq(i);

    timeBlock.children('button').on("click", function(){
      var currentTimeBlock = $(this).parent();

      localStorage.setItem(currentTimeBlock.attr('id'), currentTimeBlock.children('textarea').val());
    });
  }
});
