const refuser = firebase.database().ref("users")
const refroom = firebase.database().ref("rooms")
const goback = document.querySelector('.btnback')
const backmenu = document.querySelector('.btnbackmenu')
let roominfo= {} 
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

backmenu.addEventListener('click', backme);
function backme() {
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
    document.querySelector(".table #turn").innerHTML="Turn : "+(room["turn"]??"x")
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

function clickxo(key){
    const currentuser = firebase.auth().currentUser
    // const clickxo = event.target.id
    if(roominfo.winner){
        return
    }
    if (currentuser.uid == roominfo[`player${roominfo.turn}`]){
        if(!roominfo.table || !roominfo["table"][key]){
            refroom.child(roominfo.code).child("table").update({
                [key]: roominfo.turn
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
            // alert("WINNER " + turn)
            document.querySelector("#finishpopup").style.display = "block"
            document.querySelector('#winner').innerHTML = "WINNER : " + turn
            return
        }

        if (data["table"]["block_0"] && data["table"]["block_1"] && data["table"]["block_2"] && data["table"]["block_3"] && data["table"]["block_4"] && data["table"]["block_5"] && data["table"]["block_6"] && data["table"]["block_7"] && data["table"]["block_8"]){
            document.querySelector("#finishpopup").style.display = "block"
            document.querySelector('#winner').innerHTML = "เสมอกันจ้า"
            return
        }
    }
}

var modal = document.getElementById("qpopup");


function question() {
    const currentuser = firebase.auth().currentUser
    if(currentuser.uid != roominfo[`player${roominfo.turn}`]){
        return
    }
    modal.style.display = "block";
    // console.log(event.target.id);
    const vocabbox = roominfo.vocabs[event.target.id]
    let randombox = [
        vocabbox.correct,
        vocabbox.wrong1,
        vocabbox.wrong2,
        vocabbox.wrong3
    ]
    console.log(randombox);
    for (let i = randombox.length - 1; i > 0; i--) {
        let j = Math.floor((Math.random() * (randombox.length - 1)));
        const temp = randombox[i];
        randombox[i] = randombox[j];
        randombox[j] = temp;
    }
        
        
    // console.log(data);
    document.querySelector('.question').value = event.target.id
    document.querySelector('.ans1').innerHTML = randombox[0]
    document.querySelector('.ans2').innerHTML = randombox[1]
    document.querySelector('.ans3').innerHTML = randombox[2]
    document.querySelector('.ans4').innerHTML = randombox[3]

    console.log(vocabbox.correct);
    let count = 4;
    let timerId = setInterval(() => {
    document.querySelector('#time').innerHTML = count
        if (count == 0) {
            modal.style.display = "none";
            document.querySelector('#time').innerHTML = "5"
            clearInterval(timerId);
            // refroom.child(roominfo.code).update({
            //     turn: roominfo.turn == "x"?"o":"x"
            // })
        }
    count--;
    }, 1000);

  }
  
  
  document.querySelectorAll(".answer").forEach((el)=>{
    el.addEventListener("click", checkans)
})


function checkans() {
    // document.querySelectorAll(".block").forEach((el)=>{
    //     el.addEventListener("click", clickxo)
    // })
    console.log(event.target.innerHTML);
    console.log(event.target.parentNode.value);
    if(event.target.innerHTML==roominfo.vocabs[event.target.parentNode.value].correct){
        console.log("good");
        var audio = new Audio('sound/correct.wav');
        audio.play();
        clickxo(event.target.parentNode.value)
    }
    else{
        console.log("bad");
        var audio = new Audio('sound/wrong.mp3');
        audio.play();
        refroom.child(roominfo.code).update({
            turn: roominfo.turn == "x"?"o":"x"
        })
    }
    modal.style.display = "none";
    document.querySelector('#time').innerHTML = "5"
}
