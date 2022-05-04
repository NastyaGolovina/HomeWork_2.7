let button = document.querySelector('.save');
let inputName = document.getElementById('name');
let inputPhone = document.getElementById('phone');
const buttonDeleteAll = document.getElementById('delete-all');

const ulElement = document.getElementById('ul');


function reset(q) {
    while (q.firstChild) {
        q.removeChild(q.firstChild);
    }
}


function buttonSave (event) {
    event.preventDefault();

    let formName = inputName.value;
    let formPhone = inputPhone.value;
    let user = {};

    if (formName !== '' && formPhone !== '') {
        user.name = formName;
        user.phone = formPhone;

        console.log(`${user.name} ${user.phone}`);

        //localStorage.setItem(`user${localStorage.length}`, JSON.stringify(user));
        localStorage.setItem(`${user.name} ${user.phone}`, JSON.stringify(user))

        inputName.value = '';
        inputPhone.value = '';

        phoneBookFunc()

    } else {
        alert('Fill the form');
    }
}

function phoneBookEl(user, phone, r) {

    const li = document.createElement('li')
    const textForP = document.createElement('p');
    const buttonDelete = document.createElement('button');
    buttonDelete.dataset.buttonDeleteType = 'clicked';
    // buttonDelete.id =`user${r}`;
    buttonDelete.dataset.buttonDeleteText = `${r}`;
    textForP.innerHTML = `${user} - ${phone}`;
    buttonDelete.innerHTML = 'x';
    buttonDelete.className = 'delete';
    textForP.className = 'paragraph';
    li.append(textForP);
    li.append(buttonDelete);
    ulElement.append(li);
}


function phoneBookFunc() {
    let hasChildNodesDiv = ulElement.hasChildNodes();
    if (hasChildNodesDiv === true) {
        reset(ulElement);
    }

    if (localStorage.length !== 0) {
        for (let i = 0; i < localStorage.length; i++ ) {

            const lsObj = localStorage.getItem(localStorage.key(i));
            let newObj = JSON.parse(lsObj);
            console.log(newObj);
            phoneBookEl(newObj.name, newObj.phone, localStorage.key(i));
        }
    }
}



function buttonDeleteAllFunc() {
    localStorage.clear()
    reset(ulElement);
}

phoneBookFunc()
button.addEventListener('click', buttonSave );
buttonDeleteAll.addEventListener('click', buttonDeleteAllFunc ) ;

document.addEventListener('click', event => {
    if (event.target.dataset.buttonDeleteType === 'clicked') {
        const keyName = event.target.dataset.buttonDeleteText;
        localStorage.removeItem(keyName);
        phoneBookFunc()
    }
})