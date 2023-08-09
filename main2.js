const form = document.getElementById('formLogin')

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const userValue = document.getElementById('loginInput').value
    const passwordValue = document.getElementById('passwordInput').value
    await autenticacao(userValue, passwordValue) 
})

const autenticacao = async (valor, valor2) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            username: valor,
            password: valor2
        }) 
    })

    if (response.ok) {
        validacao()
    } else {
        console.log('Autenticação falhou')
    }
}

const validacao = () => {
    getApi()
}

let dadosApi = []
const URL = 'https://dummyjson.com/users'
const divCracha = document.getElementById('dadosApi')

async function getApi() {
    const res = await fetch(URL)
    dadosApi = await res.json()
    console.log(dadosApi)

    exibirNaDiv(dadosApi)
}

function exibirNaDiv(listaDados, targetDiv) {
    exibirTelaDados();
    targetDiv.innerHTML = ''; // Limpa o conteúdo anterior

    listaDados.forEach(dado => {
        targetDiv.innerHTML += `
            <p><strong>ID:</strong> <span id="idNumber">${dado.id}</span></p>
            <br>
            <p><strong>Name:</strong> <span id="fName">${dado.firstName}</span></p>
            <p><strong>LastName:</strong> <span id="lName">${dado.lastName}</span></p>
            <br>
            <p>Email: <span id="email">${dado.email}</span></p>
            <p>Gender: <span id="gender">${dado.gender}</span></p>
            <p>City: <span id="city">${dado.city}</span></p>
        `;
    });
}

// ...

async function getApi() {
    const res = await fetch(URL);
    const dadosApi = await res.json();
    console.log(dadosApi);

    exibirNaDiv(dadosApi, divCracha); 
}



const exibirTelaDados = () => {
    document.getElementById('formLogin').style.display = 'none';
    document.getElementById('cracha').style.display = 'block';
}
