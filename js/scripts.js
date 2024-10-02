fetch('data/datos.json')
    .then(response => response.json())
    .then(data => {
        
        const headerTitle = document.querySelector('#title')
        headerTitle.innerHTML = data.datos_tienda.nombre


        let productos = ''
        data.productos.forEach(producto => {

          let reseñas = ''
          if (producto.reseñas.length > 0) {
            producto.reseñas.forEach(reseña => {
              reseñas += `
                
                <h5>Reseña</h5><hr>
                <small class="text-body-secondary">${reseña.usuario}</small><hr>
                <small class="text-body-secondary">${reseña.comentario}</small><hr>
                <small class="text-body-secondary">Calificación: ${reseña.calificacion} ⭐</small><hr>
                <small class="text-body-secondary">Publicado el: ${reseña.fecha}</small><hr>
              `
            })
          }
          
          let images = ''
          if (producto.imagenes.length > 0) {
            producto.imagenes.forEach(imagen => {
              images += `
                <img src="${imagen}"alt="...">
              `
            })
          }

          productos += `
            <div class="col">
              <div class="card h-100">
                <div class="card-image">
                    ${images}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">$${producto.precio}</p>
                  </div>
                  <div class="card-footer">
                  ${reseñas}
                </div>
              </div>
            </div>
          `
        })

        let cartasProductos = document.querySelector('#products')
        cartasProductos.innerHTML = productos

        let featuredReviews = ''
        data.reseñas_destacadas.forEach(reseña => {
            featuredReviews += `
            
                <div class="col-sm-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${reseña.usuario}</h5><hr>
                            <p class="card-text">${reseña.comentario}</p><hr>
                            <small class="text-body-secondary">Calificación: ${reseña.calificacion} ⭐</small><hr>
                            <small class="text-body-secondary">Producto Reseñado: ${reseña.producto} 📌</small>
                        </div>
                    </div>
                </div>
            `
        })

        let featuredReviewsContainer = document.querySelector('#featured-reviews')
        featuredReviewsContainer.innerHTML = featuredReviews

        let footerLeft = document.querySelector('#leftCol')
        footerLeft.innerHTML = `
            <p>Dirección: ${data.datos_tienda.direccion}</p>
            <p>Telefono: ${data.datos_tienda.telefono}</p>
            <p>Correo: ${data.datos_tienda.correo}</p>
        `

        let footerRight = document.querySelector('#rightCol')
        footerRight.innerHTML = `
            <p>Lunes a Viernes: ${data.datos_tienda.horario_atencion.lunes_a_viernes}</p>
            <p>Sabados: ${data.datos_tienda.horario_atencion.sabados}</p>
            <p>Domingos: ${data.datos_tienda.horario_atencion.domingos}</p>
        `
    })
    .catch(error => console.error(error))