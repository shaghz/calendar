//configurations
(function ($) {
    $.fn.makeChange = function () {
        moment.locale('fa');
        let dateNow = moment().locale('fa').format('YYYY/M/D');
        let m = moment(dateNow);
        let dateArray = dateNow.split('/');
        let year = dateArray[0];
        let month = dateArray[1];
        const monthNames = ["", "farvardin", "ordibehesht", "khordad", "tir", "mordad", "shahrivar", "mehr", "aban", "azar", "dey", "bahman", "esfand"];
        const calendarEvents = {
            "events": [
                {"caption": "an event", "date": "1396/12/12"},
                {"caption": "an event2", "date": "1396/12/2"},
                {"caption": "an event3", "date": "1396/12/12"},
                {"caption": "an event4", "date": "1396/11/12"}
            ]
        };

        displayCalendar();

        function displayCalendar() {

            let calendarContent = calendarSetter();
            //set body
            document.getElementById("calendar").innerHTML =

                `<table class='calendar'>
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
                            
                                ${calendarContent}
                       
                        </table>`;
        }

        function getYearInfo() {

            // get first day of the months weekday
            let weekStartDay = moment(dateNow).startOf('jMonth').weekday();
            //get month length
            let numOfMonthDays = parseInt(moment(dateNow).endOf('month').format("jD"));
            //white space for previous month ,loose one for each cell
            let daysOfMonthArray = Array(numOfMonthDays).fill(0).map((e, i) => i + 1);

            while (weekStartDay > 0) {
                daysOfMonthArray.unshift('');
                weekStartDay--;
            }
            return chunks(daysOfMonthArray, 7);
        }

//loop to get calendar days and check events
        function calendarSetter() {
            let calendarContent = "";
            let daysOfEachWeek = getYearInfo();

            for (let i = 0; i < daysOfEachWeek.length; i++) {
                calendarContent += `<tr>`;
                for (let j = 0; j < daysOfEachWeek[i].length; j++) {
                    let day = daysOfEachWeek[i][j];
                    let currentEvent = m.format('YYYY/MM/') + daysOfEachWeek[i][j];
                    for (let k = 0; k < calendarEvents.events.length; k++) {
                        if (calendarEvents.events[k].date === currentEvent)
                            day += `<p class="event">${calendarEvents.events[k].caption}</p>`;
                    }

                    calendarContent += `<td>
                                    ${ day } 
                                 </td>`;
                }
                calendarContent += `</tr>`;

            }
            return calendarContent;
        }


//update view date
        function updateCalendar() {
            month = dateNow.format('M');
            year = dateNow.format('YYYY');
            displayCalendar();
        }

//update on click when next month
        $("#next").click(function () {
            dateNow = moment(m.add(1, "month"));
            updateCalendar();
        });

//update on click when prev month
        $("#previous").click(function () {
            dateNow = moment(m.subtract(1, "month"));
            updateCalendar();
        });

    };
}(jQuery));