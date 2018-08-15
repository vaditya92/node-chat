const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        link: `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Location</a>`,
        createdAt: moment().valueOf()
    }
}
module.exports = {generateMessage,generateLocationMessage};