let data=[];

const containerCards = document.getElementById("containerCards");

const getData = async () =>{
    const URL_API="http://localhost:3000/buy";
    const response = await fetch(URL_API);
    data = await response.json();
    
    console.log(data);
  
    renderData(data);
};
getData();

const renderData = (arreglo) => {
    containerCards.innerHTML = "";   
    arreglo.forEach((element) => {
      const {data}=element;
      data.forEach(item => {
        containerCards.innerHTML += `
          <article "card-products">
            <figure>
              <img src="${item.image}" alt="${item.id}" class ="card__image">
            </figure>
            <div class="description">
            <p> ${item.type}</p>
            <p> ${item.name}</p>
            <p> ${item.mg}</p>  
            <p id="price"> ${item.price}</p>
            <p> Cliente: ${element.Name}</p>
            <p> Dirección: ${element.Adress}</p>
            <p> Telefono: ${element.Phone}</p>
            <p> Total: ${element.valortotal}</p>
            </div>
          </article>
          `;
      })
      
    });
  };