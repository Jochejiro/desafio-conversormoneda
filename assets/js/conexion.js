

export const obtenerTodosLosIndicadores = async () => {
  try {
    const response = await fetch('https://mindicador.cl/api');
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error:', error);
  }
};

export const obtenerPorTipoIndicador = async (tipoIndicador) => {
    try {
      const response = await fetch(`https://mindicador.cl/api/${tipoIndicador}`);
      const data = await response.json();
  
      return data;
  
    } catch (error) {
      console.error('Error:', error);
    }
  };