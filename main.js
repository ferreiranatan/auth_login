const URL = 'https://dummyjson.com/users';
const botao = document.getElementById('botao');

botao.addEventListener('click', (event) => {
  event.preventDefault();
  const usuarioValor = document.getElementById('loginInput').value;
  const senhaValor = document.getElementById('passwordInput').value;
  autenticacao(usuarioValor, senhaValor);
});

const autenticacao = (usuarioValor, senhaValor) => {
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      username: usuarioValor,
      password: senhaValor
    })
  })
  .then(res => res.json())
  .then(data => {
    const autenticado = data.username === usuarioValor && data.password === senhaValor;

    if (autenticado) {
      getInformationforApi();
    } else {
      console.log('Credenciais inválidas');
    }
  });
};

const getInformationforApi = () => {
  fetch(URL)
  .then(res => res.json())
  .then(data => {
    const usuarioValor = document.getElementById('loginInput').value;
    const senhaValor = document.getElementById('passwordInput').value;
    
    const login = data.find(item => item.username === usuarioValor && item.password === senhaValor);

    if (login) {
      document.getElementById('formLogin').style.display = 'none';
      document.getElementById('formData').style.display = 'block';

      document.getElementById('id').innerText = login.id;
      document.getElementById('userName').innerText = login.username;
      document.getElementById('email').innerText = login.email;
      document.getElementById('fName').innerText = login.firstname;
      document.getElementById('lName').innerText = login.lastname;
      document.getElementById('gender').innerText = login.gender;
      document.getElementById('userImage').src = login.image;
    } else {
      console.log('Usuário não encontrado');
    }
  });
};
