"use strict";

/* Defining our constants getting our elements */
var itemsArr = JSON.parse(localStorage.getItem('itemsArr')) || [];
const uList = document.querySelector('.plates');
const inputForm = document.querySelector('.add-items');
const parag = document.querySelector('.wrapper p');
const removeItemButton = document.createElement('button');
removeItemButton.setAttribute('class', 'removeButton');
const removeItemButtonText = document.createTextNode('Remove All Items');
removeItemButton.appendChild(removeItemButtonText);
const wrap = document.querySelector('.wrapper');


/* Defining our functions */
function addItem(event) {

    event.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    
    const item = {
        text,
        done : false
    };
    
    itemsArr.push(item);
    populateList(itemsArr, uList);
    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    this.reset();
}

function populateList(anyArr = [], anyUl) {
    anyUl.innerHTML = anyArr.map((arr,index) => {
        return `
        <li>
        <input type="checkbox" data-index=${index} id="item${index}" ${arr.done?'checked':''}>
        <label for="item${index}">${arr.text}</label>
        </li>
        `;
    }).join('');
    
    if (anyArr.length > 0) {
        parag.innerHTML = `<button class='clearButton'></button> Clear selection`;
        wrap.appendChild(removeItemButton);
    }

    if (anyArr.length === 0) {
        uList.innerHTML = '<li>Loading Tapas...</li>';
    }
}

function toggleDone(event) {
    
    if(!event.target.matches('input')) return;

    const index = event.target.dataset.index;
    itemsArr[index].done = !itemsArr[index].done;
    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    populateList(itemsArr, uList);
}

function clearSelection(event) {
    
    if(!event.target.matches('button')) return;
    
    itemsArr.forEach(element => {
        element.done = false;
    });

    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    populateList(itemsArr, uList);
}

function removeAll() {
    
    localStorage.removeItem('itemsArr');
    itemsArr = [];
    uList.innerHTML = '<li>Loading Tapas...</li>';
    parag.innerHTML = '';
    wrap.removeChild(removeItemButton);
}


/* Hooking our listeners */
inputForm.addEventListener('submit', addItem);
uList.addEventListener('click', toggleDone);
parag.addEventListener('click', clearSelection);
removeItemButton.addEventListener('click', removeAll);

populateList(itemsArr, uList);