import {  obtenerTodosLosIndicadores,  obtenerPorTipoIndicador} from './conexion.js';

const montoClp = document.getElementById('monto-clp');
const tipoMoneda = document.getElementById('tipo-moneda');
const btnConvertir = document.getElementById('btn-convertir');
const resultado = document.getElementById('resultado');

// FUNCION QUE CARGA LOS TIPOS DE MONEDA EN EL SELECT
const cargarTiposMonedas = async () => {
  const indicadores = await obtenerTodosLosIndicadores();

  Object.keys(indicadores)
    .slice(3)
    .forEach((indicador) => {
      tipoMoneda.innerHTML += `<option value="${indicador}">${indicador}</option>`;
    });
};

// FUNCION QUE ME DEVUELVE EL VALOR SEGUN TIPO DE MONEDA
const obtenerValorTipoMoneda = async (tipoMoneda) => {
  const { [tipoMoneda]: { valor } } = await obtenerTodosLosIndicadores();
  return valor;
};

//
const obtenerDataPorTipoIndicador = async (tipoMoneda) => {
  const { serie } = await obtenerPorTipoIndicador(tipoMoneda);
  return serie;
};

// EVENTO QUE AL HACER CLICK EN EL INPUT REMUEVE EL ERROR
montoClp.addEventListener('click', () => {
  montoClp.classList.remove('is-invalid');
});

// EVENTO QUE REALIZA LA CONVERSION AL PRESIONAR EL BOTON CONVERTIR
btnConvertir.addEventListener('click', async () => {
  if (montoClp.value !== '' && montoClp.value > 0) {
    const valorTipoMoneda = await obtenerValorTipoMoneda(tipoMoneda.value);

    const dataTipoMoneda = await obtenerDataPorTipoIndicador(tipoMoneda.value);
    console.log(dataTipoMoneda);

    resultado.innerHTML = 'Resultado: $' + (montoClp.value / valorTipoMoneda).toFixed(2);
    montoClp.value = '';
    montoClp.focus();
    
  } else {
    montoClp.classList.add('is-invalid');
    montoClp.value = '';
  }
});

// INICIALIZO LA FUNCION QUE CARGA LOS TIPOS DE MONEDA EN EL SELECT
cargarTiposMonedas();
