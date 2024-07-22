const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);

    const obj = {}

    data.forEach((value, key) => obj[key] = value);
    if (!obj.email || !obj.password) {
        Swal.fire({
            icon: "error",
            title: "Debes llenar todos los campos",
          });
    }
    else {
        fetch( '/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            if (result.status === 200) {
                window.location.replace('/products')
            }
            else if (result.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Credenciales incorrectas",
                    footer: '¿No estás registrado? <a href="/users/register">Regístrate aquí</a></p>'
                  });
            }
        })
    }
})