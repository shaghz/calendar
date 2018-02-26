(function ($) {
    $.fn.Calendar = function (options) {
        options = $.extend({
            monthNames: ["farvardin", "ordibehesht", "khordad", "tir", "mordad", "shahrivar", "mehr", "aban", "azar", "dey", "bahman", "esfand"],
            calendarEvents: {},
            lang: 'fa',
        }, options);

        moment.locale(options.lang);

        let $calendar = $(this);
        let $container = $calendar.parent();
        let fullYearFormat = 'YYYY/M/D';
        let dateNow = moment().locale(options.lang).format(fullYearFormat);
        const monthNames = options.monthNames;
        const calendarEvents = options.calendarEvents;

        //default load
        let m = moment(dateNow);

        setCalendarBody();

        /**
         *
         * @param weekStartDay
         * @param MonthDays
         */
        function chunkWeek(weekStartDay, MonthDays) {
            //white space for previous month ,loose one for each cell
            let daysOfMonthArray = Array(MonthDays).fill(0).map((e, i) => i + 1);
            while (weekStartDay > 0) {
                daysOfMonthArray.unshift('');
                weekStartDay--;
            }
            return chunks(daysOfMonthArray, 7);
        }

        /**
         * loop to get calendar days and check events
         * @param date
         * @returns {string}
         */
        function getCalendar(date) {

            let calendarContent = "";
            // get first day of the months weekday
            let weekStartDay = moment(date).startOf('jMonth').weekday();
            //get month length
            let MonthDays = parseInt(moment(date).endOf('month').format("jD"));
            let daysOfEachWeek = chunkWeek(weekStartDay, MonthDays);
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

        /**
         *
         * @param givenDate
         */
        function setCalendarBody(givenDate = dateNow) {
            let calendarContent = getCalendar(givenDate);
            let dateArray = givenDate.split('/');
            let year = dateArray[0];
            let month = dateArray[1];
            return $calendar.html(
                `<table class='calendar'>
                    <tr class='monthNow'>
                        <th colspan='7'>
                        ${  monthNames[month - 1] } ${year}
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
                </table>`);
        }

        /**
         * make buttons
         */
        let $next = $('<input/>').attr({type: 'button', value: 'next', id: 'next', class: 'button'});
        let $previous = $('<input/>').attr({type: 'button', value: 'previous', id: 'previous', class: 'button'});
        $container.append($previous, $next);

        //button functions
        $(".button").on('click', function () {
            let updatedDate;
            if (this.id === 'next')
                updatedDate = m.add(1, "month");
            else if (this.id === 'previous')
                updatedDate = m.subtract(1, "month");
            setCalendarBody(updatedDate.format(fullYearFormat));
        });
    };
}(jQuery));

