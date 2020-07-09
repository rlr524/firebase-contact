// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBT6mcINDBbyspIQxAlQy_kBFBCgd0ybI",
  authDomain: "emiya-contact-form.firebaseapp.com",
  databaseURL: "https://emiya-contact-form.firebaseio.com",
  projectId: "emiya-contact-form",
  storageBucket: "emiya-contact-form.appspot.com",
  messagingSenderId: "448905505971",
  appId: "1:448905505971:web:65eb6a342e4abc6b6994c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

// listen for form submit
document.getElementById("contact-form").addEventListener("submit", submitForm);

// get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("company").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("message").value = "";
}

function showAlert() {
  document.querySelector(".alert").style.display = "block";
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 5000);
}

function showError() {
  document.querySelector("alert-error").style.display = "block";
  setTimeout(function () {
    document.querySelector("alert-error").style.display = "none";
  }, 30000);
}

// submit form
function submitForm(e) {
  let name = getInputVal("name");
  let company = getInputVal("company");
  let email = getInputVal("email");
  let phone = getInputVal("phone");
  let message = getInputVal("message");
  saveMessage(name, company, email, phone, message);
  clearForm();
  e.preventDefault();
}

// save the message to messages collection
function saveMessage(name, company, email, phone, message) {
  var newMessageRef = db.collection("messages");
  newMessageRef
    .add({
      name: name,
      company: company,
      email: email,
      phone: phone,
      message: message
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      showAlert();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      showError();
    });
}
