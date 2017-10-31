$( function() {

} );


Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function renderCalendar(){

  var startDateString = $( "#date-input" ).val();
  var startDateObject = new Date(startDateString);
  //Some kind a bug got me back one day
  startDateObject = startDateObject.addDays(1);
  console.dir(startDateObject);
  var numberOfDays = $( "#number-of-days-input" ).val();

  var endDateObject = startDateObject.addDays(numberOfDays);
  var endDateString = endDateObject.getFullYear() + "-" + (endDateObject.getMonth()+1) + "-" + endDateObject.getDate();

  $.datepicker.setDefaults({
          dateFormat: 'yy-mm-dd',
          minDate: startDateString,
          maxDate: endDateString
    });

  $( "#calendar-div" ).datepicker();
}
