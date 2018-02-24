"use strict";

// function that creates dummy data for demonstration
function createDummyData() {
    var date = new Date();
    var data = {};

    for (var i = 0; i < 2; i++) {
        data[date.getFullYear() + i] = {};

        for (var j = 0; j < 12; j++) {
            data[date.getFullYear() + i][j + 1] = {};

            for (var k = 0; k < Math.ceil(Math.random() * 10); k++) {
                var l = Math.ceil(Math.random() * 28);

                try {
                    data[date.getFullYear() + i][j + 1][l].push({
                        startTime: "10:00",
                        endTime: "12:00",
                        text: "Some Event Here"
                    });
                } catch (e) {
                    data[date.getFullYear() + i][j + 1][l] = [];
                    data[date.getFullYear() + i][j + 1][l].push({
                        startTime: "10:00",
                        endTime: "12:00",
                        text: "Some Event Here"
                    });
                }
            }
        }
    }

    return data;
}

// creating the dummy static data
var data = createDummyData();

// initializing a new calendar object, that will use an html container to create itself

// initializing a new organizer object, that will use an html container to create itself
