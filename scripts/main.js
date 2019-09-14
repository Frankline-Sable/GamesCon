/*scrolling from bottom to top script**/
jQuery(document).ready(function ($) {

    $('a.scroll-down').click(function (e) {
        e.preventDefault();
        $id = $(this).attr('href');
        $('body,html').animate({
            scrollTop: $($id).offset().top - 0
        }, 750);
    });

});
jQuery(document).ready(function ($) {

    $('a.scroll-up').click(function (e) {
        e.preventDefault();
        $id = $(this).attr('href');
        $('body,html').animate({
            scrollTop: $($id).offset().top - 0
        }, 750);
    });

});


var usernameFromSession;
const topNav = document.getElementById("nav");
var sideNavOpen=false;


function userAside_Open() {
    document.getElementById("userAside").style.display = "block";
    document.getElementById("userAside-overlay").style.display = "block";
    loadTable();
}

function userAside_Close() {
    document.getElementById("userAside").style.display = "none";
    document.getElementById("userAside-overlay").style.display = "none";
}


function showMenu(ham) {
    ham.classList.toggle("changeHam");
    var x = document.getElementById("sideNav");

    if (x.style.width !== '80px') {
        x.style.width = '80px';
        topNav.className = topNav.className.replace(" nav-anim-2", " nav-anim-1");
        sideNavOpen=true;

    } else {
        x.style.width = '0px';
        sideNavOpen=false;
    }

    document.getElementById("nav").className = logo.className.replace(" nav-anim-2", " nav-anim-1");
}

let tips = document.getElementsByClassName('tip');

function showTip(index) {
    document.getElementById("tip" + index).style.display = "block";
}

function hideTip(index) {
    document.getElementById("tip" + index).style.display = "none";
}

window.onscroll = function () {
    scrollFunction();

};
window.onload = function () {

    scrollFunction()
};


function scrollFunction() {
    if(sideNavOpen)
        return;
    if (document.documentElement.scrollTop > 50) {
        topNav.className = topNav.className.replace(" nav-anim-1", " nav-anim-2");
    } else {
        topNav.className = topNav.className.replace(" nav-anim-2", " nav-anim-1");
    }

}

function formNavig(current, next) {
    document.getElementById(current).classList.toggle('w3-hide');
    document.getElementById(next).classList.toggle('w3-hide');
}


/*Sign in operation*/

function signInExistingUser(form_ID) {
    var xhttp;
    xhttp = new XMLHttpRequest();

    var xFm = document.forms[form_ID];
    var _fUser = xFm['_userField'].value;
    var _fPass = xFm['_passField'].value;

    if (!Validate_Input(_fPass)) {//If password is not greater than 6 characters
        return;
    }


    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            handleResponse(this.responseText);


        }
    };
    xhttp.open("POST", "Phps/existing_user_sign_in.php", true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("_userField=" + _fUser + "&_passField=" + _fPass + "&_submitButton=1");


}

function handleResponse(phpResponse) {
    if (phpResponse === '1') {
        Error_Dialog('<i class="fa fa-bomb w3-text-white w3-text-shadow fa-2x"></i> <br>Failed! Either the username or password is incorrect</p>');
    }
    else {
        initialHouseKeeping();
    }
}

/**
 * @return {boolean}
 */
function Validate_Input(data) {
    if ((data).length < 6) {
        alert("Password Length should be >6 characters");
        return false;
    }
    return true;

}


const dialog = document.getElementById("error-dialog");
const message = document.getElementById("error-msg");

function Error_Dialog(msg) {


    message.innerHTML = msg;
    dialog.style.display = "block";


    setTimeout(Dialog_Defaults, 3000)

}

function Dialog_Defaults() {
    dialog.style.display = "none";
}


function userForgotPass(form_ID) {
    var xhttp;

    var fm = document.forms[form_ID];
    var _fEmail = fm['_userField'].value;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === '1') {
                Error_Dialog('<i class="fa fa-info-circle w3-text-white w3-text-shadow fa-2x"></i> <br>Failed! The email does not exist in our system');

            }
            else if (this.responseText === '2') {
                Error_Dialog('<i class="fa fa-warning w3-text-white w3-text-shadow fa-2x"></i> <br>There system to be an error in the system');

            }
            else {
                Error_Dialog('<i class="fa fa-inbox w3-text-white w3-text-shadow fa-2x"></i> <br>Password has been sent to the email address ' + _fEmail);
            }
        }
    };

    xhttp.open("POST", "Phps/ForgotPsw.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("_fEmail=" + _fEmail + "&_submitButton=1");
}


function signUpNewuser(form_ID) {
    var xhttp;
    xhttp = new XMLHttpRequest();

    var xFm = document.forms[form_ID];
    var _fName = xFm['_nameField'].value;
    var _fSex = xFm['_genderRadio'].value;
    var _fUser = xFm['_userField'].value;
    var _fPass1 = xFm['_passField1'].value;
    var _fPass2 = xFm['_passField2'].value;

    if (_fPass1 != _fPass2) {
        alert("passwords do no match");
        return;
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            handleResponse2(this.responseText);
        }
    };
    xhttp.open("POST", "Phps/newuser_sign_up.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("_nameField=" + _fName + "&_genderRadio=" + _fSex + "&_userField=" + _fUser + "&_password=" + _fPass1 + "&_submitButton=1");
}

function handleResponse2(phpResponse) {

    if (phpResponse === '1') {
        Error_Dialog('<i class="fa fa-info-bomb w3-text-white w3-text-shadow fa-2x"></i> <br>There was an error while signing up the user');


    }
    else if (phpResponse === '2') {
        Error_Dialog('<i class="fa fa-info-circle w3-text-white w3-text-shadow fa-2x"></i> <br>User already exists in db');

    }
    else if (phpResponse === '3') {
        Error_Dialog('<i class="fa fa-info w3-text-white w3-text-shadow fa-2x"></i> <br>Successs');

        formNavig('signupForm', 'signinForm');
    }
    else {
        Error_Dialog('<i class="fa fa-info w3-text-white w3-text-shadow fa-2x"></i> <br>Unknown error has occurred');

    }
}


/* Dealing with session and cookies matters */
initialHouseKeeping();

function initialHouseKeeping() {
    var xhttp;
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            handleFetcherResponse(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "Phps/SessionFetcher.php", true);
    xhttp.send();
}

function handleFetcherResponse(phpResponse) {//php response returns 1 or a jsonarray
    if (phpResponse === 0) {
        //User not signed in
        return;
    }
    //if there is session, then do below
    var arr = phpResponse.sessionData;


    usernameFromSession = arr[0]._username;
    formNavig('unknownUserNav', 'knownUserNav');
    UserLoggedIn(arr[0]._fullname, arr[0]._username);
}

function UserLoggedIn(fullNames, email) {

    //Clear any previous purchases
    removeFromBought(null);

    document.getElementById("side-title").innerHTML = "Shop Triple AAA HD games <i class='fa fa-gamepad'></i>";
    document.getElementById("logOutButton").classList.toggle("w3-hide");
    document.getElementById("adminPanel").classList.toggle("w3-hide");
    document.getElementById("side-userInfomation").innerHTML =
        '' + fullNames + '<br><span\n' +
        '                            class="w3-medium w3-text-light-gray w3-padding-small w3-round-xxlarge"\n' +
        '                            style="background-color: rgba(244,67,54,0.5)">Hey welcome, feel free to browse through the catalogs </span>\n' +
        '                    ';
}


function HandleSignOut() {

    deleteCookie();
}

function deleteCookie() {

    if (checkCookie()) {

        document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "nameCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        removeSession();
    }
    else {

        removeSession();
    }

}

function checkCookie() {

    var user = getCookie("userCookie");

    if (user !== "") {
        return true;
    } else {
        return false;
    }
}

function removeSession() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location.reload(true);

        }
    };
    xhttp.open("GET", "Phps/signOut.php", true);
    xhttp.send();

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}




