// var, let y const
// let obj1 = {nombre : "Matías", edad: 17};
// console.log("Objeto 1");
// console.log(obj1);

// let obj2 = obj1;
// console.log("Objeto 2");
// console.log(obj2);

// obj2.nombre = "Pablo";
// obj2.edad = 80;
// obj2.pais = "Maracaibo"
// console.log("Objeto 1");
// console.log(obj1);
// console.log("Objeto 2");
// console.log(obj2);

// desestructuración de arrays

const array = ['Jasmín', 'Aurora', 'Mérida', 'Cenicienta', 'Bella', 'Blancanieves']

    // Seleccionar los primeros x

let [posicion1, posicion2, posicion3] = array
console.log(posicion1, posicion2, posicion3);

    // Seleccionar posiciones específicas, saltar elementos

let [posicionn1, , posicionn3, , , posicion6] = array;

console.log(posicionn1, posicionn3, posicion6);

    // GUARDAR EL RESTO
let [posicionnn1, posicionnn2, , ... otrasPrincesas] = array;

console.log(posicionnn1, posicionnn2, otrasPrincesas);


// Desestructuración de objetos
let user = {nombre: 'Juan', apellido: 'Palmar', edad: 28, genero: 'M', direccion: {calle: '87', avenida : '5'}}
console.clear();
console.log(user);
let {nombre, edad, direccion: {calle}, ... restoUser} = user
console.log(nombre, edad, restoUser, calle);

// swap de variables
console.log(`Nombre: ${nombre}, Edad: ${edad}`);
[nombre, edad] = [edad, nombre];
console.log(`Nombre: ${nombre}, Edad: ${edad}`);