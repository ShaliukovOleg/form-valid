const form = document.querySelector('.reg-form__info');
// переменная для проверки всей формы на валидность

// Для проверки логина
const fieldLogin = form.querySelector('.field--login'),
    // переменная для проверки формы логина на и вывода ошибки в случае невалидности формы
    loginInput = document.querySelector('.login');
// для проверки доступности логина в массиве

// Для проверки имени
const fieldName = form.querySelector('.field--name'),
    // для проверки поля имени и добавления дополнительных классов при невалидности
    firstNameInput = document.querySelector('.first-name');
// для проверки на количество символов не больше 20ти

// Для проверки фамилии
const fieldSurName = form.querySelector('.field--lastname'),
    // для проверки поля фамилии и добавления дополнительных классов при невалидности
    surNameInput = document.querySelector('.last-name');
// для проверки на количество символов не больше 20ти

// Для проверки даты
const fieldDate = form.querySelector('.field--date'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности
    dateInput = document.querySelector('.date');
// для проверки самого инпута на валидность даты до 1940 года

// Для выгрузки роли в объект
const fieldRole = form.querySelector('.field--role');
// для выгрузки данных в объект

// Для проверки оплаты
const fieldPayment = form.querySelector('.field--payment'),
    // для проверки поля даты рождения и добавления дополнительных классов при невалидности
    paymentInput = document.querySelector('.payment');
// для проверки самого инпута на валидность даты до 1940 года

// Для проверки почты 
const fieldMail = form.querySelector('.field--mail'),
    // для проверки поля почта на валидность и добавления дополнительных классов при невалидности
    mailInput = document.querySelector('.mail');
// для проверки самого инпута на валидность a-z, 0-9, @ и .

// Для проверки пароля
const fieldPassword = form.querySelector('.password--create'),
    // для проверки поля пароля на валидность и добавления дополнительных классов при невалидности
    passwordInput = document.querySelector('.password');
// для проверки самого пароля-инпута на валидность: 8 символов, 1 заглавная, 1 символ

// Для проверки подтверждения пароля
const fieldPasswordConfurm = form.querySelector('.password--confurm'),
    // для проверки поля пароля на валидность и добавления дополнительных классов при невалидности
    passwordConfurmInput = document.querySelector('.password-confurm');
// для проверки самого пароля-инпута на валидность: 8 символов, 1 заглавная, 1 символ

// Для переключения иконки глаза и изменения отображения инпута пароля
const eyeIcons = document.querySelector('.hide-show');
