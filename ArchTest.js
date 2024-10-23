document.addEventListener('DOMContentLoaded', () => {
  const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Mostrar el abecedario
  document.getElementById('mostrar-abecedario').addEventListener('click', () => {
      document.getElementById('resultado-abecedario').textContent = abecedario;
  });

  // Mostrar matriz de Vigenère
  document.getElementById('mostrar-matriz').addEventListener('click', () => {
      const matriz = generarMatrizVigenere();
      let matrizStr = '';
      matriz.forEach(fila => {
          matrizStr += fila.join(' ') + '\n';
      });
      document.getElementById('resultado-matriz').textContent = matrizStr;
  });

  // Cifrar César
  document.getElementById('cifrar-cesar').addEventListener('click', () => {
      const texto = document.getElementById('cesar-texto').value.toUpperCase();
      const clave = parseInt(document.getElementById('cesar-clave').value);
      if (!texto || isNaN(clave) || clave < 1 || clave > 25) {
          alert('Por favor, ingresa un texto y una clave válida entre 1 y 25.');
          return;
      }
      const resultado = cifrarCesar(texto, clave);
      document.getElementById('resultado-cesar').textContent = `Cifrado: ${resultado}`;
  });

  // Descifrar César
  document.getElementById('descifrar-cesar').addEventListener('click', () => {
      const texto = document.getElementById('cesar-texto').value.toUpperCase();
      const clave = parseInt(document.getElementById('cesar-clave').value);
      if (!texto || isNaN(clave) || clave < 1 || clave > 25) {
          alert('Por favor, ingresa un texto y una clave válida entre 1 y 25.');
          return;
      }
      const resultado = descifrarCesar(texto, clave);
      document.getElementById('resultado-cesar').textContent = `Descifrado: ${resultado}`;
  });

  // Cifrar Vigenère
  document.getElementById('cifrar-vigenere').addEventListener('click', () => {
      const texto = document.getElementById('vigenere-texto').value.toUpperCase();
      const clave = document.getElementById('vigenere-clave').value.toUpperCase();
      if (!texto || !clave) {
          alert('Por favor, ingresa un texto y una clave.');
          return;
      }
      const resultado = cifrarVigenere(texto, clave);
      document.getElementById('resultado-vigenere').textContent = `Cifrado: ${resultado}`;
  });

  // Descifrar Vigenère
  document.getElementById('descifrar-vigenere').addEventListener('click', () => {
      const texto = document.getElementById('vigenere-texto').value.toUpperCase();
      const clave = document.getElementById('vigenere-clave').value.toUpperCase();
      if (!texto || !clave) {
          alert('Por favor, ingresa un texto y una clave.');
          return;
      }
      const resultado = descifrarVigenere(texto, clave);
      document.getElementById('resultado-vigenere').textContent = `Descifrado: ${resultado}`;
  });

  // Funciones para cifrado y descifrado César
  function cifrarCesar(texto, clave) {
      return texto.split('').map(letra => {
          const indice = abecedario.indexOf(letra);
          if (indice === -1) return letra;  // Si no es letra, no cambia
          return abecedario[(indice + clave) % 26];
      }).join('');
  }

  function descifrarCesar(texto, clave) {
      return texto.split('').map(letra => {
          const indice = abecedario.indexOf(letra);
          if (indice === -1) return letra;  // Si no es letra, no cambia
          return abecedario[(indice - clave + 26) % 26];
      }).join('');
  }

  // Funciones para cifrado y descifrado Vigenère
  function cifrarVigenere(texto, clave) {
      let resultado = '';
      for (let i = 0, j = 0; i < texto.length; i++) {
          const letraTexto = texto[i];
          if (abecedario.indexOf(letraTexto) === -1) {
              resultado += letraTexto;  // Mantener caracteres no letra
              continue;
          }
          const letraClave = clave[j % clave.length];
          const desplazamiento = abecedario.indexOf(letraClave);
          resultado += cifrarCesar(letraTexto, desplazamiento);
          j++;
      }
      return resultado;
  }

  function descifrarVigenere(texto, clave) {
      let resultado = '';
      for (let i = 0, j = 0; i < texto.length; i++) {
          const letraTexto = texto[i];
          if (abecedario.indexOf(letraTexto) === -1) {
              resultado += letraTexto;  // Mantener caracteres no letra
              continue;
          }
          const letraClave = clave[j % clave.length];
          const desplazamiento = abecedario.indexOf(letraClave);
          resultado += descifrarCesar(letraTexto, desplazamiento);
          j++;
      }
      return resultado;
  }

  // Función para generar la matriz Vigenère
  function generarMatrizVigenere() {
      const matriz = [];
      for (let i = 0; i < 26; i++) {
          matriz[i] = [];
          for (let j = 0; j < 26; j++) {
              matriz[i][j] = abecedario[(i + j) % 26];
          }
      }
      return matriz;
  }
});
