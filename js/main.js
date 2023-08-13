let productos = [
  {
    id: 1,
    nombre: "PARIS SAINT GERMAIN",
    precio: 950,
    imagen: "imagenes/RF1.png",
  },
  {
    id: 2,
    nombre: "VELEZ SARSFIELD",
    precio: 750,
    imagen: "imagenes/RF2.png",
  },
  {
    id: 3,
    nombre: "SELECCION ARGENTINA",
    precio: 900,
    imagen: "imagenes/RF3.png",
  },
  {
    id: 4,
    nombre: "BARCELONA",
    precio: 450,
    imagen: "imagenes/RF4.png",
  },
  {
    id: 5,
    nombre: "ROLLING STONES",
    precio: 500,
    imagen: "imagenes/RMI1.jpg",
  },
  {
    id: 6,
    nombre: "DIE TOTEN HOSEN",
    precio: 4500,
    imagen: "imagenes/RMI2.jpg",
  },
  {
    id: 7,
    nombre: "NIRVANA",
    precio: 500,
    imagen: "imagenes/RMI3.jpg",
  },
  {
    id: 8,
    nombre: "THE BEATLES",
    precio: 550,
    imagen: "imagenes/RMI4.jpg",
  },
  {
    id: 9,
    nombre: "CIRO",
    precio: 500,
    imagen: "imagenes/RN1.jpg",
  },
  {
    id: 10,
    nombre: "INDIO",
    precio: 4500,
    imagen: "imagenes/RN2.jpg",
  },
  {
    id: 11,
    nombre: "LA RENGA",
    precio: 500,
    imagen: "imagenes/RN3.jpg",
  },
  {
    id: 12,
    nombre: "SODA STEREO",
    precio: 550,
    imagen: "imagenes/RN4.jpg",
  },
  {
    id: 13,
    nombre: "GAME OVER",
    precio: 950,
    imagen: "imagenes/RG1.jpg",
  },
  {
    id: 14,
    nombre: "A JUGARRR!",
    precio: 750,
    imagen: "imagenes/RG2.jpg",
  },
  {
    id: 15,
    nombre: "GAMER",
    precio: 900,
    imagen: "imagenes/RG3.jpg",
  },
  {
    id: 16,
    nombre: "ZONA GAMER",
    precio: 450,
    imagen: "imagenes/RG4.jpg",
  },
  {
    id: 17,
    nombre: "DIGNITY",
    precio: 500,
    imagen: "imagenes/RR1.jpg",
  },
  {
    id: 18,
    nombre: "PEAKY BLINDERS",
    precio: 4500,
    imagen: "imagenes/RR2.jpg",
  },
  {
    id: 19,
    nombre: "FLOKY",
    precio: 500,
    imagen: "imagenes/RR3.jpg",
  },
  {
    id: 20,
    nombre: "PULP FICTION",
    precio: 550,
    imagen: "imagenes/RR4.jpg",
  },
  
];

const contenedor = document.getElementById("container");
contenedor.innerHTML = "";

productos.forEach((producto, indice) => {
  let card = document.createElement("div");
  card.classList.add("card", "col-sm-4", "col-lg-3");
  let html = `
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text"> $ ${producto.precio}</p>
      <a href="#cart" class="btn btn-dark" onClick="agregarAlCarrito(${indice})">Comprar</a>
    </div>
      `;
  card.innerHTML = html;
  contenedor.appendChild(card);
});

let modalCarrito = document.getElementById("cart");

const agregarAlCarrito = (indiceDelArrayProducto) => {
  //findIndex devuelve el indice del elemento encontrado
  // si no encuentra nada devuelve menos 1 (-1)
  const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceDelArrayProducto].id;
  });


   if (indiceEncontradoCarrito === -1) {
     //agrego el producto
     const productoAgregar = productos[indiceDelArrayProducto];
     productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
     dibujarCarrito();
  } else {
     //incremento cantidad
     cart[indiceEncontradoCarrito].cantidad += 1;
     actualizarStorage(cart);
     dibujarCarrito();
   }
 };



const dibujarCarrito = () => {
  let total = 0;
  modalCarrito.className = "cart";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > Cantidad: ${producto.cantidad}</div>
        <div class="product-details"> Precio/unidad: $ ${producto.precio}</div>
        <div class="product-details"> Subtotal: $ ${
          producto.precio * producto.cantidad
        }</div>
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
    <button class= "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
    modalCarrito.appendChild(totalContainer);
  } else {
    modalCarrito.classList.remove("cart");
  }
};

let cart = [];

const removeProduct = (indice) => {
  cart.splice(indice, 1);
  actualizarStorage(cart);
  dibujarCarrito();
};

const actualizarStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart)
};

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  dibujarCarrito();
}



const finalizarCompra = () => {
  const total = document.getElementsByClassName("total")[0].innerHTML;
  modalCarrito.innerHTML = "";
  const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> LA COMPRA YA CASI ES TUYA  , EL ${total} </p></div>
  <div class="datos-cliente">
  <p class="datos-parrafo"> Complete el Formulario con sus datos para coordinar la entrega</p>
  <button class= "btn btn-danger formulario" id="formulario" onClick="dibujarFormu()"> FORMULARIO </button>
  </div>`;
  modalCarrito.innerHTML = compraFinalizada;
};
const dibujarFormu = () => {
  modalCarrito.innerHTML = "";
  const formulario = `
  <h2 class="datos"> DATOS PARA EL ENVÍO </h2>
  <div class="contact__secction-container">
   <div class="row">
     <div class="contact__secction__item">
       <label>Nombre *</label>
       <input type="text" id="nombre" placeholder="Nombre "  />
     </div>
     <div class="contact__secction__item">
       <label>E-mail *</label>
       <input type="text" id="email" placeholder="E-mail" />
     </div>
     <div class="contact__secction__item">
       <label>Telefono</label>
       <input type="text" id="telefono" placeholder="Telefono "  />
     </div>
     <div class="contact__secction__item">
       <label>Domicilio *</label>
       <input type="text" id="domicilio" placeholder="Domicilio " />
     </div>
     <div class="contact-button">
       <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()" >Confirmar</button>
     </div>
   </div>
 </div>`;
  modalCarrito.innerHTML = formulario;
};


// function 
// const nombreCliente = document.getElementById("nombre").value;
// const emailCliente = document.getElementById("email").value;
// const telefonoCliente = document.getElementById("telefono").value;
// const domicilioCliente = document.getElementById("domicilio").value;








const mostrarMensaje = () => {
  const nombreCliente = document.getElementById("nombre").value;
  const domicilioCliente = document.getElementById("domicilio").value;
  modalCarrito.innerHTML = "";
  let mensaje = `<div class="mensaje-final">Gracias ${nombreCliente} por su compra! en 48 horas recibira su paquete en ${domicilioCliente} </div>`;
  modalCarrito.innerHTML = mensaje;
};


