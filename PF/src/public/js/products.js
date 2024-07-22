const btnLogout = document.getElementById('btn-logout');
btnLogout.addEventListener('click', e => {

    fetch( '/api/sessions/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/users/login')
        }
    })

})