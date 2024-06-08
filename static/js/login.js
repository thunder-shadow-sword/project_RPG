document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('form_cadastro');
  const formLogin = document.getElementById('form_login');
  const btnCriar = document.getElementById('btn_criar');
  const btnLogarFormCadastro = document.getElementById('btn_logar_form_cadastro');
  const btnCriarFormLogin = document.getElementById('btn_criar_form_login');
  const btnLogar = document.getElementById('btn_logar');

  // Inicialmente, oculte o formCadastro (formulário de cadastro)
  formCadastro.style.display = 'none';

  btnCriarFormLogin.addEventListener('click', () => {
      formLogin.style.display = 'none';  // Oculta o formulário de login
      formCadastro.style.display = 'flex';  // Mostra o formulário de cadastro
  });

  btnLogarFormCadastro.addEventListener('click', () => {
      formCadastro.style.display = 'none';  // Oculta o formulário de cadastro
      formLogin.style.display = 'flex';  // Mostra o formulário de login
  });

  btnCriar.addEventListener('click', () => {
      const params = {
          isLogin: false.toString(),  // Converte booleano para string
          username: document.getElementById('cadastro_username').value,
          password: document.getElementById('cadastro_password').value,
          mail: document.getElementById('cadastro_mail').value,
          phone: document.getElementById('cadastro_phone').value,
          name: document.getElementById('cadastro_name').value.toUpperCase()
      };
      sendFormData(params);
  });

  btnLogar.addEventListener('click', () => {
      const params = {
          isLogin: true.toString(),  // Converte booleano para string
          username: document.getElementById('login_username').value,
          password: document.getElementById('login_password').value
      };
      sendFormData(params);
  });

  function sendFormData(params) {
      fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
      }).then(response => {
          if (!response.ok) {
              throw new Error('Erro ao enviar dados');
          }
          // Se o envio for bem-sucedido, redireciona para a página de índice
          window.location.href = '/index';
      }).catch(error => {
          console.error('Erro ao enviar dados:', error);
      });
  }
});
