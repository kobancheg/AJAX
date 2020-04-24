allUsers = [];
function getUsers(cb) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/');
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
    allUsers = [...response];
  });

  xhr.addEventListener('error', () => {
    console.log('error');
  });

  xhr.send();
}

getUsers((response) => {
  renderUsers(response);
  userDetails(response);
});

function userPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

  xhr.addEventListener('error', () => {
    console.log('error');
  });

  xhr.send(JSON.stringify(body));
}

const container = document.querySelector('.container');
const ul = document.querySelector('.user__list');
const globalBody = document.querySelector('body');

function userList(user) {
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.id = user.id;
  li.textContent = user.name;
  li.dataset.toggle = 'modal';
  li.dataset.target = '#modal';
  return li;
}

function renderUsers(response) {
  response.forEach((user) => {
    const li = userList(user);
    ul.appendChild(li);
  });
}

const form = document.forms['userForm'];
const btn = document.querySelector('.btn-info');

function createId(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

btn.addEventListener('click', (e) => {
  e.preventDefault();
  let newUser = {
    id: createId(11, 99),
    name: form.name.value,
    username: form.username.value,
    email: form.email.value,
    phone: form.phone.value,
    website: form.website.value,
  };

  userPost(newUser, (resPost) => {
    const li = userList(resPost);
    li.id = newUser.id;
    allUsers.push(newUser);
    ul.insertAdjacentElement('afterbegin', li);
  });

  form.reset();
});

function userDetails() {
  const ul = document.querySelector('.modal__list');
  let names = document.createElement('li');
  names.classList.add('list-group-item');
  let usernames = document.createElement('li');
  usernames.classList.add('list-group-item');
  let emails = document.createElement('li');
  emails.classList.add('list-group-item');
  let phones = document.createElement('li');
  phones.classList.add('list-group-item');
  let websites = document.createElement('li');
  websites.classList.add('list-group-item');

  const userItem = ({ target }) => {
    if (target.tagName === 'LI') {
      const user = allUsers.find((element) => element.id === +target.id);
      const { name, username, email, phone, website } = ({} = user);

      names.textContent = 'name: ' + name;
      usernames.textContent = 'username: ' + username;
      emails.textContent = 'email: ' + email;
      phones.textContent = 'phone: ' + phone;
      websites.textContent = 'website: ' + website;
    }
  };

  ul.appendChild(names);
  ul.appendChild(usernames);
  ul.appendChild(emails);
  ul.appendChild(phones);
  ul.appendChild(websites);

  container.addEventListener('click', userItem);
}
