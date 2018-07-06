const eventModel = require('./eventModel');
const e = new eventModel();

const getEvents = function () {
    return new Promise((resolve, reject) => {
        const eventsByDate = {}

        eventModel.find({}, function (err, events) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                events.map((event) => {
                    if (eventsByDate[event["date"]] === undefined) {
                        eventsByDate[event["date"]] = [];
                    }
                    eventsByDate[event["date"]].push(event);
                });
                resolve(eventsByDate);
            }
        })
    })


}
const addEvent = function (body) {
    return new Promise((resolve, reject) => {

        e.date = body.date;
        e.starttime = body.starttime;
        e.endtime = body.endtime;
        e.description = body.description;

        e.save((err) => {
            if (err) {
                reject(err);
            }
            resolve({ message: "created!" });
        });
    });
}

module.exports = { addEvent, getEvents };