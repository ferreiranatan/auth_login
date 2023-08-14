//Capturando as referencias do html através do DOM
const form = document.getElementById('formLogin')
const formCracha = document.getElementById('formCracha')
const crachaDados = document.getElementById('crachaDados')

form.addEventListener('submit', async (evento) => {
  evento.preventDefault()

  const userValue = document.getElementById('loginInput').value
  const passwordValue = document.getElementById('passwordInput').value

  const autenticated = await autenticacao(userValue, passwordValue)

  if (autenticated) {
    form.style.display = 'none'
    formCracha.style.display = 'block'

    const dataUser = await getUserData(autenticated)
    showDataUsers(dataUser)
  }
})

async function autenticacao(username, password) {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    })
  })

  if (response.ok) {
    const data = await response.json()
    return data.id
  }
  return null
}

async function getUserData(id) {
  const response = await fetch(`https://dummyjson.com/users/${id}`)
  if (response.ok) {
    return await response.json()
  }
  return null
}

async function showDataUsers(dataUser) {
  if (dataUser) {
    const crachaImage = document.getElementById('crachaImage');
    crachaImage.style.backgroundImage = `url("${dataUser.image}")`;

    const fullName = document.getElementById('fullName')
    fullName.innerHTML = `<p class="full__name-js"><span>${dataUser.firstName} </span>${dataUser.lastName}</p>`

    const crachaDados = document.getElementById('crachaDados');
    crachaDados.innerHTML = `
      <p><span>ID:</span>${dataUser.id}<p>
      <p>Nome: ${dataUser.firstName}</p>
      <p>Sobrenome: ${dataUser.lastName}</p>
      <p>Usuario: ${dataUser.username}</p>
      <p>Email: ${dataUser.email}</p>
      <p>Gênero: ${dataUser.gender}</p>
    `;
  }
}