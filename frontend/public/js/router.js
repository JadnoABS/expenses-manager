// window.addEventListener('load', () => {
//     //Route configuration
//     const router = new Router({
//         mode: 'history',
//         page404: (path) => {
//             const html = errorTemplate({
//                 color: 'red',
//                 title: 'Error 404 - Page NOT Found!',
//                 message: `The path '/${path}' does not exist on this site`,
//             });
//             app.innerHTML = html;
//         }
//     });

//     //Routes

//     router.add('/', loadLanding());

//     router.add('/login', loadLogin());

    
// })