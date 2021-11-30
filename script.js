async function precioDolar() {
    let response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    let datos = await response.json();

    return datos;
}

async function mostrarDatos() {
    let datosDolar = await precioDolar();
    datosDolar.forEach(dato => {
        let dolar = dato.casa;

        if (dolar.nombre == 'Dolar Oficial' || dolar.nombre == 'Dolar Blue') {
            addToContainer(dolar.nombre, dolar.compra, dolar.venta);
        }
    });
}

mostrarDatos();

function addToContainer(nombre, compra, venta) {
    $('#contenedor').append(`
    <div class="card">
        <button class="btn">${nombre}</button>
        <div class="card__cont">
            <p class="card__cont-text">Compra: AR$ ${compra}</p>
            <p class="card__cont-text">Venta: AR$ ${venta}</p>
        </div>
    </div>
`);
}

$('#contenedor').click((e) => {

    let target = $(e.target);
    let contenedor = target.parent();
    let card = contenedor.find('div');

    if (target.hasClass('btn')) {
        if (card.css('opacity') == 1) {
            card.css('height', '0px').css('top', '5px').css('opacity', '0');
        } else if (card.css('opacity') == 0) {
            card.css('height', '140px').css('top', '-30px').css('opacity', '1');
        }
    }
});
