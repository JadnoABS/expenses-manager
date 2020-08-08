async function loadProfile() {
    try {
        const response = await api.get('profile', {
            headers: {
                Authorization: localStorage.getItem('userId'),
            },
        });

        let html = profileTemplate({
            name: response.data.name,
            email: response.data.email,
            id: response.data.id
        });

        app.innerHTML = html;
    } catch(err) {
        showError(err);
    }
};