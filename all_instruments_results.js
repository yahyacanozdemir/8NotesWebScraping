const chalk = require("chalk")
const { Console } = require("console")
const { Builder, By, Key, until } = require('selenium-webdriver');
const { promisify } = require('util')
const write_txt_class = require('./write_txt.js')
const write_json_class = require('./write_json.js')

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { example } = require("yargs");
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());


let allInstrumentsArray = ["piano", "guitar", "violin", "flute", "clarinet", "saxophone",
    "voice", "trumpet", "viola", "trombone", "cello", "drums", "percussion",
    "recorder", "oboe", "bass_guitar", "french_horn", "bassoon", "tuba",
    "double_bass", "euphonium", "banjo", "mandolin", "ukulele", "harp",
    "soprano_saxophone", "tenor_saxophone", "baritone_saxophone",
    "bass_clarinet", "tin_whistle", "alto_recorder", "ocarina_-_four_hole",
    "ocarina_-_six_hole", "baritone_horn", "tenor_horn", "vocal_duet", "choir",
    "soprana_voice", "mezzo_soprano_voice", "tenor_voice", "baritone_voice",
    "bass_voice", "orchestra", "harmonica", "organ", "harpsichord", "accordion",
    "handbells",
]
let allCategoriesArray = ["classical", "rock_and_pop", "traditional", "film", "weddings", "christmas", "funerals",
    "childrens", "christian", "improvisation"
]

let allArtistsArray = ["bach", "beethoven", "mozart", "Tchaikovsky", "joplin", "chopin",
    "vivaldi", "bruce", "handel", "satie", "faure"
]

let paginationArray = [];
var totalPageNumber = 1;
let link = "";
let newLink = "";

const fetchAllInstruments = async function() {

    console.log(" ")
    console.log(chalk.green.inverse("Tüm Site İçeriği İçin Arama Yapılmaktadır."))
    console.log(" ")

    for (var index = 0; index < allCategoriesArray.length; index++) {
        var category = allCategoriesArray[index];
        param = "all/" + category.toLowerCase() + "/sheet_music/";
        link = 'https://www.8notes.com/' + param;
        await lookAtPage(category, link);
    }

    for (var index = 0; index < allArtistsArray.length; index++) {
        var artist = allArtistsArray[index];
        param = artist.toLowerCase() + ".asp";
        link = 'https://www.8notes.com/' + param;
        await lookAtPage(artist, link);
    }

    for (var index = 0; index < allInstrumentsArray.length; index++) {
        var instrument = allInstrumentsArray[index];
        param = instrument.toLowerCase() + "/sheet_music/";
        link = 'https://www.8notes.com/' + param;
        await lookAtPage(instrument, link);
    }

}

const lookAtPage = async function(value, link) {

    try {
        var driver = new webdriver.Builder().forBrowser('chrome').build();
        await driver.get(link);

        // Pagination works
        try {
            let pageNumbersArea = await driver.findElement(By.css('.pagination'));
            let ulArea = await pageNumbersArea.findElement(By.tagName('ul'));
            let liTags = await ulArea.findElements(By.tagName("li"));
            for (let li of liTags) {
                paginationArray.push(await li.getText());
            }
            totalPageNumber = parseInt(paginationArray[paginationArray.length - 2], 10);
        } catch (err) {
            console.log(chalk.white.inverse("Pagination Part : " + value + " has got only 1 page content."));
        }

        for (var page = 1; page <= totalPageNumber; page++) {
            newLink = link + "?page=" + page;
            await driver.get(newLink);
            let body = await driver.findElement(By.tagName('tbody'));
            let local_pieces = await body.findElements(By.tagName("tr"));
            for (let e of local_pieces) {
                let link = await e.getAttribute("onclick");
                let link_split = link.split("'")[1];
                let title = await e.getText();
                const data = title + ": " + link_split + '\n';
                //write_txt_class.writeTXT("Tüm Site İçeriği 3", "", data);
                //write_json_class.insertJson("Tüm Site İçeriği 3", value, title, link_split);
            }
            await sleep(1500);
        }
    } catch (error) {
        console.log(chalk.red.inverse(error));
    } finally {
        driver.close();
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    fetchAllInstruments: fetchAllInstruments,
}