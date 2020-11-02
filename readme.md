# Json to Firestore

## Overview

This project allows for the loading of JSON files into corresponding collections in Firestore.

As of this writing (Sept 2020), there is no Firestore utility to quickly upload a file. 

## Sample Json Data
Go to the following website to generate up to 1000 records of json formatted fake data:

https://www.mockaroo.com/

Then use this data and place in the db folder.

## db Folder
This folder houses the json documents that you want to import.

There are 3 sample files to demonstrate how it works

> Note: Make sure to set the var XXX = [] (top) and export default XXX (bottom) to reflect the collection (ie example.js => var example = [], export default example)

## index.js

In order to run the file correctly, make changes to the Firebase initialize settings (can be housed in a separate config file)
### Firebase project credentials
```
// CONFIG Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "YOUR apiKey HERE",
    authDomain: "YOUR authDomain HERE",
    databaseURL: "YOUR databaseURL HERE",
    projectId: "YOUR projectId HERE",
});
```

To run the file use (uses nodemon [easier for debugging], but it is not necessary): 
npm start or node index

### Results
The data will be posted to the **_collection_** based on the name of the **_data file_** in the db folder.