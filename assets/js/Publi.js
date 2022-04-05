
var db = new PouchDB('pubicaciones');
var remoteCouch = 'http://admon:admon@127.0.0.1:5984/publicaciones';

db.changes({
  since: 'now',
  live: true
}).on('change', showPubli);







function registroPublic() {
  var Publicacion = {
    _id: new Date().toISOString(),
    public : document.getElementById('PubModal').value,
   };
         db.put(Publicacion).then(function (result) {
          console.log("Todo bien");
          console.log(result);
        }).catch(function(err){
          console.log("algo salio mal");
          console.log(err);
        }
      ); 
        showPubli();   
  };


      function showPubli() {
        db.allDocs({include_docs: true, attachments: true ,descending: true}).then(function(doc) {
          mostrarPubli(doc.rows);
        }).catch(function(err){
          console.log(err);
        });
      }



      function mostrarPubli(pubicaciones) {
        var ul = document.getElementById('listado');
        ul.innerHTML = '';
        listado = '';
          pubicaciones.forEach(function(puubli) {
            console.log(puubli.doc);
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
              <h6 class="author"><a href="profile.html">merry watson</a></h6>
              <span class="post-time">20 min ago</span>
          </div>
          <div class="post-settings-bar">
              <span></span>
              <span></span>
              <span></span>
              <div class="post-settings arrow-shape">
                  <ul>
                      <li><button>opcion</button></li>
                      <li><button>Editar</button></li>
                      <li><button>Eliminar</button></li>
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
                  <a href="assets/images/post/post-1.jpg">
                  <img src="assets/images/post/post-1.jpg" alt="post image">
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