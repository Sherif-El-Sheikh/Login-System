var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var alertBox = document.querySelector(".alert-box");
var siteList = [];
var classNameSite = siteName.classList;
var classUrlSite = siteUrl.classList;

// create
if (localStorage.getItem("list") !== null) {
    siteList = JSON.parse(localStorage.getItem("list"));
    display();
}

function createSite() {
    if(siteName.classList.contains("is-valid") &&
        siteUrl.classList.contains("is-valid")) {
        var site = {
            sname: siteName.value,
            url: siteUrl.value,
            };
            if (siteList.length === 0) {
                siteList.push(site);
                clearInput();
                display();
                localStorage.setItem("list", JSON.stringify(siteList));
                classNameSite.remove("is-valid");
                classUrlSite.remove("is-valid");
                successAlert();
                console.log(site);
                console.log(siteList);
            }
            if (checkRepeat()) {
                checkRepeat();
            }else if(checkRepeat() === false) {
                siteList.push(site);
                clearInput();
                display();
                localStorage.setItem("list", JSON.stringify(siteList));
                classNameSite.remove("is-valid");
                classUrlSite.remove("is-valid");
                successAlert();
                console.log(site);
                console.log(siteList);
            }
    }else {
        alertBox.classList.remove("d-none");
    }
}

function clearInput() {
    siteName.value = "";
    siteUrl.value = "";
    classNameSite.remove("is-valid");
    classUrlSite.remove("is-valid");
}

// Retrieve
function display() {
var trs = ``;
for (var i = 0; i < siteList.length; i++) {
    trs += `
        <tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${siteList[i].sname}</td>
        <td>
            <a href="${siteList[i].url}" target="_blank">
                <button class="btn btn-visit text-center">
                    <i class="fa-solid fa-eye "></i>
                </button>
            </a>
        </td>
        <td>
            <button onclick="indexSite(${i})" class="btn btn-update text-center">
                <i class="fa fa-edit"></i>
            </button>
        </td>
        <td>
            <button onclick="deleteSite(${i})" class="btn btn-delete text-center">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>
    </tr>`;
}
document.getElementById("tableBody").innerHTML = trs;
}


// checkrepeat
function checkRepeat() {
    if(siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")) {
    var site = {
        sname: siteName.value,
        url: siteUrl.value,
        };
        for (var i = 0; i < siteList.length; i++) {
            if(siteList[i].sname.includes(site.sname) === true || siteList[i].url.includes(site.url) === true) {
                Swal.fire({
                    title: "The name or url already exists",
                    text:"Do you want to save anyway?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                    Swal.fire("Saved!", "", "success");
                    siteList.push(site);
                    clearInput();
                    display();
                    localStorage.setItem("list", JSON.stringify(siteList));
                    classNameSite.remove("is-valid");
                    classUrlSite.remove("is-valid");
                    } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                    }
                });
            } else {
                return false;
            }
        }
    }
}

// Delete
function deleteSite(index) {
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
            icon: "success"
        });
        siteList.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(siteList));
        display();
        btnSubmit.classList.remove("d-none");
        updateBtn.classList.add("d-none");
        siteName.value = "";
        siteUrl.value = "";
        classNameSite.remove("is-valid");
        classUrlSite.remove("is-valid");
        }
    });
}

//search
var searchInput = document.getElementById("searchInput");
// function search() {
//     var searchValue = searchInput.value;
//     var trs = ``;
//     for (var i = 0; i < siteList.length; i++) {
//         if (siteList[i].sname.toLowerCase().includes(searchValue.toLowerCase()) === true) {
//             trs += `
//             <tr>
//             <td>${i + 1}</td>
//             <td class="text-capitalize">${siteList[i].sname}</td>
//             <td>
//                 <a href="${siteList[i].url}" target="_blank">
//                     <button class="btn btn-visit text-center">
//                         <i class="fa-solid fa-eye "></i>
//                     </button>
//                 </a>
//             </td>
//             <td>
//                 <button onclick="indexSite(${i})" class="btn btn-update text-center">
//                     <i class="fa fa-edit"></i>
//                 </button>
//             </td>
//             <td>
//                 <button onclick="deleteSite(${i})" class="btn btn-delete text-center">
//                     <i class="fa-solid fa-trash-can"></i>
//                 </button>
//             </td>
//         </tr>`;
//     }
// }
// document.getElementById("tableBody").innerHTML = trs;
// }

function searchFalse() {
    var searchValue = searchInput.value;
    var trs = ``;
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].sname.toLowerCase().includes(searchValue.toLowerCase()) === false) {
            document.getElementById("tableBody").innerHTML = trs;
        } else {
            trs += `
            <tr>
            <td>${i + 1}</td>
            <td class="text-capitalize"><mark class="highlight">${siteList[i].sname}</mark></td>
            <td>
                <a href="${siteList[i].url}" target="_blank">
                    <button class="btn btn-visit text-center">
                        <i class="fa-solid fa-eye "></i>
                    </button>
                </a>
            </td>
            <td>
                <button onclick="indexSite(${i})" class="btn btn-update text-center">
                    <i class="fa fa-edit"></i>
                </button>
            </td>
            <td>
                <button onclick="deleteSite(${i})" class="btn btn-delete text-center">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>`;
        document.getElementById("tableBody").innerHTML = trs;
        }
    }
    for (var i = 0; i < siteList.length; i++) {
        if(searchValue == "") {
            console.log("hi");
            display();
        }
    }
}


// update
function indexSite(index) {
    var selectedSite = siteList[index];
    console.log(selectedSite);
    siteName.value = selectedSite.sname;
    siteUrl.value = selectedSite.url;
    siteName.focus();
    validation(siteName, regexName);
    validation(siteUrl, regexUrl);
    btnSubmit.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

function updateSite(index) {
    if(siteName.classList.contains("is-valid") &&
        siteUrl.classList.contains("is-valid")) {
        var site = {
            sname: siteName.value,
            url: siteUrl.value,
            };
            siteList.splice(index, 1, site);
            clearInput();
            display();
            localStorage.setItem("list", JSON.stringify(siteList));
            classNameSite.remove("is-valid");
            classUrlSite.remove("is-valid");
            updateAlert();
            btnSubmit.classList.remove("d-none");
            updateBtn.classList.add("d-none");
            console.log(site);
            console.log(siteList);
    }else {
        alertBox.classList.remove("d-none");
    }
}

// Delete All
function deleteAll() {
    if (siteList.length === 0) {
        Swal.fire("There's nothing to delete!");
    }else {
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
                icon: "success"
            });
            siteList.splice(0, siteList.length);
            //or siteList = [];
            localStorage.clear();
            display();
            }
        });
    }
}


// regex
// \w = [a-zA-Z0-9_]
// \s matches whitespace (spaces, tabs and new lines)
// + matches the previous token between one and unlimited times = {1,}
// * matches the previous token between zero and unlimited times = {0,}
// {0,1} = ?
// \/ => matches the character /
// \. => matches the character .
// \d = > matches a digit (equivalent to [0-9])
// :=> matches the character :

var regexName = /^\w{3,}(\s+\w+)*$/;
// var regexUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var regexUrl = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/;

// validation
siteName.addEventListener("input", function () {
    validation(siteName, regexName);
});
siteUrl.addEventListener("input", function () {
    validation(siteUrl, regexUrl);
});

function validation(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
    } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
    }
}


// //Close Alert
var closeBtn = document.getElementById("closeAlert");
function closeAlert() {
    alertBox.classList.add("d-none");
}

//success Alert
var successBox = document.querySelector(".box-success");
function successAlert() {
    successBox.classList.remove("d-none");
    setTimeout(function() {successBox.classList.add("d-none");}, 1100);
}

//update Alert
var updateBox = document.querySelector(".box-update");
function updateAlert() {
    updateBox.classList.remove("d-none");
    setTimeout(function() {updateBox.classList.add("d-none");}, 1080);
}

// Events
var btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", createSite);

closeBtn.addEventListener("click", closeAlert);

var updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", updateSite);

var btnReset = document.querySelector(".btn-reset");
btnReset.addEventListener("click", clearInput);

// searchInput.addEventListener("keyup", search);
searchInput.addEventListener("keyup", searchFalse);

var btnDeleteAll = document.getElementById("deleteAll");
btnDeleteAll.addEventListener("click", deleteAll);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeAlert();
    }
});
document.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        closeAlert();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-box")) {
        closeAlert();
    }
});



