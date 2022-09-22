let data=[];

const btnNew = document.getElementById('btnNew');
const containerFormProducts = document.getElementById('containerFormProducts');
const form = document.getElementById('form');
const containerCards= document.getElementById('containerCards');

const typeInput= document.getElementsByName('type')[0];
const nameInput= document.getElementsByName('name')[0];
const mgInput= document.getElementsByName('mg')[0];
const priceInput= document.getElementsByName('price')[0];
const imageInput= document.getElementsByName('image')[0];
const cantidadInput= document.getElementsByName('cantidad')[0];

let isEdit = false;
let idEdit;

API="http://localhost:3000";


const getData = async () => {
    try {
        let response = await fetch(`${API}/products`);
        let dat = await response.json();
        data = dat;
        renderData();
    } catch (error) {
        console.log(error);
    }
}
getData();

const renderData = () => {
    containerCards.innerHTML = "";
    data.forEach((element) => {
      containerCards.innerHTML += `
          <article class="description">
            <figure>
              <img src="${element.image}" alt="${element.id}" class ="card__image">
            </figure>
            <p> ${element.type}</p>
            <p> ${element.name}</p>
            <p> ${element.mg}</p>  
            <p id="price">$ ${element.price}</p>
            <button class="btnEdit" name="${element.id}">Editar</button>
            <button class="btnDelete" name="${element.id}">Eliminar</button>
          </article>
          `;
    });

    const btnDelete = document.getElementsByClassName('btnDelete');
    const btnEdit = document.getElementsByClassName('btnEdit');

    Array.from(btnDelete).forEach((element) => {
        let id = element.getAttribute('name');
        element.addEventListener('click', () => {
            handleDelete(id);
        })
    });

    Array.from(btnEdit).forEach((element) => {
        let id = element.getAttribute('name');
        element.addEventListener('click', () => {
            handleEdit(id);
        })
    });
  };

const showForm = () =>{
    containerFormProducts.classList.remove('hid');
}

btnNew.addEventListener('click', showForm);

const handleSave = async (e) => {
    e.preventDefault();

    const newProduct = {
        type: typeInput.value,
        name: nameInput.value,
        mg: mgInput.value,
        price: priceInput.value,
        image: imageInput.value,
        cantidad: cantidadInput.value,
    };
    console.log(newProduct);
    try {
        let response =await fetch(`${API}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
    } catch (error) {
        console.log(error);
    }
    console.log(response);
    getData();

    //Clean Inputs
    typeInput.value = '';
    nameInput.value = '';
    mgInput.value = '';
    priceInput.value = '';
    imageInput.value = '';
    cantidadInput.value= '';
    //Hide Form
    containerFormProducts.classList.add('hid');
};

const handleUpdate = async (e) => {
    e.preventDefault();
    let newProduct = {
        type: typeInput.value,
        name: nameInput.value,
        mg: mgInput.value,
        price: priceInput.value,
        image: imageInput.value,
        cantidad: cantidadInput.value,
    };
    //Update at API
    let rsponse = await fetch(`${API}/products/${idEdit}`, {
        method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
    });
    isEdit = false;
    idEdit = null;
    getData();


    //Clean Inputs
    typeInput.value = '';
    nameInput.value = '';
    mgInput.value = '';
    priceInput.value = '';
    imageInput.value = '';
    cantidadInput.value= '';
    //Hide Form
    containerFormProducts.classList.add('hid');
}

const handleEdit = (id) => {
    isEdit = true;
    idEdit = id;
    showForm();
    const product = data.find((element) => element.id == id);
    typeInput.value = product.type;
    nameInput.value = product.name;
    mgInput.value = product.mg;
    priceInput.value = product.price;
    imageInput.value = product.image;
    cantidadInput.value= product.cantidad;
}


form.addEventListener('submit', (e) => {
    if (isEdit) {
        handleUpdate(e);
    }else {
        handleSave(e);
    }
});

const handleDelete = async (id) => { 
    try {
        let response = await fetch(`${API}/products/${id}`, {
            method: 'DELETE'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    getData();
}