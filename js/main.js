const form = document.querySelector('.reg-form__info'),
    // переменная для проверки всей формы на валидность
    validText = document.querySelector('.valid-text'),

    fieldLogin = form.querySelector('.field--login'),
    // переменная для проверки формы логина на и вывода ошибки в случае невалидности формы
    loginInput = document.querySelector('.login'),
    // для проверки доступности логина в массиве
    error__text = document.querySelector('.error__text');

const
    errorValueCharacters = 'Please no less than 4 and no more than 20 characters',
    errorLoginBusy = 'Login is taken, please choose another one';

// Login Validation
function checkLogin() {
    const arrayLogins = ['JohnSmith', 'MinecraftNoob2008', 'Gargantua1999', 'Vasya', 'Oleja', 'Stas'];
    const loginPattern = /^[a-zA-z_\d]{3,20}$/;
    !arrayLogins.includes(loginInput.value) === false
        || !loginInput.value.match(loginPattern)
        ? fieldLogin.classList.add('invalid')
        : fieldLogin.classList.remove('invalid')

    !arrayLogins.includes(loginInput.value) === false
        || !loginInput.value.match(loginPattern)
        ? validText.classList.add('invalid')
        : validText.classList.remove('invalid')

    !loginInput.value.match(loginPattern)
        ? error__text.textContent = errorValueCharacters
        : validText.classList.remove('invalid')

    !arrayLogins.includes(loginInput.value) === false
        ? error__text.textContent = errorLoginBusy
        : validText.classList.remove('invalid')
};

const fieldName = form.querySelector('.field--name'),
    // для проверки поля имени и добавления дополнительных классов при невалидности
    firstNameInput = document.querySelector('.first-name');
// для проверки на количество символов не больше 20ти

// Name Validation
function checkName() {
    const namePattern = /^[a-zA-z_\d]{4,20}$/;
    !firstNameInput.value.match(namePattern)
        ? fieldName.classList.add('invalid')
        : fieldName.classList.remove('invalid');
};

const fieldSurName = form.querySelector('.field--lastname'),
    // для проверки поля фамилии и добавления дополнительных классов при невалидности
    surNameInput = document.querySelector('.last-name');
// для проверки на количество символов не больше 20ти

function checkSurName() {
    const surNamePattern = /^[a-zA-z_\d]{4,20}$/;
    !surNameInput.value.match(surNamePattern)
        ? fieldSurName.classList.add('invalid')
        : fieldSurName.classList.remove('invalid');
};

const fieldDate = form.querySelector('.field--date'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности
    dateInput = document.querySelector('.date');
// для проверки самого инпута на валидность даты до 1940 года



const fieldRole = form.querySelector('.field--role'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности

    fieldPayment = form.querySelector('.field--payment'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности
    paymentInput = document.querySelector('.payment'),
    // для проверки самого инпута на валидность даты до 1940 года

    fieldMail = form.querySelector('.field--mail'),
    // для проверки поля почта на валидность и добавления дополнительных классов при невалидности
    mailInput = document.querySelector('.mail'),
    // для проверки самого инпута на валидность a-z, 0-9, @ и .

    fieldPassword = form.querySelector('.password--create'),
    // для проверки поля пароля на валидность и добавления дополнительных классов при невалидности
    passwordInput = document.querySelector('.password'),
    // для проверки самого пароля-инпута на валидность: 8 символов, 1 заглавная, 1 символ

    fieldPasswordConfurm = form.querySelector('.password--confurm'),
    // для проверки поля пароля на валидность и добавления дополнительных классов при невалидности
    passwordConfurmInput = document.querySelector('.password-confurm'),
    // для проверки самого пароля-инпута на валидность: 8 символов, 1 заглавная, 1 символ

    eyeIcons = document.querySelector('.hide-show');

// Проверка функций на корректность
form.addEventListener('submit', (check) => {
    check.preventDefault(); // предотвращение отправки формы
    // если событие не обрабатывается при запуске, то его действие по умолчанию не должно выполняться!
    checkLogin();
    checkName();
    checkSurName();

    // проверка функции при нажатии вызова
    loginInput.addEventListener('keyup', checkLogin);
    validText.addEventListener('keyup', checkLogin);
    firstNameInput.addEventListener('keyup', checkName);
    surNameInput.addEventListener('keyup', checkSurName);

    if (
        !fieldLogin.classList.contains('invalid') &&
        !validText.classList.contains('invalid') &&
        !fieldName.classList.contains('invalid') &&
        !fieldSurName.classList.contains('invalid')
    ) {
        location.href = form.getAttribute('action');
    }
}); 
