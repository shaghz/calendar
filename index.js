//configurations
let dateNow = moment().locale('fa').format('YYYY/M/D');
let dateArray = dateNow.split('/');
let year = dateArray[0];
let month = dateArray[1];
const monthNames = ["", "farvardin", "ordibehesht", "khordad", "tir", "mordad", "shahrivar", "mehr", "aban", "azar", "dey", "bahman", "esfand"];
let myJSON = '{ "date":"1396/11/27"}';
$(document).ready(function() {
    setDate();
    displayCalendar();

//set dates
    function setDate() {

            moment.locale('fa');
            m = moment(dateNow);
            return m;
    }

    function displayCalendar() {

        let htmlContent = "";

        // get first day of the months weekday
        let weekday = moment(dateNow).startOf('jMonth').weekday();

        // get first day of the months weekday
        let weekday2 = weekday;

        //get month length
        let numOfDays = moment(dateNow).endOf('month').format("jD");
        //white space for previous month ,loose one for each cell

        let daysOfMonth =  Array.apply(null, {length: numOfDays}).map(Number.call, Number);
console.log(daysOfMonth)
        let daysOfweek = chunks(daysOfMonth,7);
        console.log(daysOfweek);
        while (weekday > 0) {
            htmlContent += "<td class='monthPre'></td>";
            weekday--;
        }

        // calander body.
        let day = 1;
        while (day <= numOfDays) {
            // if friday go to new line.

            if (weekday2 > 6) {
                weekday2 = 0;
                htmlContent += "</tr><tr>";
            }
            //if working with no events
            // htmlContent += "<td >" + day + "</td>";
            // handling events.
            // let event = JSON.parse(myJSON);
            // let eventDate = (year + '/' + month + '/' + day);
            //set the cells with attention to events
            // if (eventDate == event.date) {
            //     htmlContent += "<td class='event' >" + day + " <div>an eventxry</div></td>";
            // } else {
                htmlContent += "<td >" + day + "</td>";
            // }

            weekday2++;
            day++;
        }

        let calendarBody = `<table class='calendar'>
                            <tr class='monthNow'>
                                <th colspan='7'>
                                ${  monthNames[month] } ${year} 
                                </th>
                            </tr>
                            <tr class='dayNames'>
                                <td>shanbe</td>
                                <td>yekshanbe</td>
                                <td>doshanbe</td>
                                <td>seshanbe</td>
                                <td>charshanbe</td>
                                <td>panjsjanbe</td>
                                <td>jume</td>
                            </tr>
                            <tr>
                                ${htmlContent}
                            </tr>
                        </table>`;

        document.getElementById("calendar").innerHTML = calendarBody;
    }

//update view date
    function updateCalendar() {
        newDate = moment(dateNow);
        month = newDate.format('M');
        year = newDate.format('YYYY');
        displayCalendar()
    }

//update on click when next month
    $("#next").click(function(){
        dateNow = m.add(1, "month").format("YYYY/MM/DD");
        updateCalendar();
    });

//update on click when prev month
    $("#previous").click(function(){
        dateNow = m.subtract(1, "month").format("YYYY/MM/DD");
        updateCalendar();
    });
});