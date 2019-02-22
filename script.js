itemsArr = JSON.parse(localStorage.getItem('itemsArr')) || [];
const uList = document.querySelector('.plates');
const inputForm = document.querySelector('.add-items');


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
}

function toggleDone(a) {
    if(!a.target.matches('input')) return;
    const index = a.target.dataset.index;
    itemsArr[index].done = !itemsArr[index].done;
    localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
    populateList(itemsArr, uList);
}

inputForm.addEventListener('submit', addItem);
uList.addEventListener('click', toggleDone);

populateList(itemsArr, uList);