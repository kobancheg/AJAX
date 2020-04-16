function getUsers(cb) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users/");
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.addEventListener("error", () => {
    console.log("error");
  });

  xhr.send();
}

getUsers(callBack);

const container = document.querySelector(".container");
const globalBody = document.querySelector("body");

function callBack(response) {
  renderUsers(response);
  userDetails(response);
}

function renderUsers(response) {
  const createList = document.createDocumentFragment();
  const card = document.createElement("div");
  card.classList.add("card");
  const ul = document.createElement("ul");
  ul.classList.add("list-group", "list-list-group-flush");

  response.forEach((user) => {
    const li = document.createElement("li");
    li.id = user.id;
    li.classList.add("list-group-item");
    li.textContent = user.name;
    li.setAttribute("data-toggle", "modal");
    li.dataset.target = "#modal";
    ul.appendChild(li);
  });

  card.appendChild(ul);
  createList.appendChild(card);
  container.appendChild(createList);
}

function userDetails(response) {
  const createModal = document.createDocumentFragment();
  const modalFade = document.createElement("div");
  modalFade.id = "modal";
  modalFade.classList.add("modal", "fade");
  const dialog = document.createElement("div");
  dialog.classList.add("modal-dialog");
  const content = document.createElement("div");
  content.classList.add("modal-content");
  const ul = document.createElement("ul");
  ul.classList.add("list-group");
  let names = document.createElement("li");
  names.classList.add("list-group-item");
  let usernames = document.createElement("li");
  usernames.classList.add("list-group-item");
  let emails = document.createElement("li");
  emails.classList.add("list-group-item");
  let streets = document.createElement("li");
  streets.classList.add("list-group-item");
  let suites = document.createElement("li");
  suites.classList.add("list-group-item");
  let citys = document.createElement("li");
  citys.classList.add("list-group-item");
  let zipcodes = document.createElement("li");
  zipcodes.classList.add("list-group-item");
  let lats = document.createElement("li");
  lats.classList.add("list-group-item");
  let lngs = document.createElement("li");
  lngs.classList.add("list-group-item");
  let phones = document.createElement("li");
  phones.classList.add("list-group-item");
  let websites = document.createElement("li");
  websites.classList.add("list-group-item");
  let companys = document.createElement("li");
  companys.classList.add("list-group-item");
  let catchPhrases = document.createElement("li");
  catchPhrases.classList.add("list-group-item");
  let bss = document.createElement("li");
  bss.classList.add("list-group-item");

  container.addEventListener("click", ({ target }) => {
    const user = response.find((element) => element.id === +target.id);
    const {
      name,
      username,
      email,
      address: { street, suite, city, zipcode, geo: { lat, lng } = {} } = {},
      phone,
      website,
      company: { name: company, catchPhrase, bs } = {},
    } = ({} = user);

    names.textContent = "name: " + name;
    usernames.textContent = "username: " + username;
    emails.textContent = "email: " + email;
    streets.textContent = "street: " + street;
    suites.textContent = "suite: " + suite;
    citys.textContent = "city: " + city;
    zipcodes.textContent = "zipcode: " + zipcode;
    lats.textContent = "lat: " + lat;
    lngs.textContent = "lng: " + lng;
    phones.textContent = "phone: " + phone;
    websites.textContent = "website: " + website;
    companys.textContent = "company: " + company;
    catchPhrases.textContent = "catchPhrase: " + catchPhrase;
    bss.textContent = "bs: " + bs;
  });

  ul.appendChild(names);
  ul.appendChild(usernames);
  ul.appendChild(emails);
  ul.appendChild(streets);
  ul.appendChild(suites);
  ul.appendChild(citys);
  ul.appendChild(zipcodes);
  ul.appendChild(lats);
  ul.appendChild(lngs);
  ul.appendChild(phones);
  ul.appendChild(websites);
  ul.appendChild(companys);
  ul.appendChild(catchPhrases);
  ul.appendChild(bss);
  content.appendChild(ul);
  dialog.appendChild(content);
  modalFade.appendChild(dialog);
  createModal.appendChild(modalFade);
  globalBody.insertBefore(createModal, container);
}
