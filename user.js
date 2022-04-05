const refuser = firebase.database().ref("users")

refuser.on("value", data => {
    data = data.val()

    const currentuser = firebase.auth().currentUser
    console.log(currentuser);
    console.log(data[currentuser.uid]);
    console.log(data)

    const user = data[currentuser.uid]
    console.log(user.username);

    document.querySelector('#pic-profile img').src = user.profile_picture
    document.querySelector('#nickname p').innerHTML = user.username
})

const btnplay = document.querySelector('#btn-playgame');
btnplay.addEventListener('click', play);
  
function play() {
    setTimeout(function(){
        window.location.href = "./waiting.html"
    }, 1000); 
}

const btnLogout = document.querySelector("#btn-logout");
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut()
    console.log('Logout completed.');
    setTimeout(function(){
        window.location.href = "./index.html"
    }, 1000);
})