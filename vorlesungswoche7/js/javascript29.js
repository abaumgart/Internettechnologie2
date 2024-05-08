// JavaScript Document
function init() {
  const formById = document.getElementById('login');
  const formByName = document.getElementsByName('login')[0];
  const formBySelector = document.querySelector('form');
  const formByFormsField = document.forms[0];
  const formByNameField = document.login;
  console.log(formById.id);              // "login"
  console.log(formByName.id);            // "login"
  console.log(formBySelector.id);        // "login"
  console.log(formByFormsField.id);      // "login"
  console.log(formByNameField.id);       // "login"


  const form = document.getElementById('login');
  console.log(form.elements);           // Formularelemente, 
  console.log(form.length);             // Anzahl Formularelemente
  console.log(form.name);               // Name des Formulars, hier "login"
  console.log(form.action);             // Inhalt des "action"-Attributs
  console.log(form.method);             // HTTP-Methode, hier "post"
}

document.addEventListener('DOMContentLoaded', init);
