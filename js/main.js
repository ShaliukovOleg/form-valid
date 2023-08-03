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
const errorPayment = 'Please no less than 2 and no more than 10 characters';
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

// Добавление класса invalid
function addInvalidClass(element) {
	element.classList.add('invalid');
}

// Удаление класса invalid
function removeInvalidClass(element) {
	element.classList.remove('invalid');
}

// Функция для проверки инпутов
function validateInput(inputElement, regex, errorMessageElement, errorMessage) {
	const isValid = inputElement.value.match(regex);
	if (!isValid) {
		addInvalidClass(inputElement);
		addInvalidClass(validText);
		errorMessageElement.textContent = errorMessage;
		return false;
	}
	removeInvalidClass(inputElement);
	removeInvalidClass(validText);
	return true;
}

// Проверка валидности логина
function checkLogin() {
	const isCharacterLimitValid = loginInput.value.match(characterLimit);
	const isLoginTaken = arrayLogins.includes(loginInput.value);

	if (!isCharacterLimitValid) {
		addInvalidClass(fieldLogin);
		addInvalidClass(validText);
		errorTextLogin.textContent = errorValueCharacters;
		return;
	}

	if (isLoginTaken) {
		addInvalidClass(fieldLogin);
		addInvalidClass(validText);
		errorTextLogin.textContent = errorLoginBusy;
		return;
	}

	removeInvalidClass(fieldLogin);
	removeInvalidClass(validText);
};

// Проверка валидности имени
function checkName() {
	const isCharacterLimitValid = validateInput(firstNameInput, characterLimit, errorTextName, errorValueCharacters);

	if (!isCharacterLimitValid) {
		addInvalidClass(fieldName);
		addInvalidClass(validText);
		return;
	}

	removeInvalidClass(fieldName);
	removeInvalidClass(validText);
}

// Проверка валидности фамилии
function checkSurName() {
	const isCharacterLimitValid = validateInput(surNameInput, characterLimit, errorTextSurName, errorValueCharacters);

	if (!isCharacterLimitValid) {
		addInvalidClass(fieldSurName);
		addInvalidClass(validText);
		return;
	}

	removeInvalidClass(fieldSurName);
	removeInvalidClass(validText);
};

// Проверка валидности даты
function checkDate() {
	let dateInfo = dateInput.value;
	// Удаление всех символов, кроме цифр
	dateInfo = dateInfo.replace(/[^0-9]/g, '');

	// Вставка точки после второго символа
	dateInfo = dateInfo.replace(/^(.{2})/, '$1.');

	// Вставка точки после четвертого символа
	dateInfo = dateInfo.replace(/^(.{5})/, '$1.');

	dateInput.value = dateInfo;
	const dateBefore = new Date(1941 - 1, 13 - 1, 31);
	const dateNow = new Date(Date.now());
	let match = dateInput.value.match(dateRegex);

	if (dateInput.value.match(dateRegex) === null) { // Проверка на количество символов в строке
		addInvalidClass(fieldDate);
		addInvalidClass(validText);
		errorTextDate.textContent = errorFormat;
		return;
	}

	const day = match[1];
	const month = match[2];
	const year = match[3];
	const dateValue = new Date(year, month - 1, day);

	switch (true) {
	case (dateValue.getFullYear() == year
			&& dateValue.getMonth() == month - 1
			&& dateValue.getDate() == day) === false:
		// Проверка на корректность символов
		addInvalidClass(fieldDate);
		addInvalidClass(validText);
		errorTextDate.textContent = errorFormat;
		break;
	case dateValue < dateBefore:
		addInvalidClass(fieldDate);
		addInvalidClass(validText);
		errorTextDate.textContent = errorDateBelow;
		break;
	case dateValue > dateNow:
		addInvalidClass(fieldDate);
		addInvalidClass(validText);
		errorTextDate.textContent = errorDateFuture;
		break;
	case Math.ceil((dateNow - dateValue) / (1000 * 3600 * 24)) > 6574 === false:
		addInvalidClass(fieldDate);
		errorTextDate.textContent = errorAge;
		break;
	default:
		removeInvalidClass(fieldDate);
		removeInvalidClass(validText);
	};
};

// Выгрузка значения профессии
let professionInfo = '';
const professionValue = Array.from(profession).find((profValue) => profValue.checked)?.value;
userDataObject.Profession = professionValue;

// Проверка валидности оплаты
function checkPayment() {
	const value = paymentInput.value;
	paymentInput.value = value.replace(/[^0-9]/g, ''); // Удаление всех символов, кроме цифр

	if (!paymentInput.value.match(paymentPattern)) {
		addInvalidClass(fieldPayment);
		addInvalidClass(validText);
		errorTextPayment.textContent = errorPayment;
	} else {
		removeInvalidClass(fieldPayment);
		removeInvalidClass(validText);
	}
}

// Проверка валидности почты
function checkEmail() {
	if (!mailInput.value.match(emailPattern)) {
		addInvalidClass(fieldMail);
		errorTextEmail.textContent = errorEmailFormat;
	} else {
		removeInvalidClass(fieldMail);
	}
}

// Переключение видимости пароля
function togglePasswordVisibility(input, eyeIcon) {
	const passInput = input;
	passInput.type === 'password'
		? (eyeIcon.classList.replace('eye-hide', 'eye-show'), (passInput.type = 'text'))
		: (eyeIcon.classList.replace('eye-show', 'eye-hide'), (passInput.type = 'password'));
}

// Проверка валидности пароля
function checkPass() {
	const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const errorTextPass = document.querySelector('.error__text--password');
	const isPassValid = passwordInput.value.match(passPattern);

	if (!isPassValid) {
		addInvalidClass(fieldPassword);
		errorTextPass.textContent = errorPassFormat;
	} else {
		removeInvalidClass(fieldPassword);
	}
}

// Проверка валидности подтверждения пароля
function checkPassConf() {
	const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const errorTextPass = document.querySelector('.error__text--confirm');
	const errorConfirm = 'Password mismatch!';
	const isPassConfValid = passwordConfirmInput.value.match(passPattern);

	if (!isPassConfValid) {
		addInvalidClass(fieldPasswordConfirm);
		errorTextPass.textContent = errorPassFormat;
	} else if (passwordInput.value !== passwordConfirmInput.value || passwordConfirmInput.value === '') {
		addInvalidClass(fieldPasswordConfirm);
		errorTextPass.textContent = errorConfirm;
	} else {
		removeInvalidClass(fieldPasswordConfirm);
	}
}

eyeToggle.forEach((eyeIcon) => {
	eyeIcon.addEventListener('click', () => {
		const passInput = eyeIcon.parentElement.querySelector('input');
		togglePasswordVisibility(passInput, eyeIcon);
	});
});

// Проверка функций на корректность
function validateFormInputs() {
	checkLogin();
	checkName();
	checkSurName();
	checkDate();
	checkPayment();
	checkEmail();
	checkPass();
	checkPassConf();
}

function updateFormValidity() {
	const isFormValid =
        !fieldLogin.classList.contains('invalid') &&
        !validText.classList.contains('invalid') &&
        !fieldName.classList.contains('invalid') &&
        !fieldSurName.classList.contains('invalid') &&
        !fieldDate.classList.contains('invalid') &&
        !fieldPayment.classList.contains('invalid') &&
        !fieldMail.classList.contains('invalid') &&
        !fieldPassword.classList.contains('invalid') &&
        !fieldPasswordConfirm.classList.contains('invalid');

	if (isFormValid) {
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
}

form.addEventListener('submit', (event) => {
	event.preventDefault(); // предотвращение отправки формы
	validateFormInputs();
	updateFormValidity();
});

// Добавление обработчиков событий "input" для каждого поля ввода
// loginInput.addEventListener('input', validateFormInputs);
// firstNameInput.addEventListener('input', validateFormInputs);
// surNameInput.addEventListener('input', validateFormInputs);
// dateInput.addEventListener('input', validateFormInputs);
// paymentInput.addEventListener('input', validateFormInputs);
// mailInput.addEventListener('input', validateFormInputs);
// passwordInput.addEventListener('input', validateFormInputs);
// passwordConfirmInput.addEventListener('input', validateFormInputs);
