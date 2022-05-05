let uid = ""
let email = ""
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
     uid = user.uid;
     email = user.email;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  const btnsavename = document.querySelector('#savename');
  btnsavename.addEventListener('click', createname);
  
  function createname() {
      const inputusername = document.querySelector('#username').value;
      console.log(inputusername, uid)
      const image = document.querySelectorAll('.pic img');
      console.log(image[selectnumpic])
      const currentuser = firebase.auth().currentUser
        firebase.database().ref('users/' + currentuser.uid).update({
          username: inputusername,
          email: email,
          profile_picture : image[selectnumpic].src
        }).then(() =>{
          setTimeout(function(){
          window.location.href = "./menu.html"
        }, 1000);
        })
           
  }

