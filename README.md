# Term Project for BTU BLM0470 Web Programming with Node.js
This node.js program scrapes www.8notes.com with selenium web driver and stores the resulting data in MongoDB, txt file or json file.

    Web scraping refers to the extraction of data from a website. 
    This information is collected and then exported into a format that is more useful for the user. 
    Be it a spreadsheet, json file, txt file, database collection or an API.

![web-scraping-attack](https://user-images.githubusercontent.com/43846778/120050147-02e7ca00-c025-11eb-8401-03d69f6eda8e.jpg)
##

## Installations
* First of all you should have an IDE (VSCODE etc.) : [VSCode](https://code.visualstudio.com/)
* Download and Install Node.js : [Download Link](https://nodejs.org/en/)
* Download and install MongoDB : [Windows-x86_64-4.4.4-signed.msi](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.4-signed.msi)
* For your Node.js, you should install npm from IDE terminal with the folowing command :
               
        npm install -g npm
        
* After installing npm, you should install the Selenium webdriver module from npm with the following command (This version of ChromeDriver only supports Chrome version 89 for now) :

        npm i selenium-webdriver

* Finally, you can download the yargs packet on npm (project in this repo uses yargs package) : 

        npm i yargs
        
##

## Attention

* This program stores your query result as json file then saves it to MongoDB. This feature can needs a local MongoDB account or require configure for database. You can easily configure the database on the database.js file. 
* If you want to test program but don't want to any database connections you can activate comment codes (write_txt_class.writeTXT etc.) or you can comment database codes (const jsonFile = json_class.loadJson(filename); database.insertDatabase(jsonFile);) in result.js file.

* MongoDB connection tested with only the following command :

        node app.js fetch-only --instrument="piano"      


##

## Project Test Commands
* Artist Query :

        node app.js fetch-only --artist="mozart" 
        
* Query for Instrumant :

        node app.js fetch-only --instrument="piano" 
        
* Query for Style  :

        node app.js fetch-only --style="classical"
        

* Query for All Content of Website  :

        node app.js fetch-all
        
##

## Images
![mongodb1](https://user-images.githubusercontent.com/43846778/120052566-9a054f80-c02e-11eb-9060-a844fc46ac7d.jpg)
![mongoDB2](https://user-images.githubusercontent.com/43846778/120052729-59f29c80-c02f-11eb-9f2b-693fccd31538.jpg)
![mongoDB3](https://user-images.githubusercontent.com/43846778/120052733-5c54f680-c02f-11eb-99a6-956a613e3ccc.jpg)






