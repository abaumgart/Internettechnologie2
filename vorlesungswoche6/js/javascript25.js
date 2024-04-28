// JavaScript Document
// 

const textContent = document.querySelector('#news li:nth-child(1)').textContent;
    console.log(textContent);

let htmlElement = document.querySelector('#news li:nth-child(2)');
htmlElement.innerHTML='<b>Neues Sendeformat von Campus Live</b>';

let htmlElement3 = document.querySelector('#news li:nth-child(3)');
htmlElement3.textContent='<b>Neues Sendeformat von Campus Live</b>';


const mainContent= document.getElementById('mainContent');
const textknoten=document.createTextNode('Internettechnologie2');

mainContent.appendChild(textknoten);




