// Изменяемые данные
const arrayLogins = ['JohnSmith', 'MinecraftNoob2008', 'Gargantua1999', 'Vasya', 'Oleja', 'Stas']; // массив занятых имен пользователей

// Основные переменные для проверки данных
const form = document.querySelector('.reg-form__info'); // проверка на валидность
const validText = document.querySelector('.valid-text');
const errorText = document.querySelector('.error__text');

// Для форм
const fieldLogin = form.querySelector('.field--login');
const fieldName = form.querySelector('.field--name');
const fieldSurName = form.querySelector('.field--lastname');
const fieldDate = form.querySelector('.field--date');
const fieldPayment = form.querySelector('.field--payment');
const fieldMail = form.querySelector('.field--mail');
const fieldPassword = form.querySelector('.password--create');
const fieldPasswordConfirm = form.querySelector('.password--confirm');

// Для инпутов
const loginInput = document.querySelector('.login');
const firstNameInput = document.querySelector('.first-name');
const surNameInput = document.querySelector('.last-name');
const dateInput = document.querySelector('.date');
const profession = document.querySelectorAll('input[name="role"]');
const paymentInput = document.querySelector('.payment');
const mailInput = document.querySelector('.mail');
const eyeToggle = document.querySelectorAll('.hide-show');
const passwordInput = document.querySelector('.password');
const passwordConfirmInput = document.querySelector('.confirm');

// Для вывода доп информации при ошибках
const errorTextLogin = document.querySelector('.error__text--login');
const errorTextName = document.querySelector('.error__text--name');
const errorTextSurName = document.querySelector('.error__text--lastname');
const errorTextDate = document.querySelector('.error__text--date');
const errorTextPayment = document.querySelector('.error__text--payment');
const errorTextEmail = document.querySelector('.error__text--email');

// Вариации ошибок (общие)
const errorValueCharacters = 'Please no less than 3 and no more than 20 characters';
const errorLoginBusy = 'Login is taken, please choose another one';
const errorPassFormat = 'Example: Passwd1!';
// Ошибки при проверке даты
const errorDateBelow = 'The date cannot be lower than 1940'; // дата не ниже 1940 года
const errorDateFuture = 'You can`t pick a date from the future'; // дата не больше сегодняшнего числа
const errorFormat = 'DD.MM.YYYY (example: 16.03.2010)'; // ошибка с рекомендацией по формату даты
const errorAge = 'You must be over 18'; // проверка на совершеннолетие
const errorEmailFormat = '***@mail.com/ru/fi (example: qwerty@gmail.com)'; //

// Все REGEX требующиеся при проверке инпутов по порядку использования
const characterLimit = /^[a-zA-z_\d]{3,20}$/;
const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
const paymentPattern = /^[\d]{2,20}$/;
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

// Ограничения по количеству символов
dateInput.maxLength = '10';
paymentInput.maxLength = '10';

// При сабмите формы
const userDataObject = {};
const submitComplete = 'Поздравляю, с успешным заполнением формы! Вы восхитительны!';

// Проверка валидности логина
function checkLogin() {
	switch (true) {
		case loginInput.value.match(characterLimit) === null: // Проверка на количество символов в строке и приравнивание к boolean
			fieldLogin.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextLogin.textContent = errorValueCharacters;
			return;
		case arrayLogins.includes(loginInput.value) === true: // Сравнение логина с массивом данных и приравнивание к boolean
			fieldLogin.classList.add('invalid');
			validText.classList.add('invalid');
			errorText.textContent = errorLoginBusy;
			return;
		default:
			fieldLogin.classList.remove('invalid');
			validText.classList.remove('invalid');
	};
};

// Проверка валидности имени
function checkName() {
	switch (true) {
		case firstNameInput.value.match(characterLimit) === null: // Проверка на количество символов в строке
			fieldName.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextName.textContent = errorValueCharacters;
			return;
		default:
			fieldName.classList.remove('invalid');
			validText.classList.remove('invalid');
	};
};

// Проверка валидности фамилии
function checkSurName() {
	switch (true) {
		case surNameInput.value.match(characterLimit) === null: // Проверка на количество символов в строке и приравнивание к boolean
			fieldSurName.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextSurName.textContent = errorValueCharacters;
			return;
		default:
			fieldSurName.classList.remove('invalid');
			validText.classList.remove('invalid');
	};
};

// Проверка валидности даты
function checkDate() {
	const dateInfo = dateInput.value;
	dateInput.value = dateInfo.replace(/([^\\\[\]\^\$\,\.\|.\?.\*.\+.\(.\).\d])/g, '').replace(/([\\.\[.\].\^.\$.\,.\..\|.\?.\*.\+.\(.\)])/g, '.');
	const dateBefore = new Date(1941 - 1, 13 - 1, 31);
	const dateNow = new Date(Date.now());
	let match = dateInput.value.match(dateRegex);

	switch (true) {
		case dateInput.value.match(dateRegex) === null: // Проверка на количество символов в строке
			fieldDate.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextDate.textContent = errorFormat;
			return;
	};

	const day = match[1];
	const month = match[2];
	const year = match[3];
	const dateValue = new Date(year, month - 1, day);

	switch (true) {
		case (dateValue.getFullYear() == year && dateValue.getMonth() == month - 1 && dateValue.getDate() == day) === false:
			// Проверка на корректность символов
			fieldDate.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextDate.textContent = errorFormat;
			break;
		case (dateValue > dateBefore) === false:
			// Не ниже 1940
			fieldDate.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextDate.textContent = errorDateBelow;
			break;
		case (dateValue < dateNow) === false:
			// Не больше чем сейчас
			fieldDate.classList.add('invalid');
			validText.classList.add('invalid');
			errorTextDate.textContent = errorDateFuture;
			break;

		case (Math.ceil((dateNow - dateValue) / (1000 * 3600 * 24))) > 6574 === false:
			// проверка на совершеннолетие пользователя согласно вводным данным
			fieldDate.classList.add('invalid');
			errorTextDate.textContent = errorAge;
			break;
		default:
			fieldDate.classList.remove('invalid');
			validText.classList.remove('invalid');
	};
};

// Выгрузка значения профессии
let professionInfo = '';
for (const profValue of profession) {
	(profValue.checked)
		? professionInfo = profValue.value
		: '';
};

// Проверка валидности оплаты
function checkPayment() {
	const value = paymentInput.value;
	paymentInput.value = value.replace(/([^1-9]{0})([^0-9]{1,10})/g, '');

	!paymentInput.value.match(paymentPattern)
		? (fieldPayment.classList.add('invalid'),
			errorTextPayment.textContent = errorValueCharacters)
		: (fieldPayment.classList.remove('invalid'),
			validText.classList.remove('invalid'));
};

// Проверка валидности почты
function checkEmail() {
	!mailInput.value.match(emailPattern)
		? (fieldMail.classList.add('invalid'),
			errorTextEmail.textContent = errorEmailFormat)
		: (fieldMail.classList.remove('invalid'),
			validText.classList.remove('invalid'));
};

// Переключение видимости пароля
eyeToggle.forEach((eyeIcon) => {
	eyeIcon.addEventListener('click', () => {
		const passInput = eyeIcon.parentElement.querySelector('input');
		// для переключения типа инпута
		passInput.type === 'password'
			? (eyeIcon.classList.replace('eye-hide', 'eye-show'),
				(passInput.type = 'text'))
			: (eyeIcon.classList.replace('eye-show', 'eye-hide'),
				passInput.type = 'password');
	});
});

// Проверка валидности пароля
function checkPass() {
	const passPattern =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const errorTextPass = document.querySelector('.error__text--password');

	!passwordInput.value.match(passPattern)
		? (fieldPassword.classList.add('invalid'),
			errorTextPass.textContent = errorPassFormat)
		: (fieldPassword.classList.remove('invalid'),
			validText.classList.remove('invalid'));
}

// Проверка валидности подтверждения пароля
function checkPassConf() {
	const passPattern =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const errorTextPass = document.querySelector('.error__text--confirm');

	const errorConfirm = 'Password mismatch!';
	!passwordConfirmInput.value.match(passPattern)
		? (fieldPasswordConfirm.classList.add('invalid'),
			errorTextPass.textContent = errorPassFormat)
		: passwordInput.value !== passwordConfirmInput.value || passwordConfirmInput.value === ''
			? (fieldPasswordConfirm.classList.add('invalid'),
				errorTextPass.textContent = errorConfirm)
			: (fieldPasswordConfirm.classList.remove('invalid'),
				validText.classList.remove('invalid'));
}

// Проверка функций на корректность
form.addEventListener('submit', (check) => {
	check.preventDefault(); // предотвращение отправки формы
	checkLogin();
	checkName();
	checkSurName();
	checkDate();
	checkPayment();
	checkEmail();
	checkPass();
	checkPassConf();

	// проверка функции при нажатии вызова
	loginInput.addEventListener('keyup', checkLogin);
	// validText.addEventListener('keyup', checkLogin);
	firstNameInput.addEventListener('keyup', checkName);
	surNameInput.addEventListener('keyup', checkSurName);
	dateInput.addEventListener('keyup', checkDate);
	paymentInput.addEventListener('keyup', checkPayment);
	mailInput.addEventListener('keyup', checkEmail);
	passwordInput.addEventListener('keyup', checkPass);
	passwordConfirmInput.addEventListener('keyup', checkPassConf);

	if (
		!fieldLogin.classList.contains('invalid') &&
		!validText.classList.contains('invalid') &&
		!fieldName.classList.contains('invalid') &&
		!fieldSurName.classList.contains('invalid') &&
		!fieldDate.classList.contains('invalid') &&
		!fieldPayment.classList.contains('invalid') &&
		!fieldMail.classList.contains('invalid') &&
		!fieldPassword.classList.contains('invalid') &&
		!fieldPasswordConfirm.classList.contains('invalid')
	) {
		userDataObject.Login = loginInput.value;
		userDataObject.Name = firstNameInput.value;
		userDataObject.SurName = surNameInput.value;
		userDataObject.BirthDate = dateInput.value;
		userDataObject.Profession = professionInfo;
		userDataObject.Payment = paymentInput.value;
		userDataObject.Mail = mailInput.value;
		userDataObject.Password = passwordInput.value;
		userDataObject.Submit = submitComplete;
		console.log(userDataObject);
		alert(JSON.stringify(userDataObject, null, 2));

		location.href = form.getAttribute('action');
	}
}); 
