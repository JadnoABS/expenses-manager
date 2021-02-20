const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    const encryptedPass = await CryptoJS.PBKDF2(password, email).toString();

    const data = {email, encryptedPass};

    try {
        const response = await api.post('session', data);

        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('username', response.data.name);

        router.navigateTo('/expenses');
    } catch (err) {
        let errorMessage = document.querySelector('.error-message');
        errorMessage.innerHTML = '<p class="wrong-pass">Nome e/ou Senha Incorretos!</p>';
    }
};

function logout() {
    localStorage.clear();
    router.navigateTo('/');
}