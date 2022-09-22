let data=[];

const URL="http://localhost:3000/favorites";
const containerCards = document.getElementById("containerCards");

const getData = async () =>{
    const URL_API="http://localhost:3000/favorites";
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
          <article class = "card-products">
            <figure>
              <img src="${element.image}" alt="${element.id}" class ="card__image">
            </figure>
            <div class="description">
            <p> ${element.type}</p>
            <p> ${element.name}</p>
            <p> ${element.mg}</p>  
            <p id="price">$ ${element.price}</p>
            </div>
            <button class="btnDelete" name="${element.id}">X</button>
            
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

  const handleDelete = async (id) => { 
    try {
        let response = await fetch(`${URL}/${id}`,{
            method: 'DELETE'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    getData();
}