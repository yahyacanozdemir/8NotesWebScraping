const chalk = require('chalk')
const yargs = require('yargs')
const { describe } = require('yargs')
const { type } = require('os')
const { argv, title } = require('process')
const result = require('./result.js')
const all_instruments_results = require('./all_instruments_results.js')


yargs.command(
    {
        command: 'fetch-only',
        describe: 'Listele',
        builder: {
            instrument: {
                describe: "Enstrümana Göre Arama Yap",
                demandOption: false, 
                type: "string", 
            },
            artist: {
                describe: "Yazara Göre Arama Yap",
                demandOption: false, 
                type: "string",
            },
            style: {
                describe: "Stile Göre Arama Yap",
                demandOption: false, 
                type: "string",
            },
        }
        ,
        handler(argv) {
            if(argv.instrument)
            result.searchInstrument(argv.instrument)
            else if(argv.artist)
            result.searchArtist(argv.artist)
            else if (argv.style)
            result.searchStyle(argv.style)
        }
    }
)

yargs.command(
    {
        command: 'fetch-all',
        describe: 'Tüm Enstrüman Türleri, Alt Başlıkları ve Alt Başlık Linkleri',
        handler(argv) {
            all_instruments_results.fetchAllInstruments();
        }
    }
)
yargs.parse()