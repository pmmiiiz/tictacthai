const refuser = firebase.database().ref("users")
const refroom = firebase.database().ref("rooms")
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
    const currentuser = firebase.auth().currentUser
    let coderandom = Math.floor(Math.random() *9999)
    refroom.once("value", (data)=>{
        data = data.val()
        if (!data || !data[coderandom]){

            refroom.child(coderandom).update({
                code:coderandom,
                playerx:currentuser.uid
            })
            setTimeout(function(){
                window.location.href = "./waiting.html"
            }, 1000); 
        }
        else {
            play()
        }
    })
}

const btnLogout = document.querySelector("#btn-logout");
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut()
    console.log('Logout completed.');
    setTimeout(function(){
        window.location.href = "./index.html"
    }, 1000);
})

const joinwith = document.querySelector(".btnjoinwith")
joinwith.addEventListener("click", joinroom)
function joinroom(){
    const currentuser = firebase.auth().currentUser
    const code = document.querySelector("#roomid").value
    refroom.once("value", (data)=>{
        data = data.val()
        if(data[code]){
            refroom.child(code).update({
                playero:currentuser.uid
            })
            setTimeout(function(){
                window.location.href = "./waiting.html"
            }, 1000);
        }
        else{
            alert("ไม่มีห้องนี้จ้า")
        }
    })
}