const fs = require('fs')

function writeTXT(value, page, data) {
    if (page != "")
        fs.appendFile(value + '.txt', page, err => {
            if (err) {
                console.error(err)
                return
            }
        })
    if (data != "")
        fs.appendFile(value + '.txt', data, err => {
            if (err) {
                console.error(err)
                return
            }
            //file written successfully
        })
}

module.exports = {
    writeTXT: writeTXT,
}