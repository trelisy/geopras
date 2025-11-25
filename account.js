
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBpfkkOznjSvyyaEWNsG00huwlA8ObY6j8",
        authDomain: "chat-80d74.firebaseapp.com",
        databaseURL: "https://chat-80d74-default-rtdb.firebaseio.com",
        projectId: "chat-80d74",
        storageBucket: "chat-80d74.appspot.com",
        messagingSenderId: "1085559718603",
        appId: "1:1085559718603:web:c7a9a7f26b1535d080514e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    // Fetch data from Firebase and render it dynamically
    window.onload = function() {
      getdata();
    };
  
    function getdata() {
      firebase.database().ref('news/').once('value').then(function(snapshot) {
        var posts_div = document.getElementById('posts');
        posts_div.innerHTML = "";  // Clear the existing posts
  
        var data = snapshot.val();
        for (let [key, value] of Object.entries(data)) {
          posts_div.innerHTML += `
            <div class="col-lg-4 py-2 wow zoomIn">
              <div class="card-blog">
                <div class="header">
                  <div class="post-category">
                    <a href="#">ახალი</a>
                  </div>
                  <a href="blog-details.html" class="post-thumb">
                    <img src="${value.imageURL}" alt="">
                  </a>
                </div>
                <div class="body">
                  <h5 class="post-title"><a href="blog-details.html">${value.text}</a></h5>
                  <div class="site-info">
                    <div class="avatar mr-2">
                      <div class="avatar-img">
                        <img src="assets/logoGeopras.jpg" alt="">
                      </div>
                      <span>GeoPras</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>`;
        }
      });
    }
    
    db.collection('news').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      let newsSection = document.getElementById('newsSection');
      newsSection.innerHTML = '';
      snapshot.forEach(doc => {
        let news = doc.data();
        newsSection.innerHTML += 
          <div class="news-item">
            <h3>${news.title}</h3>
            <p>${news.content}</p>
          </div>
        ;
      });
    });