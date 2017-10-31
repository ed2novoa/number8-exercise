$( function() {

} );


function renderCalendar(){

  //BUG: a second call to the button is not working

  var startDateString = $( "#date-input" ).val();
  var startDateObject = new Date(startDateString);
  //Some kind a bug got me back one day
  startDateObject.setDate(startDateObject.getDate() + 1);
  console.dir(startDateObject);
  var numberOfDays = $( "#number-of-days-input" ).val();

  console.dir(numberOfDays);

  var endDateObject = new Date(startDateObject.getTime() + (numberOfDays-1) * 86400000 );


  var endDateString = endDateObject.getFullYear() + "-" + (endDateObject.getMonth()+1) + "-" + endDateObject.getDate();

  var numberOfMonths = monthDiff(startDateObject,endDateObject)+1;

  if (startDateObject.getMonth()!==endDateObject.getMonth()) {
    numberOfMonths++;
  }

  console.dir(endDateObject);
  console.dir(endDateString);

  $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    minDate: startDateString,
    maxDate: endDateString,
    numberOfMonths: numberOfMonths,
  });

  $( "#calendar-div" ).datepicker();
}

// AJAX Request
var countryCode = $( "#country-code-input" ).val();
$.ajax({
   url: 'https://holidayapi.com/v1/holidays?country='+countryCode+'&year=2008',
   data: {
      format: 'json'
   },
   error: function() {
   },
   dataType: 'jsonp',
   success: function(data) {

   },
   type: 'GET'
});


function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}
