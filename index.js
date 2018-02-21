//configurations

let dateNow = moment().locale('fa').format('YYYY/M/D');
let dateArray=dateNow.split('/');
let year = dateArray[0];
let month =  dateArray[1];
let monthNames = ["", "farvardin", "ordibehesht", "khordad", "tir", "mordad", "shahrivar", "mehr", "aban", "azar", "dey", "bahman", "esfand"];


//set dates
function setDate() {
    moment.locale('fa');
    m = moment(dateNow);
}

function displayCalendar() {
    setDate();
    let htmlContent = "";
    let day = 1;
    // get first day of the months weekday
    let weekday = moment(dateNow).startOf('jMonth').weekday();

    // get first day of the months weekday
    let weekday2 = weekday;

    //get month length
    let numOfDays = moment(dateNow).endOf('month').format("jD");

    //white space for previous month ,loose one for each cell
    while (weekday > 0) {
        htmlContent += "<td class='monthPre'></td>";
        weekday--;
    }

    // calander body.
    while (day <= numOfDays) {
        // if friday go to new line.
        if (weekday2 > 6) {
            weekday2 = 0;
            htmlContent += "</tr><tr>";
        }
        //if working with no events
              // htmlContent += "<td >" + day + "</td>";
        // handling events.
        let myJSON = '{ "date":"1396/11/27", "day":1, "year":"1396" }';
        let event = JSON.parse(myJSON);
        let eventDate = (year+'/'+month+'/'+day);
        //set the cells with attention to events
        if ( eventDate == event.date) {
            htmlContent += "<td class='event' >" + day + " <div>an event</div></td>";
        } else {
            htmlContent += "<td >" + day + "</td>";
        }

        weekday2++;
        day++;
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
function split(myArray,obj){
   let  myArray=obj.split('/');
    month =   myArray[1];
    year =   myArray[0];
    return myArray;
}
//update view date
function updateCalendar() {
    newDate = moment(dateNow).format('YYYY/M');

    split(newdateArray,newDate);
    month =  newdateArray[1];
    year =  newdateArray[0];
    displayCalendar()
}

//update on click when next month
function nextMonth() {
    dateNow = m.add(1, "month").format("YYYY/MM/DD");
    updateCalendar();
}

//update on click when prev month
function previousMonth() {
    dateNow =  m.subtract(1, "month").format("YYYY/MM/DD");
    updateCalendar();
}
