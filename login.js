const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', createUser);

const signupFeedback = document.querySelector('#feedback-msg-signup');
const signupModal = new bootstrap.Modal(document.querySelector('#modal-signup'));

//create a password-based account
function createUser(event) {
    event.preventDefault();
    const email = signupForm['input-email-signup'].value;
    const pwd = signupForm['input-password-signup'].value;
    
    firebase.auth().createUserWithEmailAndPassword(email, pwd)
    .then(() => {
        signupFeedback.style = `color:green`;
        signupFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Signup completed.`;
        setTimeout(function(){
            signupModal.hide()
            signupForm.reset();
            signupFeedback.innerHTML = ``;
            window.location.href = "./createname.html"
        }, 1000);
    })
    .catch((error) => {
        signupFeedback.style = `color:crimson`;
        signupFeedback.innerHTML =  `<i class="bi bi-exclamation-triangle-fill"></i> ${error.message}`;
        signupForm.reset();
    });
}

const btnCancel = document.querySelectorAll('.btn-cancel').forEach(btn =>{
    btn.addEventListener('click', ()=>{
        signupForm.reset();
        signupFeedback.innerHTML = ``;
        loginForm.reset();
        loginFeedback.innerHTML = ``;
    })
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
    } else {
    console.log('Unavailable user')
    }
});

// const btnLogout = document.querySelector('#btnLogout');
// btnLogout.addEventListener('click', ()=>{
//     firebase.auth().signOut();
//     console.log('Logout completed.');
// });

// firebase.auth().onAuthStateChanged((user) => {
//     console.log('User: ', user);
//     getList(user);
//     setupUI(user);
// });

//login
const loginForm = document.querySelector('#login-form');
console.log(loginForm);
loginForm.addEventListener('submit', loginUser);

const loginFeedback = document.querySelector('#feedback-msg-login');
const loginModal = new bootstrap.Modal(document.querySelector('#modal-login'));

//create a password-based account
function loginUser(event) {
    event.preventDefault();
    console.log("123")
    const email = loginForm['input-email-login'].value;
    const pwd = loginForm['input-password-login'].value;
    
    firebase.auth().signInWithEmailAndPassword(email, pwd)
    .then(() => {
        loginFeedback.style = `color:green`;
        loginFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> login successed.`;
        setTimeout(function(){
            loginModal.hide()
            loginForm.reset();
            // window.location.href = "./menu.html"
            loginFeedback.innerHTML = ``;
        }, 1000);
       
    })
    .catch((error) => {
        loginFeedback.style = `color:crimson`;
        loginFeedback.innerHTML =  `<i class="bi bi-exclamation-triangle-fill"></i> ${error.message}`;
        loginForm.reset();
    });
}