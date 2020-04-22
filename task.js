function getUsers(cb) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/');
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
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
  li.id = user.id;
  li.classList.add('list-group-item');
  li.textContent = user.name;
  li.setAttribute('data-toggle', 'modal');
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

btn.addEventListener('click', (e) => {
  e.preventDefault();
  let newUser = {
   //  id: parseInt(Math.random() * 100),
    name: form.name.value,
    email: form.email.value,
    username: form.username.value,
    phone: form.phone.value,
    website: form.website.value,
  };
  userPost(newUser, (resPost) => {
    const li = userList(resPost);
    ul.insertAdjacentElement('afterbegin', li);
  });
});

function userDetails(response) {
  const createModal = document.createDocumentFragment();
  const modalFade = document.createElement('div');
  modalFade.id = 'modal';
  modalFade.classList.add('modal', 'fade');
  const dialog = document.createElement('div');
  dialog.classList.add('modal-dialog');
  const content = document.createElement('div');
  content.classList.add('modal-content');
  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  let names = document.createElement('li');
  names.classList.add('list-group-item');
  let usernames = document.createElement('li');
  usernames.classList.add('list-group-item');
  let emails = document.createElement('li');
  emails.classList.add('list-group-item');
//   let streets = document.createElement('li');
//   streets.classList.add('list-group-item');
//   let suites = document.createElement('li');
//   suites.classList.add('list-group-item');
//   let citys = document.createElement('li');
//   citys.classList.add('list-group-item');
//   let zipcodes = document.createElement('li');
//   zipcodes.classList.add('list-group-item');
//   let lats = document.createElement('li');
//   lats.classList.add('list-group-item');
//   let lngs = document.createElement('li');
//   lngs.classList.add('list-group-item');
  let phones = document.createElement('li');
  phones.classList.add('list-group-item');
  let websites = document.createElement('li');
  websites.classList.add('list-group-item');
//   let companys = document.createElement('li');
//   companys.classList.add('list-group-item');
//   let catchPhrases = document.createElement('li');
//   catchPhrases.classList.add('list-group-item');
//   let bss = document.createElement('li');
//   bss.classList.add('list-group-item');

  const userItem = ({ target }) => {
    if (target.tagName === 'LI') {
      const user = response.find((element) => element.id === +target.id);
      const {
        name,
        username,
        email,
      //   address: { street, suite, city, zipcode, geo: { lat, lng } = {} } = {},
        phone,
        website,
      //   company: { name: company, catchPhrase, bs } = {},
      } = ({} = user);

      names.textContent = 'name: ' + name;
      usernames.textContent = 'username: ' + username;
      emails.textContent = 'email: ' + email;
      // streets.textContent = 'street: ' + street;
      // suites.textContent = 'suite: ' + suite;
      // citys.textContent = 'city: ' + city;
      // zipcodes.textContent = 'zipcode: ' + zipcode;
      // lats.textContent = 'lat: ' + lat;
      // lngs.textContent = 'lng: ' + lng;
      phones.textContent = 'phone: ' + phone;
      websites.textContent = 'website: ' + website;
      // companys.textContent = 'company: ' + company;
      // catchPhrases.textContent = 'catchPhrase: ' + catchPhrase;
      // bss.textContent = 'bs: ' + bs;
    }
  };

  ul.appendChild(names);
  ul.appendChild(usernames);
  ul.appendChild(emails);
//   ul.appendChild(streets);
//   ul.appendChild(suites);
//   ul.appendChild(citys);
//   ul.appendChild(zipcodes);
//   ul.appendChild(lats);
//   ul.appendChild(lngs);
  ul.appendChild(phones);
  ul.appendChild(websites);
//   ul.appendChild(companys);
//   ul.appendChild(catchPhrases);
//   ul.appendChild(bss);
  content.appendChild(ul);
  dialog.appendChild(content);
  modalFade.appendChild(dialog);
  createModal.appendChild(modalFade);
  globalBody.insertBefore(createModal, container);

  container.addEventListener('click', userItem);
}
