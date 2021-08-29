
async function handleRegister(event){
    event.preventDefault();
    const inputs = event.target.getElementsByTagName('input');
    const data = {};

    for(let input of inputs){
        data[input.getAttribute('name')] = input.value;
    };

    data.password = await CryptoJS.PBKDF2(data.password, data.email).toString();

    try {
        const response = await api.post('/user/register', data);

        router.navigateTo('/login');
    } catch (err) {
        let error = document.createElement('p');
        let renderMessage = event.target.appendChild(document.createElement('div'));
        error.classList.add('wrong-pass');
        error.innerHTML = err.response.data.error || "Erro no cadastro, tente novamente!";
        renderMessage.appendChild(error);
    }
};
