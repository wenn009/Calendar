const eventModel = require('./eventModel');
const e = new eventModel();

const addEvent= function (body) {
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

module.exports = { addEvent};