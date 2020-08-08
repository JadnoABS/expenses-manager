async function handleRegister(event){
    event.preventDefault();
    const inputs = event.target.getElementsByTagName('input');
    const data = {};

    for(let input of inputs){
        data[input.getAttribute('name')] = input.value;
    };

    try {
        const response = await api.post('profile', data);
        alert(`Seu ID de acesso é: ${response.data.id}`);
        router.navigateTo('/login');
    } catch (err) {
        alert('Erro no cadastro, tente novamente!');
    }
};