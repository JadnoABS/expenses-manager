async function loadExpenses() {
    try {
        const profileResponse = await api.get('user/profile', {
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

        let html = expensesTemplate({
            name: profileResponse.data.name,
            email: profileResponse.data.email,
            revenue: profileResponse.data.revenue,
            expensesValue: totalExpensesValue,
            expenses: expenseResponse.data
        });

        app.innerHTML = html;

        const expensesSpan = document.querySelector('#expenses-value');
        if(totalExpensesValue / profileResponse.data.revenue < 0.5){
            expensesSpan.classList.add('safe');
            return;
        } else if(totalExpensesValue / profileResponse.data.revenue < 0.8){
            expensesSpan.classList.add('alert');
            return;
        } else {
            expensesSpan.classList.add('danger');
            return;
        }

    } catch(err) {
        showError(err);
    }
};

async function createExpense(event) {
    event.preventDefault();
    const expenseData = {},
        user_id = localStorage.getItem('userId');

    for( let element of event.target.elements ){
        expenseData[element.getAttribute('name')] = element.value;
    }

    try {
        await api.post('user/expenses', expenseData, {
            headers: {
                Authorization: user_id
            }
        });

        loadExpenses();
    } catch(err) {
        alert('Ocorreu um erro!');
    }
};

async function deleteExpense(id) {
    try {
        const user_id = localStorage.getItem('userId');

        await api.delete(`user/expenses/${id}`, {
            headers: {
                Authorization: user_id,
            },
        });

        loadExpenses();
    } catch(err) {
        alert("Erro ao deletar despesa!");
    }
}
