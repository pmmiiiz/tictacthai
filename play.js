const refuser = firebase.database().ref("users")
const refroom = firebase.database().ref("rooms")
let roominfo= {} 

refroom.on("value", (data)=>{
    // console.log(data.val());
    const rooms=data.val();
    const currentuser = firebase.auth().currentUser
    for (const roomcode in rooms){
        // console.log(rooms[roomcode]);
        const room=rooms[roomcode];
        // console.log(room["playerx"]);
        // console.log(currentuser);
        if(room["playerx"] == currentuser.uid || room["playero"] == currentuser.uid){
            // console.log("Yeahhhhh");
            roominfo = room
            if(!room.turn){
                refroom.child(roomcode).update({
                    turn: "x"
                })
            }
            setuproom(room)
            checkWinner(room)
            return
        }
        else{
            // console.log("Nooo");
        }
    }
})
function setuproom(room){
    const currentuser = firebase.auth().currentUser
    refuser.child(room.playerx).once("value", (data)=>{
        const user=data.val();
        // console.log(user);
        document.querySelector(".player2 img").src=user["profile_picture"]
        document.querySelector(".player2 .username div").innerHTML=user["username"]
    })
    if(room.playero){
    refuser.child(room.playero).once("value", (data)=>{
        const user=data.val();
        // console.log(user);
        document.querySelector(".player1 img").src=user["profile_picture"]
        document.querySelector(".player1 .username div").innerHTML=user["username"]
    })}
    document.querySelector(".table #turn").innerHTML="Turn : "+room["turn"]
    if(room["table"]){
        for(const table in room["table"]){
            document.querySelector(`#${table}`).innerHTML=room["table"][table]
        }
    }
    if(currentuser.uid == roominfo[`player${roominfo.turn}`]){
        document.querySelector(".table #youturn").style.display = "block" 
    }
    else{
        document.querySelector(".table #youturn").style.display = "none" 
    }
}

document.querySelectorAll(".block").forEach((el)=>{
    el.addEventListener("click", question)
})

function clickxo(){
    const currentuser = firebase.auth().currentUser
    const clickxo = event.target.id
    if(roominfo.winner){
        return
    }
    if (currentuser.uid == roominfo[`player${roominfo.turn}`]){
        if(!roominfo.table || !roominfo["table"][clickxo]){
            refroom.child(roominfo.code).child("table").update({
                [clickxo]: roominfo.turn
            })
            refroom.child(roominfo.code).update({
                turn: roominfo.turn == "x"?"o":"x"
            })
        }
    }
}
function checkWinner(data){
    if (data.winner || !data.table){
        return
    }
    for (const turn of ["x", "o"]){
        win1 = data["table"]["block_0"] == turn && data["table"]["block_1"] == turn && data["table"]["block_2"] == turn 
        win2 = data["table"]["block_3"] == turn && data["table"]["block_4"] == turn && data["table"]["block_5"] == turn 
        win3 = data["table"]["block_6"] == turn && data["table"]["block_7"] == turn && data["table"]["block_8"] == turn 
        win4 = data["table"]["block_0"] == turn && data["table"]["block_3"] == turn && data["table"]["block_6"] == turn 
        win5 = data["table"]["block_1"] == turn && data["table"]["block_4"] == turn && data["table"]["block_7"] == turn 
        win6 = data["table"]["block_2"] == turn && data["table"]["block_5"] == turn && data["table"]["block_8"] == turn 
        win7 = data["table"]["block_0"] == turn && data["table"]["block_4"] == turn && data["table"]["block_8"] == turn 
        win8 = data["table"]["block_2"] == turn && data["table"]["block_4"] == turn && data["table"]["block_6"] == turn 

        if (win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8){
            refroom.child(data.code).update({
                winner: turn
            })
            alert("WINNER " + turn)
            return
        }

        if (data["table"]["block_0"] && data["table"]["block_1"] && data["table"]["block_2"] && data["table"]["block_3"] && data["table"]["block_4"] && data["table"]["block_5"] && data["table"]["block_6"] && data["table"]["block_7"] && data["table"]["block_8"]){
            alert("DRAW")
            return
        }
    }
}

var modal = document.getElementById("qpopup");


function question() {
    modal.style.display = "block";
  }

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}