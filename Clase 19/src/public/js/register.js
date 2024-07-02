const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);

    const obj = {}

    data.forEach((value, key) => obj[key] = value);
    fetch( '/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/users/login')
        }
        else if (result.status === 400) {
            Swal.fire({
                icon: "error",
                title: "Información incompleta",
                text: "No has rellenado todos los campos",
              });
        }
    })
})