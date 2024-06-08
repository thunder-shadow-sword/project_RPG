document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const criarBtn = document.getElementById('btn_criar');
    const logarBtn = document.getElementById('btn_logar');
  
    criarBtn.addEventListener('click', () => {
      const params = {
        isLogin: false.toString(),  // Converte booleano para string
        username: form.elements.username.value,
        password: form.elements.password.value,
        mail: form.elements.mail.value,
        phone: form.elements.phone.value,
        name: form.elements.name.value
      };
      sendFormData(params);
    });
  
    logarBtn.addEventListener('click', () => {
      const params = {
        isLogin: true.toString(),  // Converte booleano para string
        username: form.elements.username.value,
        password: form.elements.password.value
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
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar dados');
        }
        // Se o envio for bem-sucedido, redireciona para a página de índice
        window.location.href = '/index';
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
    }
});
