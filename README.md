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
        
* After installing npm, you should install the Selenium webdriver module from npm with the following command :

        npm i selenium-webdriver

* Finally, you can download the yargs packet on npm (project in this repo uses yargs package) : 

        npm i yargs
        
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
        




![mongodb1](https://user-images.githubusercontent.com/43846778/120050119-e0ee4780-c024-11eb-8fb2-9fbeb11d66f6.png)
![mongodb2](https://user-images.githubusercontent.com/43846778/120050110-ddf35700-c024-11eb-93d3-dcbaac16f82f.png)
![mongodb3](https://user-images.githubusercontent.com/43846778/120050112-de8bed80-c024-11eb-8ea9-b7640a443b15.png)
![mongodb4](https://user-images.githubusercontent.com/43846778/120050113-df248400-c024-11eb-8b30-e84912e0c3c0.png)
![mongodb5](https://user-images.githubusercontent.com/43846778/120050114-dfbd1a80-c024-11eb-8bbe-5a4d851070a4.png)
![8notesList](https://user-images.githubusercontent.com/43846778/120050115-dfbd1a80-c024-11eb-9b14-70c9772ac107.png)
![8notesDetail1](https://user-images.githubusercontent.com/43846778/120050117-e055b100-c024-11eb-84e2-d0d17cab7c52.png)
![8notesDetail2](https://user-images.githubusercontent.com/43846778/120050118-e0ee4780-c024-11eb-9597-2924b4314551.png)






