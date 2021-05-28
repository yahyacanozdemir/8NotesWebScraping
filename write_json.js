const fs = require('fs')

function insertJson(filename, value, artist, title, diff, pageLink, imgLink, midiLink, about) {
    const jsonFile = loadJson(filename);

    link = "https://www.8notes.com" + pageLink

    jsonFile.push({
        value: value,
        artist: artist,
        title: title,
        difficulty: diff,
        link: pageLink,
        imgLink: imgLink,
        midiLink: midiLink,
        about: about,
    })

    saveJsonFile(filename, jsonFile)

}


const loadJson = (filename) => {

    try {
        const dataBuffer = fs.readFileSync(filename + ".json") // binary 
        const dataJSON = dataBuffer.toString() // string 
        return JSON.parse(dataJSON) //Json object 
    } catch (e) {
        return []
    }

}

const saveJsonFile = (filename, jsonFile) => {
    const dataJSON = JSON.stringify(jsonFile)
    fs.writeFileSync(filename + ".json", dataJSON)

}

module.exports = {
    insertJson: insertJson,
    loadJson: loadJson,
}