async function loadProfile() {
    try {
        const response = await api.get('user/profile', {
            headers: {
                Authorization: localStorage.getItem('userId'),
            },
        });
        const expenseResponse = await api.get('user/expenses', {
            headers: {
                Authorization: localStorage.getItem('userId'),
            },
        });

        var totalExpensesValue = 0;

        for(let expense of expenseResponse.data){
            totalExpensesValue += parseFloat(expense.value);
        };

        let html = profileTemplate({
            name: response.data.name,
            email: response.data.email,
            revenue: response.data.revenue,
            expensesValue: totalExpensesValue,
            id: response.data.id
        });

        app.innerHTML = html;

        const expensesSpan = document.querySelector('#expenses-value');
        if(totalExpensesValue / response.data.revenue < 0.5){
            expensesSpan.classList.add('safe');
            return;
        } else if(totalExpensesValue / response.data.revenue < 0.8){
            expensesSpan.classList.add('alert');
            return;
        } else {
            expensesSpan.classList.add('danger');
            return;
        }
    } catch(err) {
        console.log(err);
        showError(err);
    }
};

async function changeName(event) {
    event.preventDefault();
    let name = event.target.elements["name"].value,
        userId = localStorage.getItem('userId');

    try {
        const response = await api.put('user/profile', {name}, {
            headers: {
                Authorization: userId,
            },
        });
    } catch(err) {
        alert('Ocorreu um erro!');
        console.log(err);
    }
}

async function changePass(event) {
    event.preventDefault();
    let password = event.target.elements["current-pass"].value,
        newPassword = event.target.elements["new-pass"].value,
        repeatPass = event.target.elements["repeat-pass"].value,
        id = localStorage.getItem('userId'),
        email = localStorage.getItem('email');

    if(newPassword !== repeatPass){
        let error = document.createElement('p');
        error.classList.add('wrong-pass');
        error.innerHTML = 'As senhas não correspondem!';
        event.target.appendChild(error);
        return;
    };

    password = await CryptoJS.PBKDF2(password, email).toString(); 
    newPassword = await CryptoJS.PBKDF2(newPassword, email).toString();

    try {
        const response = await api.put('user/changepass', { password, newPassword }, {
            headers: {
                Authorization: id,
            },
        });

        router.navigateTo('/profile');
    } catch(err) {
        alert('Ocorreu um erro!');
    }
};

async function changeRevenue(event) {
    let id = localStorage.getItem('userId'),
        revenue = event.target.value;
    
    try {
        const response = await api.put('revenue', { revenue }, {
            headers: {
                Authorization: id,
            },
        });
        return;
    } catch(err) {
        alert('Ocorreu um erro!');
    }
}
