const chalk = require("chalk")
const { Console } = require("console")
const { Builder, By, Key, until } = require('selenium-webdriver');
const { promisify } = require('util')
const write_txt_class = require('./write_txt.js')
const json_class = require('./write_json.js')
    //const database = require('./database.js')


const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { example } = require("yargs");
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var param = ""
let paginationArray = [];
let totalPageNumber = 1;
let link = "";
let newLink = "";

const searchInstrument = async function(instrument) {
    console.log(" ")
    console.log(chalk.green.inverse(instrument.toUpperCase() + " için arama yapılmaktadır."))
    console.log(" ")
    param = instrument.toLowerCase() + "/classical/sheet_music/";
    link = 'https://www.8notes.com/' + param;
    lookAtPage(instrument, link);

}

const searchStyle = async function(style) {
    console.log(" ")
    console.log(chalk.green.inverse(style.toUpperCase() + " için arama yapılmaktadır."))
    console.log(" ")
    param = "all/" + style.toLowerCase() + "/sheet_music/";
    link = 'https://www.8notes.com/' + param;
    lookAtPage(style, link);
}

const searchArtist = async function(artist) {
    console.log(" ")
    console.log(chalk.green.inverse(artist.toUpperCase() + " için arama yapılmaktadır."))
    console.log(" ")
    param = artist.toLowerCase() + ".asp";
    link = 'https://www.8notes.com/' + param;
    lookAtPage(artist, link);

}


const lookAtPage = async function(value, link) {
    let filename = "";
    let artist = "";
    let title = "";
    let difficult = "";
    let detailPageLink = "";
    let detailPageImgLink = "";
    let detailPageMidiLink = "";
    let detailPageAboutString = "";

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

        //For every page
        for (var page = 1; page <= totalPageNumber; page++) {
            newLink = link + "?page=" + page;

            await driver.get(newLink);
            let body = await driver.findElement(By.tagName('tbody'));
            let local_pieces = await body.findElements(By.tagName("tr"));
            for (let e of local_pieces) {

                //start of scraping music in musics table  
                let link = await e.getAttribute("onclick");
                let link_split = link.split("'")[1];
                title = await e.getText();
                let artistclass = await e.findElement(By.className("artname"));
                artist = await artistclass.getText();
                let difficultimg = await e.findElement(By.className("difflevel"));
                difficult = await difficultimg.getAttribute("title");
                filename = value;
                //write_txt_class.writeTXT(value,page,link_split);

                //end of scraping music in musics table  

                //start of detail page scraping
                try {
                    var driver2 = new webdriver.Builder().forBrowser('chrome').build();
                    detailPageLink = 'https://www.8notes.com/' + link_split;
                    await driver2.get(detailPageLink);


                    //start of portreImg scraping
                    //let main = await driver2.findElement(By.tagName('main'));
                    let mainscore = await driver2.findElement(By.id("mainscore"));
                    let imgdiv = await mainscore.findElement(By.className("img-container"));
                    let img = await imgdiv.findElement(By.id("score"));
                    detailPageImgLink = await img.getAttribute("src");
                    //end of portreImg scraping


                    //start of midiLink scraping
                    let midiContainer = await driver2.findElement(By.id("midi_container"));
                    let versionList = await midiContainer.findElement(By.className("versionlist"))
                    let midiList = await versionList.findElement(By.className("midi_list"));
                    detailPageMidiLink = await midiList.getAttribute("href");
                    //end of midiLink scraping


                    //start of about scraping
                    let infoBox = await driver2.findElement(By.id("infobox"));
                    let compTable = await infoBox.findElement(By.className("comp_table"));
                    let compTableBody = await compTable.findElement(By.tagName('tbody'));
                    let info_local_pieces = await compTableBody.findElements(By.tagName("tr"));
                    for (let e of info_local_pieces) {
                        detailPageAboutString = detailPageAboutString + " " + await e.getText();
                    }

                    detailPageAboutString = detailPageAboutString.replaceAll("\n", " ");
                    json_class.insertJson(filename, value, artist, title, difficult, detailPageLink, detailPageImgLink, detailPageMidiLink, detailPageAboutString);
                    //end of about scraping
                } catch (error) {
                    console.log(chalk.red.inverse('Detail Page Scraping Error : ' + error));
                } finally {
                    (await driver2).close();
                }
                //end of detail page scraping
            }
            await sleep(1500);
        }
        //const jsonFile = json_class.loadJson(filename);
        //database.insertDatabase(jsonFile);
    } catch (error) {
        console.log(chalk.red.inverse("Musics Page Scraping Error : " + error));
    } finally {
        driver.quit();
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
    searchInstrument: searchInstrument,
    searchArtist: searchArtist,
    searchStyle: searchStyle
}

//mongoDB TEST Command
//node app.js fetch-only --instrument="piano"