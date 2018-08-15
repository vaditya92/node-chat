var generateMessage = (from, to) => {
    return {
        from,
        to,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage};