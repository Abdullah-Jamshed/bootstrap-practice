var firebaseConfig = {
  apiKey: "AIzaSyAXT3yoVGaO6BLlYESpX4m2BZc0COXVh2U",
  authDomain: "auth-check-a8193.firebaseapp.com",
  databaseURL: "https://auth-check-a8193.firebaseio.com",
  projectId: "auth-check-a8193",
  storageBucket: "auth-check-a8193.appspot.com",
  messagingSenderId: "965838622407",
  appId: "1:965838622407:web:2e703eda762cd1d0adf8e2",
  measurementId: "G-PC4B9PFLW2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user);
  });
};

var loginbtn = document.querySelector(".loginbtn");

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
  size: "invisible",
  callback: function (response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    loginbtn.addEventListener("click", () => {
      onSignInSubmit();
    });
  },
});

recaptchaVerifier.render().then(function (widgetId) {
  window.recaptchaWidgetId = widgetId;
});

function onSignInSubmit() {
  var phoneNumber = document.getElementById("inp").value;
  var appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      console.log("message send");
    })
    .catch(function (error) {
      console.log("message not send");
    });
}

function verify() {
  var code = document.getElementById("code").value;
  confirmationResult
    .confirm(code)
    .then(function (result) {
      var user = result.user;
      console.log(user);
    })
    .catch(function (error) {
      console.log("invalid code");
    });
}

function sginOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
        console.log("signout")
    })
    .catch(function (error) {
        console.log("signout not")
    });
}

// function onSignInSubmit() {
//   firebase.auth().settings.appVerificationDisabledForTesting = true;
//   var phoneNumber = document.getElementById("inp").value;
//   var testVerificationCode = "123456";
//   var appVerifier = window.recaptchaVerifier;
//   firebase
//     .auth()
//     .signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then(function (confirmationResult) {
//         console.log("message send");
//         return confirmationResult.confirm(testVerificationCode)
//     })
//     .catch(function (error) {
//       console.log("message not send");
//     });
// }

// function verify() {
//   var code = document.getElementById("code").value;
//   confirmationResult
//     .confirm(code)
//     .then(function (result) {
//       var user = result.user;
//       console.log("logged in");
//     })
//     .catch(function (error) {
//       console.log("invalid code");
//     });
// }

