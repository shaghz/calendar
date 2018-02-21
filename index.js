//configurations

let dateNow = moment().locale('fa').format('YYYY/M/D');
let dateArray=dateNow.split('/');
let month =  dateArray[1];
let day  = dateArray[2];
let year = dateArray[0];
let monthNames = ["", "farvardin", "ordibehesht", "khordad", "tir", "mordad", "shahrivar", "mehr", "aban", "azar", "dey", "bahman", "esfand"];

setDate();

function displayCalendar() {
    let htmlContent = "";
    let counter = 1;
    // get first day of the months weekday
    let weekday = moment(dateNow).startOf('jMonth').weekday();
    console.log('first day of week'+weekday);
    // get first day of the months weekday
    let weekday2 = weekday;
    //get month length
    let numOfDays = moment(dateNow).endOf('month').format("jD");
    console.log(numOfDays);

    //white space for previous month ,loose one for each cell
    while (weekday > 0) {
        htmlContent += "<td class='monthPre'></td>";
        weekday--;
    }

    // calander body.
    while (counter <= numOfDays) {
        // if friday go to new line.
        if (weekday2 > 6) {
            weekday2 = 0;
            htmlContent += "</tr><tr>";
        }
        //if working with no events
              // htmlContent += "<td >" + counter + "</td>";

        // handling events.
        let myJSON = '{ "date":"1396/11/27", "day":1, "year":"1396" }';
        let event = JSON.parse(myJSON);
        let wow = moment(m).format('YYYY/M');
        wow = wow + '/' + counter;
        //set the cells with attention to events
        if (wow == event.date) {
            htmlContent += "<td class='event' >" + counter + " <div>an event</div></td>";
        } else {
            htmlContent += "<td >" + counter + "</td>";
        }

        weekday2++;
        counter++;
    }

    let calendarBody = `<table class='calendar'> <tr class='monthNow'><th colspan='7'>
        ${  monthNames[month] } ${year}  </th></tr>`;
    calendarBody += `<tr class='dayNames'>  <td>shanbe</td>  <td>yekshanbe</td> <td>doshanbe</td>
  <td>seshanbe</td> <td>charshanbe</td> <td>panjsjanbe</td> <td>jume</td> </tr>`;
    calendarBody += `<tr>`;
    calendarBody += htmlContent;
    calendarBody += `</tr></table>`;

    document.getElementById("calendar").innerHTML = calendarBody;

}

//set date on click
function setDate() {
    moment.locale('fa');
    m = moment(dateNow);
}

//update view date
function updateCalendar() {
    setDate();
    n = moment(dateNow);
    month = n.format('M');
    year = n.format("YYYY");
    displayCalendar()
}

//update on click when next month
function nextMonth() {
    m = m.add(1, "month").format("YYYY/MM/DD");
    dateNow = m;
    updateCalendar();
}

//update on click when prev month
function previousMonth() {
    m = m.subtract(1, "month").format("YYYY/MM/DD");
    dateNow = m;
    updateCalendar();
}
