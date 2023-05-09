const form = document.querySelector('.reg-form__info'),
    // переменная для проверки всей формы на валидность
    validText = document.querySelector('.valid-text'),

    fieldLogin = form.querySelector('.field--login'),
    // переменная для проверки формы логина на и вывода ошибки в случае невалидности формы
    loginInput = document.querySelector('.login'),
    // для проверки доступности логина в массиве
    error__text = document.querySelector('.error__text');

const userDataObject = {};
const submitComplete = 'Поздравляю, с успешным заполнением формы! Вы восхитительны!';

// Общие ошибки при заполнении форм
const errorValueCharacters = 'Please no less than 3 and no more than 20 characters';

// Проверка валидности логина

const characterLimit = /^[a-zA-z_\d]{3,20}$/;
const dateLimit = /^\d{2}\.\d{2}\.\d{4}$/i;


function checkLogin() {
    const arrayLogins = ['JohnSmith', 'MinecraftNoob2008', 'Gargantua1999', 'Vasya', 'Oleja', 'Stas'];

    const errorTextLogin = document.querySelector('.error__text--login');
    const errorLoginBusy = 'Login is taken, please choose another one';

    !arrayLogins.includes(loginInput.value) === false
        || !loginInput.value.match(characterLimit)
        ? ((fieldLogin.classList.add('invalid')), (validText.classList.add('invalid')))
        : ((fieldLogin.classList.remove('invalid')), (validText.classList.remove('invalid')))

    !loginInput.value.match(characterLimit)
        ? errorTextLogin.textContent = errorValueCharacters
        : validText.classList.remove('invalid')

    !arrayLogins.includes(loginInput.value) === false
        ? error__text.textContent = errorLoginBusy
        : validText.classList.remove('invalid')
};

// Проверка валидности имени

const fieldName = form.querySelector('.field--name'),
    // для проверки поля имени и добавления дополнительных классов при невалидности
    firstNameInput = document.querySelector('.first-name');
// для проверки на количество символов не больше 20ти

function checkName() {
    const errorTextName = document.querySelector('.error__text--name');

    !firstNameInput.value.match(characterLimit)
        ? (fieldName.classList.add('invalid'), errorTextName.textContent = errorValueCharacters)
        : (fieldName.classList.remove('invalid'), validText.classList.remove('invalid'));
};

// Проверка валидности фамилии

const fieldSurName = form.querySelector('.field--lastname'),
    // для проверки поля фамилии и добавления дополнительных классов при невалидности
    surNameInput = document.querySelector('.last-name');
// для проверки на количество символов не больше 20ти

function checkSurName() {
    const errorTextSurName = document.querySelector('.error__text--lastname');
    const surNamePattern = /^[a-zA-z_\d]{4,20}$/;
    !surNameInput.value.match(surNamePattern)
        ? (fieldSurName.classList.add('invalid'),
            errorTextSurName.textContent = errorValueCharacters)
        : (fieldSurName.classList.remove('invalid'),
            validText.classList.remove('invalid'));
};

// Проверка валидности даты

const fieldDate = form.querySelector('.field--date'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности
    dateInput = document.querySelector('.date');
// для проверки самого инпута

dateInput.maxLength = '10';

function checkDate() {
    //переменная для вывода нужной ошибки
    const errorTextDate = document.querySelector('.error__text--date'),

        // все варианты возможных ошибок при проверке даты
        errorDateFormat = 'You entered an invalid date', // ошибка формата даты
        errorDateBelow = 'The date cannot be lower than 1940', // дата не ниже 1940 года
        errorDateFuture = 'You can`t pick a date from the future', // дата не больше сегодняшнего числа
        errorFormat = 'DD.MM.YYYY (example: 16.03.2010)', // ошибка с рекомендацией по формату даты
        errorAge = 'You must be over 18'; // проверка на совершеннолетие

    const dateInfo = dateInput.value;
    dateInput.value = dateInfo.replace(/([^1-9]{0})/g, '');
 
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    let match = dateInput.value.match(regex);

    // первое условие, которое нужно пройти это проверка даты на валидность, 
    // т.е. пустое значение даты выдаст первичную ошибку о том, что дата имеет не правильный формат
    if (!dateInput.value.match(regex)) {
        ((fieldDate.classList.add('invalid')) &&
            (errorTextDate.textContent = errorFormat));

    } else {

        let day = match[1];
        let month = match[2];
        let year = match[3];

        let dateNow = new Date(Date.now());
        let dateBefore = new Date(1939 - 1, 13 - 1, 31);
        let datePattern = new Date(year, month - 1, day);

        // первое условие проверка даты на валидность
        !(datePattern.getFullYear() == year
            && datePattern.getMonth() == month - 1
            && datePattern.getDate() == day)
            ? (fieldDate.classList.add('invalid'),
                (errorTextDate.textContent = errorDateFormat))

            // проверка года на доступность не ниже 1939 года
            : !(datePattern > dateBefore)
                ? (fieldDate.classList.add('invalid'), (errorTextDate.textContent = errorDateBelow))

                // проверка. Нельзя использовать даты, которых еще не было
                : !(datePattern < dateNow)
                    ? (fieldDate.classList.add('invalid'),
                        (errorTextDate.textContent = errorDateFuture))

                    // проверка совершеннолетия пользователя
                    : !((Math.ceil((dateNow - datePattern) / (1000 * 3600 * 24))) > 6574)
                        ? (fieldDate.classList.add('invalid'),
                            (errorTextDate.textContent = errorAge))

                        // если все условия соблюдены, то завершение выполнения
                        : (fieldDate.classList.remove('invalid'),
                            validText.classList.remove('invalid'));
    };
};

// Выгрузка значения профессии

const profession = document.querySelectorAll('input[name="role"]');
let professionInfo = '';
for (const profValue of profession) {
    if (profValue.checked) {
        professionInfo = profValue.value
    }
}

const fieldRole = form.querySelector('.field--role'),
    // не обязательная переменная, для дальнейшего дополнения ролей в список, в который можно будет добавить свое значение
    roleInfo = form.querySelector('.role__info');
// для выгрузки значения в объект

// Проверка валидности оплаты

const fieldPayment = form.querySelector('.field--payment'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности 
    paymentInput = document.querySelector('.payment');
// для проверки самого инпута на валидность даты до 1940 года
paymentInput.maxLength = '10';

function checkPayment() {
    const value = paymentInput.value;
    paymentInput.value = value.replace(/([^1-9]{0})([^0-9]{1,10})/g, '');

    const paymentPattern = /^[a-zA-z_\d]{4,20}$/;
    const errorTextPayment = document.querySelector('.error__text--payment');
    !paymentInput.value.match(paymentPattern)
        ? (fieldPayment.classList.add('invalid'),
            errorTextPayment.textContent = errorValueCharacters)
        : (fieldPayment.classList.remove('invalid'),
            validText.classList.remove('invalid'));
};

// Проверка валидности почты

const fieldMail = form.querySelector('.field--mail'),
    // для проверки поля почта на валидность и добавления дополнительных классов при невалидности
    mailInput = document.querySelector('.mail');
// для проверки самого инпута на валидность a-z, 0-9, @ и .

function checkEmail() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const errorTextEmail = document.querySelector('.error__text--email');
    const errorEmailFormat = '***@mail.com/ru/fi (example: qwerty@gmail.com)';

    !mailInput.value.match(emailPattern)
        ? (fieldMail.classList.add('invalid'),
            errorTextEmail.textContent = errorEmailFormat)
        : (fieldMail.classList.remove('invalid'),
            validText.classList.remove('invalid'));
};

// Переключение видимости пароля

const eyeToggle = document.querySelectorAll('.hide-show');

eyeToggle.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        const passInput = eyeIcon.parentElement.querySelector("input");
        // для переключения типа инпута
        passInput.type === "password"
            ? (eyeIcon.classList.replace("eye-hide", "eye-show"),
                (passInput.type = "text"))
            : (eyeIcon.classList.replace("eye-show", "eye-hide"),
                passInput.type = "password")
    });
});

// Проверка валидности пароля

const fieldPassword = form.querySelector('.password--create');
// для проверки поля пароля на валидность и добавления дополнительных классов при невалидности
const passwordInput = document.querySelector('.password');
// для проверки самого пароля-инпута на валидность: 8 символов, 1 заглавная, 1 символ

const errorPassFormat = 'Example: Passwd1!';
// Общая ошибка по инпутам паролей

function checkPass() {
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const errorTextPass = document.querySelector('.error__text--password');

    !passwordInput.value.match(passPattern)
        ? (fieldPassword.classList.add("invalid"),
            errorTextPass.textContent = errorPassFormat)
        : (fieldPassword.classList.remove("invalid"),
            validText.classList.remove('invalid'));
}

// Проверка валидности подтверждения пароля

const fieldPasswordConfirm = form.querySelector('.password--confirm'),
    // для проверки поля пароля на валидность и добавления дополнительных классов при невалидности
    passwordConfirmInput = document.querySelector('.confirm');
// для проверки самого пароля-инпута на валидность: 8 символов, 1 заглавная, 1 символ

function checkPassConf() {
    const passPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const errorTextPass = document.querySelector('.error__text--confirm');

    const errorConfirm = 'Password mismatch!';
    !passwordConfirmInput.value.match(passPattern)
        ? (fieldPasswordConfirm.classList.add("invalid"),
            errorTextPass.textContent = errorPassFormat)
        : passwordInput.value !== passwordConfirmInput.value || passwordConfirmInput.value === ""
            ? (fieldPasswordConfirm.classList.add("invalid"),
                errorTextPass.textContent = errorConfirm)
            : (fieldPasswordConfirm.classList.remove("invalid"),
                validText.classList.remove('invalid'));
}

// Проверка функций на корректность
form.addEventListener('submit', (check) => {
    check.preventDefault(); // предотвращение отправки формы
    // если событие не обрабатывается при запуске, то его действие по умолчанию не должно выполняться!
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
    validText.addEventListener('keyup', checkLogin);
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
