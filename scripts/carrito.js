let data = [];
let cantidadProducto = 1;

const URL = "http://localhost:3000";

const containerCards = document.getElementById("containerCards");
const btnShowForm = document.getElementById('btnShowForm');
const containerForm = document.getElementById('containerForm');

const NameInput = document.getElementsByName('Name')[0];
const AdressInput = document.getElementsByName('Adress')[0];
const PhoneInput = document.getElementsByName('Phone')[0];

const getData = async () => {
    const URL_API = "http://localhost:3000/carrito";
    const response = await fetch(URL_API);
    data = await response.json();
    console.log(data);
    renderData();
};
getData();

const renderData = () => {
    containerCards.innerHTML = "";
    data.forEach((element) => {
        containerCards.innerHTML += `
        <article class= "card-products">
        <figure>
          <img src="${element.image}" alt="${element.id}" class ="card__image">
        </figure>
        <div class="description">
        <p> ${element.type}</p>
        <p> ${element.name}</p>
        <p> ${element.mg}</p>  
        <p id="price">$ ${element.price}</p>
        <button class="btn btn--menos"name="${element.id}">-</button>
        <span id="${element.id}">${element.cantidad} </span>
        <button class="btn btn--plus"name="${element.id}">+</button>
        <button class="btnDelete" name="${element.id}">X</button>
        </div>
      </article>
          `;
    });

    const btnDelete = document.getElementsByClassName('btnDelete');

    Array.from(btnDelete).forEach((element) => {
        let id = element.getAttribute('name');
        element.addEventListener('click', () => {
            handleDelete(id);
        })
    });
};

//añadir cantidad
document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("btn--plus")) {
        const idPlus = target.getAttribute("name");
        const spanCantidad = document.getElementById(idPlus);
        spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) + 1;
        cantidadProducto = spanCantidad.innerHTML;
        const productsCarrito = data.find(item => item.id == idPlus);
        productsCarrito.cantidad = cantidadProducto;

    }
});

//restar
document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("btn--menos")) {
        const idPlus = target.getAttribute("name");
        const spanCantidad = document.getElementById(idPlus);
        if (cantidadProducto >= 2) {
            spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) - 1;
            cantidadProducto = spanCantidad.innerHTML;
            const productsCarrito = data.find(item => item.id == idPlus);
            productsCarrito.cantidad = cantidadProducto;

        }

    }
});


const handleDelete = async (id) => { 
    try {
        let response = await fetch(`${URL}/carrito/${id}`, {
            method: 'DELETE'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    getData();
}

const showForm = () => {
    containerForm.classList.remove('hidden');
}

btnShowForm.addEventListener('click', showForm);

const handleSave = async (e) => {
    e.preventDefault();

    let totalProducto = 0;
    data.forEach(element => {
        totalProducto += parseFloat(element.cantidad) * parseFloat(element.price); 
    } );
    console.log(totalProducto);
    const newBuy = {
        data,
        valortotal: totalProducto,
        Name: NameInput.value,
        Adress: AdressInput.value,
        Phone: PhoneInput.value,
    };
    console.log(newBuy);
    try {
        let response = await fetch(`${URL}/buy`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBuy)
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }

    

    //Clean Inputs
    NameInput.value = '';
    AdressInput.value = '';
    PhoneInput.value = '';
    //Hide Form
    containerForm.classList.add('hidden');
};

form.addEventListener('submit', (e) => {
    handleSave(e);
});
