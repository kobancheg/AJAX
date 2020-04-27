allUsers = [];

function http() {
	return {
		get(url, cb) {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.addEventListener('load', () => {
					if (Math.floor(xhr.status / 100) !== 2) {
						cb(`Error. Status code: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.responseText);
					cb(null, response);
					allUsers = [...response];
				});

				xhr.addEventListener('error', () => {
					cb(`Error. Status code: ${xhr.status}`, xhr);
				});

				xhr.send();
			} catch (error) {
				cb(error);
			}
		},
		post(url, body, headers, cb) {
			try {
				const xhr = new XMLHttpRequest();
				xhr.open('POST', url);
				xhr.addEventListener('load', () => {
					if (Math.floor(xhr.status / 100) !== 2) {
						cb(`Error. Status code: ${xhr.status}`, xhr);
						return;
					}
					const response = JSON.parse(xhr.responseText);
					cb(null, response);
				});

				xhr.addEventListener('error', () => {
					cb(`Error. Status code: ${xhr.status}`, xhr);
				});

				if (headers) {
					Object.entries(headers).forEach(([key, value]) => {
						xhr.setRequestHeader(key, value);
					});
				}

				xhr.send(JSON.stringify(body));
			} catch (error) {
				cb(error);
			}
		},
	};
}

const myHttp = http();

myHttp.get('https://jsonplaceholder.typicode.com/users/', (err, response) => {
	if (err) {
		console.log(err);
		return;
	}
	renderUsers(response);
});

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

	myHttp.post(
		'https://jsonplaceholder.typicode.com/posts',
		newUser,
		{ 'Content-Type': 'application/json', 'x-auth': 'asd9387ydh9iuashdis' },
		(err, res) => {
			if (err) {
				console.log(err);
			}
			const li = userList(res);
			li.id = newUser.id;
			allUsers.push(newUser);
			ul.insertAdjacentElement('afterbegin', li);
		}
	);

	form.reset();
});

function modalUser({ target }) {
	if (target.tagName === 'LI') {
		const user = allUsers.find((element) => element.id === +target.id);
		document.querySelector('.modal__list').innerHTML = '';
		userDetails(user);
	}
}

container.addEventListener('click', modalUser)

function userDetails({ name, username, email, phone, website }) {
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

	names.textContent = 'name: ' + name;
	usernames.textContent = 'username: ' + username;
	emails.textContent = 'email: ' + email;
	phones.textContent = 'phone: ' + phone;
	websites.textContent = 'website: ' + website;

	ul.appendChild(names);
	ul.appendChild(usernames);
	ul.appendChild(emails);
	ul.appendChild(phones);
	ul.appendChild(websites);
}
