async function handleRegister(event){
    event.preventDefault();
    const inputs = event.target.getElementsByTagName('input');
    const data = {};

    for(let input of inputs){
        data[input.getAttribute('name')] = input.value;
    };

    try {
        const response = await api.post('user/register', data);
        router.navigateTo('/login');
    } catch (err) {
        let error = document.createElement('p');
        let renderMessage = event.target.querySelector('error-message');
        error.classList.add('wrong-pass');
        error.innerHTML = 'Erro no cadastro, tente novamente!';
        renderMessage.innerHTML = error;
    }
};