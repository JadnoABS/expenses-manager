const app = document.querySelector('#app');

//Load Handlebars templates
const landingTemplate = Handlebars.compile(document.querySelector('#landing-page').innerHTML),
    registerTemplate = Handlebars.compile(document.querySelector('#registration-page').innerHTML),
    errorTemplate = Handlebars.compile(document.querySelector('#error-page').innerHTML),
    expensesTemplate = Handlebars.compile(document.querySelector('#expenses-page').innerHTML),
    idTemplate = Handlebars.compile(document.querySelector('#id-page').innerHTML),
    loginTemplate = Handlebars.compile(document.querySelector('#login-page').innerHTML),
    profileTemplate = Handlebars.compile(document.querySelector('#profile-page').innerHTML);

//Rest API Configuration
const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
});

//Route configuration
const router = new Router({
    mode: 'history',
    page404: (path) => {
        const html = errorTemplate({
            color: 'red',
            title: 'Error 404 - Page NOT Found!',
            message: `The path '/${path}' does not exist on this site`,
        });
        app.innerHTML = html;
    }
});

const showError = (error) => {
    const { title, message } = error.response.data;
    const html = errorTemplate({ color: 'red', title, message });
    app.innerHTML = html;
};

//Router
router.add('/', () => {
    let html = landingTemplate();
    app.innerHTML = html;
})

router.add('/register', () => {
    let html = registerTemplate();
    app.innerHTML = html;
})

router.add('/login', () => {
    let html = loginTemplate();
    app.innerHTML = html;
});

router.add('/expenses', () => {
    loadExpenses();
});

router.add('/profile', () => {
    loadProfile();
})

router.navigateTo(window.location.pathname);

const a = document.querySelectorAll('a');
for(let tag of a){
    tag.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        const href = target.getAttribute('href'),
            path = href.substr(href.lastIndexOf('/'));

        router.navigateTo(path);
    })
}