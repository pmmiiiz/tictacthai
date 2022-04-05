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
    document.querySelector('#nickname div').innerHTML = user.username

})

const btnjoin = document.querySelector('#join-x');
btnjoin.addEventListener('click', ready);

function ready() {
    document.querySelector('#readyjoin').innerHTML = "พร้อมแล้ว!!!"
    document.querySelector('#readyjoin').style.color = "#FB4D44"
    document.querySelector('#join-x').disabled = true;
    document.querySelector('#join-x').classList.add("disabled")
    document.querySelector('#cancel-x').disabled = false;
    document.querySelector('#cancel-x').classList.remove("disabledd")
}

const btncancel = document.querySelector('#cancel-x');
btncancel.addEventListener('click', cancel);
  
function cancel() {
    document.querySelector('#readyjoin').innerHTML = "รอก่อน..."
    document.querySelector('#readyjoin').style.color = "#E7BD4F"
    document.querySelector('#cancel-x').disabled = true;
    document.querySelector('#cancel-x').classList.add("disabledd")
    document.querySelector('#join-x').disabled = false;
    document.querySelector('#join-x').classList.remove("disabled")
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
    let coderandom = Math.floor(Math.random() *9999)
    document.querySelector('#coderan').innerHTML = coderandom
}

const btnclose = document.querySelector('#closepopup');
btnclose.addEventListener('click', closepopup);


function closepopup() {
    document.querySelector('#popupwaiting').style.display = "none"
}



