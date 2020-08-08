const handleLogin = async (event) => {
    event.preventDefault();
    const name = event.target.elements["name"].value;
    const password = event.target.elements["password"].value;
    const data = {name, password};

    try {
        const response = await api.post('session', data);

        localStorage.setItem('userId', response.data.id);

        router.navigateTo('/expenses');
    } catch (err) {
        let error = document.createElement('p');
        error.classList.add('wrong-pass');
        error.innerHTML = 'Senha Incorreta!';
        event.target.appendChild(error);
    }
};

function logout() {
    localStorage.clear();
    router.navigateTo('/');
}