document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const criarBtn = document.getElementById('btn_criar');
    const logarBtn = document.getElementById('btn_logar');
  
    criarBtn.addEventListener('click', () => {
      const params = {
        isLogin: false,
        username: form.elements.username.value,
        password: form.elements.password.value,
        mail: form.elements.mail.value,
        phone: form.elements.phone.value,
        name: form.elements.name.value
      };
      redirectToLogin(params);
    });
  
    logarBtn.addEventListener('click', () => {
      const params = {
        isLogin: true,
        username: form.elements.username.value,
        password: form.elements.password.value
      };
      redirectToLogin(params);
    });
  
    function redirectToLogin(params) {
      const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
      window.location.href = `/login?${queryString}`;
    }
  });
  