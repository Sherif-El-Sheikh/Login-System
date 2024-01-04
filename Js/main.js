// All Inputs
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
let signUpArray = [];


// base url (localhost)
let pathparts = location.pathname.split("/");
let pathName = location.pathname;
// let hostName = location.hostname;
// let host = location.host;
// console.log(pathparts);
// console.log(pathName);
// console.log(hostName);
// console.log(host);

let baseURL = '/';
for (let i = 0; i < pathparts.length - 1; i++) {
    baseURL += pathparts[i]
}
console.log(baseURL);


// Sign Up

if (localStorage.getItem("users") === null) {
    signUpArray = [];
}else {
    signUpArray = JSON.parse(localStorage.getItem("users"));
};

function signUp() {
    if (isEmpty() === false) {
        signupName.classList.add("is-invalid");
        if(signupName.value !== "" && nameValidation() === true) {
            signupName.classList.remove("is-invalid");
        }
        signupEmail.classList.add("is-invalid");
        if(signupEmail.value !== "" && emailValidation() === true) {
            signupEmail.classList.remove("is-invalid");
        }
        signupPassword.classList.add("is-invalid");
        if(signupPassword.value !== "" && passValidation()  === true) {
            signupPassword.classList.remove("is-invalid");
        }
        document.getElementById('alert').innerHTML = '<span class="text-danger my-4 ">All inputs is required</span>';
        return false
    }
    if (nameValidation() === true && emailValidation() === true && passValidation() === true){
        let userSignUP = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        };
        if (signUpArray.length === 0) {
            signUpArray.push(userSignUP);
            clearInputSignup();
            // setTimeout(function() {location.assign('/index.html');}, 1800);
            setTimeout(function() {location.replace('https://' + location.hostname + baseURL + '/index.html');}, 1800);
            console.log("hi")
            localStorage.setItem("users", JSON.stringify(signUpArray));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successful",
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById('alert').innerHTML = '';
            return true;
        }

        if (isEmailExist() === true) {
            signupEmail.classList.add("is-invalid");
            document.getElementById('emailAlert').innerHTML = '<span class="text-danger">Email already exists</span>';
        }else {
            signupEmail.classList.remove("is-invalid");
        document.getElementById('emailAlert').innerHTML = '';
            signUpArray.push(userSignUP);
            localStorage.setItem("users", JSON.stringify(signUpArray));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successful",
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById('alert').innerHTML = '';
            clearInputSignup();
            setTimeout(function() {location.replace('https://' + location.hostname + baseURL + '/index.html');}, 1800);
            // setTimeout(function() {location.replace('/index.html');}, 1800);
            
        }
    }


}

function clearInputSignup() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

// check inputs is empty or not
function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false;
    } else {
        return true;
    }
}


// check email is exist
function isEmailExist() {
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;
        }
    }
}




// validation
let regexSignupName = /^[A-Za-z].{3,19}$/;
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPass = /^.{5,20}$/;


function nameValidation() {
    if (regexSignupName.test(signupName.value) == false) {
        signupName.classList.add("is-invalid");
        document.getElementById('nameAlert').innerHTML = '<span class="text-danger">start with alphabetic character and at least 4 characters and at most 20 characters</span>';
    }else {
        signupName.classList.remove("is-invalid");
        document.getElementById('nameAlert').innerHTML = '';
        return true;
    }
}


function emailValidation() {
    if (regexEmail.test(signupEmail.value) == false) {
        signupEmail.classList.add("is-invalid");
        document.getElementById('emailAlert').innerHTML = '<span class="text-danger"> <li>Incorrect email address</li> <li>Must be like this: "example@domain.abc"</li> </span>';
    }else {
        signupEmail.classList.remove("is-invalid");
        document.getElementById('emailAlert').innerHTML = '';
        return true;
    }
}

function passValidation() {
    if (regexPass.test(signupPassword.value) == false) {
        signupPassword.classList.add("is-invalid");
        document.getElementById('alert').innerHTML = '<span class="text-danger">at least 5 characters and at most 20 characters</span>';
    }else {
        signupPassword.classList.remove("is-invalid");
        document.getElementById('alert').innerHTML = '';
        return true;
    }
}



// Log In
function logIn() {
    if (isLoginEmpty() === false) {
        signinEmail.classList.add("is-invalid");
        signinPassword.classList.add("is-invalid");
        document.getElementById('logAlert').innerHTML = '<span class="text-danger my-4 ">All inputs is required</span>';
        return false;
    }
    let email = signinEmail.value;
    let password = signinPassword.value;
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            signinEmail.classList.remove("is-invalid");
            signinPassword.classList.remove("is-invalid");
            document.getElementById('logAlert').innerHTML = '';
            // location.replace('/home.html');
            location.replace('https://' + location.hostname + baseURL + '/home.html')
            return true;
        }else {
            if (signUpArray[i].email.toLowerCase() == email.toLowerCase()) {
            signinEmail.classList.remove("is-invalid");
            signinPassword.classList.add("is-invalid");
        document.getElementById('logAlert').innerHTML = '<span class="text-danger my-4 ">Incorrect email or password</span>';
            return true;
            }else {
                signinEmail.classList.add("is-invalid");
            }
            if (signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
                signinPassword.classList.remove("is-invalid");
            signinEmail.classList.add("is-invalid");
        document.getElementById('logAlert').innerHTML = '<span class="text-danger my-4 ">Incorrect email or password</span>';
            return true;
            }else {
                signinPassword.classList.add("is-invalid");
            }
        document.getElementById('logAlert').innerHTML = '<span class="text-danger my-4 ">Incorrect email or password</span>';
        }
    }
}


// check inputs is empty or not
function isLoginEmpty() {
    if (signinEmail.value == "" && signinPassword.value == "") {
        return false
    } else {
        return true
    }
}


// say welcome
let userName = localStorage.getItem('sessionUsername');
let user = document.getElementById('userName');
let seenWelcome = sessionStorage.getItem('seenWelcome');
console.log(seenWelcome)
if (userName && user && !seenWelcome) {
    Swal.fire({
        position: "center",
        title: "Welcome " + userName,
        showConfirmButton: false,
        timer: 1500
    });
    sessionStorage.setItem('seenWelcome', 'true');
}


if(user) {
    user.innerHTML = "Hi, " + userName;
}



// Events
const btnSignIn = document.getElementById("btnSignIn");
if (btnSignIn) {
    btnSignIn.addEventListener("click", function () {
            location.replace('https://' + location.hostname + baseURL + '/index.html')
            // location.replace('/index.html')
    })
}


const btnCreate = document.getElementById("btnCreate");
if (btnCreate) {
    btnCreate.addEventListener("click", function () {
            location.replace('https://' + location.hostname + baseURL + '/signup.html')
            // location.replace('/signup.html')
    })
}


const btnSignUP = document.getElementById("btnSignUp");
if(btnSignUP) {
    btnSignUP.addEventListener("click", signUp);
}

if (signupName) {
    signupName.addEventListener("click", function () {
        signupName.classList.remove("is-invalid");
        document.getElementById('nameAlert').innerHTML = ''
    });
    signupName.addEventListener("input", nameValidation);
}

if (signupEmail) {
    signupEmail.addEventListener("click", function () {
        signupEmail.classList.remove("is-invalid");
        document.getElementById('emailAlert').innerHTML = '';
    });
    signupEmail.addEventListener("keyup", emailValidation);
}

if (signupPassword) {
    signupPassword.addEventListener("click", function () {
        signupPassword.classList.remove("is-invalid");
        document.getElementById('alert').innerHTML = '';
    });
    
    signupPassword.addEventListener("keyup", passValidation)
}

//Event Log In
const btnLogIn = document.getElementById("btnLogIn");
if(btnLogIn) {
    btnLogIn.addEventListener("click", logIn);
}

const btnForget = document.getElementById("btnForget");

if(btnForget) {
    btnForget.addEventListener("click", function () {
        // location.replace('/search.html');
        location.replace('https://' + location.hostname + baseURL + '/search.html')
        
    });
}





// Search Input
const searchEmail = document.getElementById("searchEmail");
const searchPassword = document.getElementById("searchPassword");

// search
function search() {
    let email = searchEmail.value;
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase()) {
            searchPassword.classList.remove("d-none");
            btnSearch.classList.add("d-none");
            btnContinue.classList.remove("d-none");
            return true;
        }
        
    }
}

function replace() {
    let email = searchEmail.value;
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase()) {
            signUpArray[i].password = searchPassword.value;
            console.log(signUpArray[i]);
            localStorage.setItem("users", JSON.stringify(signUpArray));
        }
    }
}

//validation
function searchPassValidation() {
    if (regexPass.test(searchPassword.value) == false) {
        searchPassword.classList.add("is-invalid");
        document.getElementById('searchPassAlert').innerHTML = '<span class="text-danger">at least 5 characters and at most 20 characters</span>';
    }else {
        searchPassword.classList.remove("is-invalid");
        document.getElementById('searchPassAlert').innerHTML = '';
        return true;
    }
}

// Event Search
const btnSearch = document.getElementById("btnSearch");
if (btnSearch) {
    btnSearch.addEventListener("click", function () {
        search();
        if (!search()) {
            document.getElementById('searchAlert').innerHTML = '<span class="text-danger">Incorrect email addresse</span>';
        }else {
            document.getElementById('searchAlert').innerHTML = '';
            searchEmail.setAttribute("readonly", "true");
            searchEmail.classList.add("search-focus");
        }
    });
}

if(searchPassword) {
    searchPassword.addEventListener("keyup", searchPassValidation)
}

const btnContinue = document.getElementById("btnContinue");
if (btnContinue) {
    btnContinue.addEventListener("click", function () {
        if (regexPass.test(searchPassword.value) == true) {
            replace();
            location.replace('https://' + location.hostname + baseURL + '/index.html')
            // location.replace('/index.html')
        }
    });
}

//Log Out
function logout() {
    localStorage.removeItem('sessionUsername');
    sessionStorage.removeItem('seenWelcome');
}

//Event LogOut
const btnLogOut = document.getElementById("btnLogOut");
if(btnLogOut) {
    btnLogOut.addEventListener("click", function() {
        logout();
        location.replace('https://' + location.hostname + baseURL + '/index.html')
        // location.replace('/index.html')
    });
}

// Delete Account
function deleteAccount() {
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].name.toLowerCase() == userName.toLowerCase()) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                }).then(() => {
                    signUpArray.splice(i,1);
                    localStorage.setItem("users", JSON.stringify(signUpArray));
                    localStorage.removeItem('sessionUsername');
                    sessionStorage.removeItem('seenWelcome');
                    location.replace('https://' + location.hostname + baseURL + '/index.html')
                    // location.replace('/index.html')
                });
                }
            });
        }
    }
}

//Event Delete Account
const btnDeleteAccount = document.getElementById("btnDeleteAccount");
if(btnDeleteAccount) {
    btnDeleteAccount.addEventListener("click", deleteAccount)
}