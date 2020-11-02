// ******************** IMPORTANT *************************
// If you are using node < 13, then you must have the following in your package.json:
// "type": "module"
// As of this writing (Sept 2020), Node version on Firebase functions is 12 (beta)

import firebase from 'firebase'
import fs from 'fs'
import path from 'path'

// CONFIG Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: "YOUR apiKey HERE",
//   authDomain: "YOUR authDomain HERE",
//   databaseURL: "YOUR databaseURL HERE",
//   projectId: "YOUR projectId HERE",
// });

const dirData = './db'
const db = firebase.firestore();

// Loop through all the files in the data directory
fs.readdir(dirData, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }
  
    files.forEach(function (file, index) {
      // Make one pass and make the file complete
      const dirPath = path.join(dirData, file);

    // Read the data directory for any files (subsequently, *.js files are filtered out)
    fs.readFile(dirPath, 'utf8',  (err, data) => {
        if (err) {
          return console.log(err);
        }

        const fsCollection  = path.basename(dirPath, '.js')
        // importing the data file as a module
        const moduleSpecifier =  dirData + '/' + file
        console.log(moduleSpecifier);

        import(moduleSpecifier)
          .then((module) => {
            let data = module.default
            loadFirestoreData(data, fsCollection);

          })
      });
    });
  });

function loadFirestoreData(data, fsCollection) {
   data.forEach((obj) => {
      db.collection(fsCollection).add(
          { ...obj }
      ).then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
          .catch(function (error) {
              console.error("Error adding document: ", error);
          });
  });
}
