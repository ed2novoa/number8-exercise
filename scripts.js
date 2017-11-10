
function renderCalendar(){


  $( "#loading-div" ).show();
  //BUG: a second call to the button is not working

  var startDateString = $( "#date-input" ).val();
  var startDateObject = new Date(startDateString);
  //Some kind a bug got me back one day
  startDateObject.setDate(startDateObject.getDate() + 1);
  // console.dir(startDateObject);
  var numberOfDays = $( "#number-of-days-input" ).val();

  // console.dir(numberOfDays);

  var endDateObject = new Date(startDateObject.getTime() + (numberOfDays-1) * 86400000 );


  var endDateString = endDateObject.getFullYear() + "-" + (endDateObject.getMonth()+1) + "-" + endDateObject.getDate();

  var numberOfMonths = monthDiff(startDateObject,endDateObject)+1;

  if (startDateObject.getMonth()!==endDateObject.getMonth()) {
    numberOfMonths++;
  }

  // console.dir(endDateObject);
  // console.dir(endDateString);

  // $.datepicker.setDefaults({
  //   dateFormat: 'yy-mm-dd',
  //   minDate: startDateString,
  //   maxDate: endDateString,
  //   numberOfMonths: numberOfMonths,
  // });

  var calendarDiv = $( "#calendar-div" );
  calendarDiv.html('');
  calendarDiv.removeClass('hasDatepicker');

  calendarDiv.hide();

  calendarDiv.datepicker({
    dateFormat: 'yy-mm-dd',
    minDate: startDateString,
    maxDate: endDateString,
    numberOfMonths: numberOfMonths,
  });


  ajaxRequest(calendarDiv);

}//renderCalendar()

function ajaxRequest(calendarDiv){
  // AJAX Request
  var countryCode = $( "#country-code-input" ).val();
  $.ajax({
    url: 'https://holidayapi.com/v1/holidays?key=e1aec0bf-51e8-444d-982d-10661479afca&country=CR&year=2016',
    // url: 'https://holidayapi.com/v1/holidays?key=7f40200d-0052-4c81-9341-09654248cdd0&country=CR&year=2016',
    data: {
      format: 'json'
    },
    error: function() {
      $( "#calendar-div" ).html(
        '<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> Something wrong happened. Please try again.</div>');
      },
      success: function(data) {

        let datesElements = $( "td:not(.ui-state-disabled)" );
        // console.log('datesElements');
        // console.dir(datesElements);
        console.dir(data.holidays);
        datesElements.each(function(index, el) {

          let currentDate = el.getAttribute('data-year')+'-'+((parseInt(el.getAttribute('data-month'),10)+1)>9 ? (parseInt(el.getAttribute('data-month'),10)+1) : ('0'+(parseInt(el.getAttribute('data-month'),10)+1))) +'-'+(el.children[0].innerHTML>9 ? el.children[0].innerHTML : '0'+el.children[0].innerHTML);

          // console.log(currentDate);
          // console.dir(data.holidays);
          for (holidayDate in data.holidays){
            let holiday = data.holidays[holidayDate];
            let holidayString = holiday[0]['date']+'';
            // console.log(holidayString);
            if (holidayString==currentDate) {
              el.children[0].className += ' orangeBack';
              el.setAttribute('title', holiday[0]['name']+'');
            }
          }//for...in
        });
        $( "#loading-div" ).hide();
        calendarDiv.show();
      },
      type: 'GET'
    });
  }

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
