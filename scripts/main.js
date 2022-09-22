//let dataFiltered=[];
let data=[];

const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const containerCards = document.getElementById("containerCards");
const URL_FAVORITES= "http://localhost:3000/favorites";
const URL_CARRITO="http://localhost:3000/carrito";

const getData = async () =>{
    const URL_API="http://localhost:3000/products";
    const response = await fetch(URL_API);
    data = await response.json();
    
    console.log(data);
    renderData();
};
getData();

const getDatos = async (url) => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  
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
            <p id="price"> $${element.price}</p>
            <p id="in-stock">⭐⭐⭐⭐ In Stock</p>
          </div>
            <button class="btnFavorites" name="${element.id}">❤</button>
            <button class="btnCarrito" name="${element.id}">🛒</button></button>
          </article>
          `;
    });
  };


document.addEventListener("click", async ({target}) => { 
    if (target.classList.contains('btnFavorites')){
        const saveFav=data.find(item => item.id==target.getAttribute('name'));
        let fav= await getDatos(URL_FAVORITES);
        console.log(fav);
        const elementExist = fav.some(item => item.id === saveFav.id);
        if (elementExist){        
            console.log('ya esta en fav');
        }else{
            await fetch(URL_FAVORITES, {
                method: "POST",
                body: JSON.stringify(saveFav),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              });
        }       
    }
  });

  document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("btnCarrito")) {
      const AddCar = data.find((item) => item.id == target.getAttribute("name"));
      const car = await getDatos(URL_CARRITO);
      console.log(car);
      const elementoExist = car.some((item) => item.id === AddCar.id);
      if (elementoExist) {
        console.log("ya esta en carrito");
      } else {
        await fetch(URL_CARRITO, {
          method: "POST",
          body: JSON.stringify(AddCar),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      }
    }
  });


