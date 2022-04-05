//const PouchDb = require("pouchdb-browser");

var db = new PouchDB('usuario');
var remoteCouch = 'http://admin:admin@127.0.0.1:5984/usuario';

// db.info().then(function (info) {
//   document.getElementById('displays').innerHTML = 'We have a database: ' + JSON.stringify(info);
// });
db.changes({
  since: 'now',
  live: true
}).on('change', showAlumnos);

function registroAlumno() {
  var alumno = {
    _id: new Date().toISOString(),
    correo : document.getElementById('correo').value,
    nombre : document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    password: document.getElementById('password').value,
    sexo: document.getElementById('sexo').value,
    edad: document.getElementById('edad').value,
    estado : document.getElementById('estado').value
  };
    db.put(alumno).then(function(result){
    console.log("todo salio bien");
    console.log(result);
  }).catch(function(err){
    console.log("algo salio mal");
    console.log(err);
  });
  showAlumnos();
}

function showAlumnos() {
  db.allDocs({include_docs: true, descending: true}).then(function(doc) {
    mostrarAlumnos(doc.rows);
  }).catch(function(err){
    console.log(err);
  });
}

function mostrarAlumnos(alumnos)
{
  var ul = document.getElementById('alumnos');
    ul.innerHTML = '';
    listado = '';
    alumnos.forEach(function(alumno) {
      console.log(alumno.doc);
      listado += '<li class="list-group-item">'+alumno.doc.nombre+'   '+alumno.doc.apellido+'</li>'; 
    });
    ul.innerHTML = listado;
}

showAlumnos();




// Inicializar una sincronización con el servidor remoto
function sync() {
  var opts = {live: true};
  db.sync(remoteCouch,opts);
  
}

if (remoteCouch) {
  sync();
}