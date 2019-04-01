$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var genderInput = $("input#gender-input");
  var dobInput = $("input#dob-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();

    var userData = {
      firstname: firstNameInput.val().trim(),
      lastname: lastNameInput.val().trim(),
      gender: genderInput.val().trim(),
      dob: dobInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstname, userData.lastname, userData.gender, userData.dob, userData.email, userData.password)
    firstNameInput.val("");
    lastNameInput.val("");
    genderInput.val("");
    dobInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, gender, dob, email, password) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      email: email,
      password: password,
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
