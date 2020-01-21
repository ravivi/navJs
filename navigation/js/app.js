const navSlide= () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-items');
    const navLink = document.querySelectorAll('.nav-items li');
    
    burger.addEventListener('click',()=>{
        nav.classList.toggle('nav-active');

        navLink.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7+1.1}s`;
    
            }
        });

        burger.classList.toggle('toggle')
    });



}

navSlide();


























// Input fields
const firstName = document.getElementById('nom');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
// Form
const form = document.getElementById('form');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';

// Handle form
form.addEventListener('submit', function(event) {
  // Prevent default behaviour
  event.preventDefault();
  if (
    validateFirstName() &&
    validatePhone() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) {
      document.location.href = '../../apple/apple.html';
    }

});

// Validators
function validateFirstName() {
  // check if is empty
  if (checkIfEmpty(firstName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}
function validatePhone() {
  // check if is empty
  if (checkIfEmpty(phone)) return;
  // is if it has only letters
  if (!checkIfOnlyNumber(phone)) return;
  return true;
}
function validatePassword() {
  // Empty check
  if (checkIfEmpty(password)) return;
  // Must of in certain length
  if (!meetLength(password, 4, 100)) return;
  // check password against our character set
  // 1- a
  // 2- a 1
  // 3- A a 1
  // 4- A a 1 @
  //   if (!containsCharacters(password, 4)) return;
  return true;
}
function validateConfirmPassword() {
  if (password.className !== 'valid') {
    setInvalid(confirmPassword, 'Mot de passe invalide');
    return;
  }
  // If they match
  if (password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, 'Mot de passe non identique');
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}
function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
  return true;
}
// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} Remplissez le champ`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === '') return true;
  return false;
}
function setInvalid(field, message) {
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = 'Correct';
  field.nextElementSibling.style.color = green;
}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name}  Uniquement que des lettres`);
    return false;
  }
}
function checkIfOnlyNumber(field) {
    if (/^((\+)225|0)[1-9](\d{7})$/g.test(field.value)) {
      setValid(field);
      return true;
    } else {
      setInvalid(field, `${field.name} Un numéro ivoirien svp`);
      return false;
    }
  }
function meetLength(field, minLength, maxLength) {
  if (field.value.length >= minLength && field.value.length < maxLength) {
    setValid(field);
    return true;
  } else if (field.value.length < minLength) {
    setInvalid(
      field,
      `${field.name}  doit être supérieur à ${minLength} caractères`
    );
    return false;
  } else {
    setInvalid(
      field,
      `${field.name} doit être inferieur à ${maxLength} caractères`
    );
    return false;
  }
}
function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      // letters
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, 'Doit contenir au moins une lettre');
    case 2:
      // letter and numbers
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Doit contenir au moins une lettre et un chiffre'
      );
    case 3:
      // uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        'Au moins une lettre Maj, miniscule,un chiffre'
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        'Au moins un caractère spécial');
    case 5:
      // Email pattern
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, 'Rentrez un email correct svp');
    default:
      return false;
  }
}
function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}



