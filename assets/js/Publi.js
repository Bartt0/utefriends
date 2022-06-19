
var db = new PouchDB('pubicaciones');
var remoteCouch = 'http://admin:admin@127.0.0.1:5984/publicaciones';

db.changes({
  since: 'now',
  live: true
}).on('change', showPubli);

//--------------------------------------------------
              // imagen
 

//----------------------------------------------


// var input = document.querySelector('formFile');


function registroPublic() {
  var file = document.getElementById('formFile').files[0];
  
  var Publicacion = {
    _id: new Date().toISOString(),
    public : document.getElementById('PubModal').value,
    _attachments: {
      "imagen": {
        type: file.type,
        data: file
      }
    }
   };
         db.put(Publicacion).then(function (result) {
          console.log("Todo bien");
          console.log(result);
        }).catch(function(err){
          //console.log(file);
          console.log("algo salio mal");
          console.log(err);
        }
      ); 
        showPubli();   
  };

//-------------------------------------------------------// 
      function showPubli() {
        db.allDocs({include_docs: true, attachments: true ,descending: true}).then(function(doc) {
          mostrarPubli(doc.rows);
        }).catch(function(err){
          console.log(err);
        });
      }

      function deletPubli(puubliid) {
        db.get(puubliid).then(function(puubli) {
        console.log(puubli);
        db.remove(puubli);
        }).catch(function(err){
          console.log(err);
        });
      }

      function editPubli(puubliid) {
        db.get(puubliid).then(function(doc) {
        console.log(puubli);
        doc.public = document.getElementById('PubModal').value;
        return  db.put(doc);
       
        }).then(function(doc) {
          console.log(doc);
        }).catch(function(err){
          console.log(err);

        });
      }
      
      db.get('mittens').then(function (doc) {
        // update their age
        doc.age = 4;
        // put them back
        return db.put(doc);
      }).then(function () {
        // fetch mittens again
        return db.get('mittens');
      }).then(function (doc) {
        console.log(doc);
      });


      function mostrarPubli(pubicaciones) {
        var ul = document.getElementById('listado');
        ul.innerHTML = '';
        listado = '';
          pubicaciones.forEach(function(puubli) {
            //console.log(puubli.doc._attachments.imagen.data);
            console.log(puubli.doc);
            var fecha = new Date(puubli.doc._id).toLocaleString('es-MX');
            listado += 
      `<!-- post title start -->
     
     <div class="card">
      <div class="post-title d-flex align-items-center">
          <!-- profile picture end -->
          <div class="profile-thumb">
              <a href="#">
                  <figure class="profile-thumb-middle">
                      <img src="assets/images/profile/persona2.jpg" alt="profile picture">
                  </figure>
              </a>
          </div>
          <!-- profile picture end -->
          <div class="posted-author">
              <h6 class="author"><a href="profile.html">Utecan Candelaria</a></h6>
              <span class="post-time">${puubli.doc._id.split('T')[0]}</span>
              <!--// Hora: ${puubli.doc._id.split('T')[1].split('.')[0]}> -->
          </div>
          <div class="post-settings-bar">
              <span></span>
              <span></span>
              <span></span>
              <div class="post-settings arrow-shape">
                  <ul>
                      <li><button>opcion</button></li>
                      <li><button onclick="editPubli();" data-bs-toggle="modal">Editar</button></li>
                      <li><button onclick="deletPubli('${puubli.doc._id}');">Eliminar</button></li>
                  </ul>
              </div>
          </div>
      </div>
      <!-- post title start -->
      <div class="post-content">
          <p class="post-desc">
              ${puubli.doc.public}
          </p>
          <div class="post-thumb-gallery">
              <figure class="post-thumb img-popup"> 
              <a href="">
              <img src="data:image/png;base64,${puubli.doc._attachments.imagen.data}" alt="post image">
              </a>
              </figure>
          </div>
          <div class="post-meta">
              <button class="post-meta-like">
                  <i class="bi bi-heart-beat"></i>
                  <span>You and 201 people like this</span>
                  <strong>201</strong>
              </button>
              <ul class="comment-share-meta">
                  <li>
                      <button class="post-comment">
                          <i class="bi bi-chat-bubble"></i>
                          <span>41</span>
                      </button>
                  </li>
                  <li>
                      <button class="post-share">
                          <i class="bi bi-share"></i>
                          <span>07</span>
                      </button>
                  </li>
              </ul>
          </div>
      </div>
    </div>`;
});
ul.innerHTML = listado;
}




showPubli();

function sync() {
  var opts = {live: true};
  db.sync(remoteCouch,opts);
  
}

if (remoteCouch) {
  sync();
}