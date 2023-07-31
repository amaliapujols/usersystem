// Para llenar la tabla on load
window.onload = function() {
    fillTable();
};

//Elementos

const tableBody = document.getElementById('table_body');
const usernameElem = document.getElementById('user');
const passwordElem = document.getElementById('password');
const nameElem = document.getElementById('name');
const ageElem = document.getElementById('age');
const emailElem = document.getElementById('email');
const telephoneElem = document.getElementById('telephone');
const saveBtn = document.getElementById('save_btn');
const addBtn = document.getElementById('add_btn');
const modalHeader = document.getElementById('modal_header');


// Funcion encargada de llenar la tabla

const fillTable = async () => {
    const res = await getAllUsers();
    console.log(res);

    let tempList = [];

    for (let i = 0; i < res.length; i++) {
        tempList.push(`<tr><td>${res[i].username}</td><td>${res[i].password}</td><td>${res[i].name}</td><td>${res[i].age}</td><td>${res[i].email}</td><td>${res[i].telephone}</td><td><a class="waves-effect waves-light btn-small red" onclick="deleteUser('${res[i]._id}')"><i class="material-icons">delete</i></a>&nbsp;<a class="waves-effect waves-light btn-small orange modal-trigger" href="#modal2" onclick="editUser('${res[i]._id}')"><i class="material-icons">edit</i></a></td></tr>`);
    }

    tempList = tempList.join("");
    tableBody.innerHTML = tempList;
    return;
}

// Funcion encargada de preparar el modal para agregar nuevos usuarios

const addNewUser = async () => {

    usernameElem.value = ''
    passwordElem.value = '';
    nameElem.value = '';
    ageElem.value = '';
    emailElem.value = '';
    telephoneElem.value = '';
    modalHeader.textContent = 'Agregar Usuario';

    saveBtn.classList.add('hidden');
    addBtn.classList.remove('hidden');

    addBtn.addEventListener('click', saveUser);
}

// Funcion encargada de preparar el modal para editar usuarios

const editUser = async (id) => {
    modalHeader.textContent = 'Editar Usuario';

    const res = await getUserById(id);
    usernameElem.value = res.username;
    passwordElem.value = res.password;
    nameElem.value = res.name;
    ageElem.value = res.age;
    emailElem.value = res.email;
    telephoneElem.value = res.telephone;

    addBtn.classList.add('hidden');
    saveBtn.classList.remove('hidden');

    saveBtn.addEventListener('click', () => editUserInfo(id));

}

// Funciones del API 

const getAllUsers = async () => {
    const response = await fetch('http://localhost:3000/api/users/');
    const users = await response.json();
    return users;
}

const getUserById = async (id) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const users = await response.json();
    console.log(users);
    return users;
}

const saveUser = async () => {
    const data = { username: usernameElem.value, password: passwordElem.value, name: nameElem.value, age: ageElem.value, email: emailElem.value, telephone: telephoneElem.value};

    const response = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    console.log(response.json());
    fillTable();
}

const editUserInfo = async (id) => {
    const data = { username: usernameElem.value, password: passwordElem.value, name: nameElem.value, age: ageElem.value, email: emailElem.value, telephone: telephoneElem.value};
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log(response.json());
    fillTable();
}

const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
    console.log(response.json());
    fillTable();
}