const refuser = firebase.database().ref("users")
const refroom = firebase.database().ref("rooms")
const goback = document.querySelector('.btnback')

goback.addEventListener('click', backback);
function backback() {
    let exit = false
    let roomcode;
    const currentuser = firebase.auth().currentUser
    refroom.once("value", (data)=>{
        data = data.val()
        for(const rcode in data){
            console.log(data[rcode]);
            if (currentuser.uid == data[rcode].playerx){
                refroom.child(rcode).child("playerx").remove()
                exit=true
                roomcode = rcode
                return
                
            }
            else if (currentuser.uid == data[rcode].playero){
                refroom.child(rcode).child("playero").remove()
                exit=true
                roomcode = rcode
                return
            }
            
        }
    })
    refroom.once("value", (data)=>{
        data = data.val()
        if(roomcode && !data[roomcode].playerx && !data[roomcode].playero){
            refroom.child(roomcode).remove()
            alert("remove");
        }
        if (exit==true) {
            window.location.href = "./menu.html"
        }
    })
  
}
const btnjoinx = document.querySelector('#join-x');
btnjoinx.addEventListener('click', readyx);

function readyx() {
    document.querySelector('#readyjoinx').innerHTML = "พร้อมแล้ว!!!"
    document.querySelector('#readyjoinx').style.color = "#FB4D44"
    document.querySelector('#join-x').disabled = true;
    document.querySelector('#join-x').classList.add("disabled")
    document.querySelector('#cancel-x').disabled = false;
    document.querySelector('#cancel-x').classList.remove("disabledd")
    console.log("xอยู่จ้า");
}

const btncancelx = document.querySelector('#cancel-x');
btncancelx.addEventListener('click', cancelx);
  
function cancelx() {
    document.querySelector('#readyjoinx').innerHTML = "รอก่อน..."
    document.querySelector('#readyjoinx').style.color = "#E7BD4F"
    document.querySelector('#cancel-x').disabled = true;
    document.querySelector('#cancel-x').classList.add("disabledd")
    document.querySelector('#join-x').disabled = false;
    document.querySelector('#join-x').classList.remove("disabled")
}

const btnjoino = document.querySelector('#join-o');
btnjoino.addEventListener('click', readyo);

function readyo() {
    document.querySelector('#readyjoino').innerHTML = "พร้อมแล้ว!!!"
    document.querySelector('#readyjoino').style.color = "#FB4D44"
    document.querySelector('#join-o').disabled = true;
    document.querySelector('#join-o').classList.add("disabled")
    document.querySelector('#cancel-o').disabled = false;
    document.querySelector('#cancel-o').classList.remove("disabledd")
    console.log("oอยู่จ้า");
}

const btncancelo = document.querySelector('#cancel-o');
btncancelo.addEventListener('click', cancelo);
  
function cancelo() {
    document.querySelector('#readyjoino').innerHTML = "รอก่อน..."
    document.querySelector('#readyjoino').style.color = "#E7BD4F"
    document.querySelector('#cancel-o').disabled = true;
    document.querySelector('#cancel-o').classList.add("disabledd")
    document.querySelector('#join-o').disabled = false;
    document.querySelector('#join-o').classList.remove("disabled")
}

const btnstart = document.querySelector('#btn-startgame');
btnstart.addEventListener('click', start);
  
function start() {
    setTimeout(function(){
        window.location.href = "./play.html"
    }, 1000); 
}
const btninvite = document.querySelector('#invite');
btninvite.addEventListener('click', btninvitepopup);

function btninvitepopup() {
    document.querySelector('#popupwaiting').style.display = "flex"  
}
refroom.on("value", (data)=>{
    data = data.val()
    const currentuser = firebase.auth().currentUser
    for(const r in data){
        const room = data[r]
        console.log(room);
        if (room.playerx == currentuser.uid || room.playero == currentuser.uid) {
            refuser.child(room.playerx).on("value", user => {
            user = user.val()
            document.querySelector('#pic-profile img').src = user.profile_picture
            document.querySelector('#nickname div').innerHTML = user.username
        })
        document.querySelector('#coderan').innerHTML = room.code 
        refuser.child(room.playero).on("value", user => {
            user = user.val()
            document.querySelector('#invite img').src = user.profile_picture
            document.querySelector('.username-o div').innerHTML = user.username
            document.querySelector('#join-o').style.opacity = "1"
            document.querySelector('#cancel-o').style.opacity = "1"
            document.querySelector('.username-o').style.opacity = "1"
            document.querySelector('.btnjoin-o').style.cursor = "pointer"
            document.querySelector('.btncancel-o').style.cursor = "pointer"
            document.querySelector('#invitefr').style.display = "none"
            document.querySelector('#readyjoino').style.display = "block"
        })
        }
        
    }
})
const btnclose = document.querySelector('#closepopup');
btnclose.addEventListener('click', closepopup);

function closepopup() {
    document.querySelector('#popupwaiting').style.display = "none"
}



