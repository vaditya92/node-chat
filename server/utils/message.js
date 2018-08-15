var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        link: `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Location</a>`,
        createdAt: new Date().getTime()
    }
}
module.exports = {generateMessage,generateLocationMessage};