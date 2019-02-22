itemsArr = JSON.parse(localStorage.getItem('itemsArr')) || [];
const uList = document.querySelector('.plates');
const inputForm = document.querySelector('.add-items');
const parag = document.querySelector('.wrapper p');
// const clearBut = document.querySelector('.clearButton');

function addItem(a) {
    a.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    item = {
        text,
        done : false
    };
    itemsArr.push(item);
    populateList(itemsArr, uList);
    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    this.reset();
}

function populateList(anyArr = [], anyUl) {
    anyUl.innerHTML = anyArr.map((a,i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${a.done?'checked':''}>
        <label for="item${i}">${a.text}</label>
        </li>
        `;
    }).join('');
    
    if (anyArr.length > 0) {
        parag.innerHTML = `<button class='clearButton'></button> Clear selection`;}
}

function toggleDone(a) {
    if(!a.target.matches('input')) return;
    const index = a.target.dataset.index;
    itemsArr[index].done = !itemsArr[index].done;
    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    populateList(itemsArr, uList);
}

function clearSelection(a) {
    if(!a.target.matches('button')) return;
    itemsArr.forEach(element => {
        element.done = false;
    });
    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    populateList(itemsArr, uList);
}

inputForm.addEventListener('submit', addItem);
uList.addEventListener('click', toggleDone);
parag.addEventListener('click', clearSelection);

populateList(itemsArr, uList);