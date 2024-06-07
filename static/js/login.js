// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const criarBtn = document.getElementById('btn_criar');
    const logarBtn = document.getElementById('btn_logar');

    criarBtn.addEventListener('click', () => {
        form.action = `/login?logando=false&user=${form.username.value}&password=${form.password.value}&name=${form.name.value}&email=${form.mail.value}&phone=${form.name.value}&phone=${form.phone.value}`;
        form.submit();
    });

    logarBtn.addEventListener('click', () => {
        form.action = `/login?logando=true&user=${form.username.value}&password=${form.password.value}`;
        form.submit();
    });
})
