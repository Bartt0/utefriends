//const PouchDB = require("pouchdb");




var db = new PouchDB('http://127.0.0.1:5984/usuario', {skip_setup: true});
function login(){
  
  db.logIn(document.getElementById('correo1').value, document.getElementById('password1').value).then(function (batman) {
    console.log("I'm Batman.");
    console.log(batman);
    return db.logOut();
  });
}

//loguearse con pouchdb

function logIn(){
  

}