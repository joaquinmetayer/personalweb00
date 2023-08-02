var submitted = false;
function validateEmail() {
  var email = document.getElementById("email").value;
  if (email.length == 0) {
    return false;
  }
  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    return false;
  } else {
    return true;
  }
}
function validateAndEnableButton() {
  var isValidEmail = validateEmail();
  var submitButton = document.querySelector(".submit");
  if (isValidEmail) {
    submitButton.removeAttribute("disabled");
    submitButton.style.display = "block";
  } else {
    submitButton.setAttribute("disabled", "true");
  }
}
function gracias() {
  formHtml = document.getElementById("form");
  graciasHtml = document.getElementById("gracias");
  formHtml.style.display = "none";
  graciasHtml.style.display = "block";
  setTimeout(() => {
    formHtml.style.display = "block";
    graciasHtml.style.display = "none";
    document.getElementById("email").value = "";
  }, 2500);
}