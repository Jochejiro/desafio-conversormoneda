import { obtenerTodosLosIndicadores, obtenerUltimosPorIndicador } from './querys.js';

const montoClp = document.getElementById('monto-clp');
const tipoMoneda = document.getElementById('tipo-moneda');
const btnConvertir = document.getElementById('btn-convertir');
const resultado = document.getElementById('resultado');
const graficaIndicador = document.getElementById('graficaMoneda');

// FUNCION QUE CARGA LOS TIPOS DE MONEDA EN EL SELECT
const cargarTiposMonedas = async () => {

  const indicadores = await obtenerTodosLosIndicadores();

  if (!indicadores) {
    return;
  }
  Object.keys(indicadores)
    .slice(3)
    .forEach((indicador) => {
        tipoMoneda.innerHTML += `<option value="${indicador}">${indicador}</option>`;
    });
  
};

// FUNCION QUE ME DEVUELVE EL VALOR SEGUN TIPO DE MONEDA
const obtenerValorTipoMoneda = async (tipoMoneda) => {
  const data = await obtenerTodosLosIndicadores();

  if (!data) {
    return "false";
  }
  const { [tipoMoneda]: { valor } } = data;
  return valor;

};

const renderizarGraficaIndicador = async () => {
  const dataTipoMoneda = await obtenerUltimosPorIndicador(tipoMoneda.value);

  if(!dataTipoMoneda) {
    return ;
  }

  const tipoDeGrafica = 'line';
  const titulo = `Gráfica ${tipoMoneda.value.toUpperCase()}`;
  const fechas = dataTipoMoneda.map((moneda) => moneda.fecha);
  const valores = dataTipoMoneda.map((moneda) => moneda.valor);
  
  const config = {
    type: tipoDeGrafica,
    data: {
      labels: fechas,
      datasets: [{
          label: titulo,
          borderColor: 'rgb(214, 40, 40)',
          backgroundColor: 'rgba(214, 40, 40, 0.5)',
          data: valores,
          }]
      }
    };

  new Chart(graficaIndicador, config);
 
};

// EVENTO QUE AL HACER CLICK EN EL INPUT REMUEVE EL ERROR
montoClp.addEventListener('click', () => {
  montoClp.classList.remove('is-invalid');
});

// EVENTO QUE REALIZA LA CONVERSION AL PRESIONAR EL BOTON CONVERTIR
btnConvertir.addEventListener('click', async () => {
  if (montoClp.value !== '' && montoClp.value > 0) {
    const valorTipoMoneda = await obtenerValorTipoMoneda(tipoMoneda.value);

    if (valorTipoMoneda != "false") {
      resultado.innerHTML = 'Resultado: $ ' + (montoClp.value / valorTipoMoneda).toFixed(2);
      await renderizarGraficaIndicador();
    }
    montoClp.value = '';
    montoClp.focus();

  } else {
    montoClp.classList.add('is-invalid');
    montoClp.value = '';
  }
});

// INICIALIZO LA FUNCION QUE CARGA LOS TIPOS DE MONEDA EN EL SELECT
cargarTiposMonedas();
