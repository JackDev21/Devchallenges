document.addEventListener('DOMContentLoaded', function () {
  // Se ejecuta cuando el DOM está completamente cargado

  // Selecciona los botones de cada paso
  const nextBtnStep1 = document.querySelector('.next-btn-step1');
  const nextBtnStep2 = document.querySelector('.next-btn-step2');
  const nextBtnStep3 = document.querySelector('.next-btn-step3');

  // Agrega event listeners a los botones de cada paso
  nextBtnStep1.addEventListener('click', function () {
    // Cuando se hace clic en el botón del paso 1, llama a la función nextStep(1)
    nextStep(1);
  });

  nextBtnStep2.addEventListener('click', function () {
    // Cuando se hace clic en el botón del paso 2, llama a la función nextStep(2)
    nextStep(2);
  });

  nextBtnStep3.addEventListener('click', function () {
    // Cuando se hace clic en el botón del paso 3, llama a la función nextStep(3)
    nextStep(3);
  });

  // Selecciona los elementos de cada paso
  const step1 = document.querySelector('#step1');
  const step2 = document.querySelector('#step2');
  const step3 = document.querySelector('#step3');

  // Selecciona el indicador de paso
  const stepIndicator = document.querySelector('#stepIndicator');
  // Variable para mantener el número del paso actual
  let currentStep = 1;

  // Función para avanzar al siguiente paso
  const nextStep = (stepNumber) => {
    // Verifica si se han completado los campos obligatorios antes de avanzar
    if (!infoRequired()) {
      return;
    }

    // Maneja el avance entre los pasos según el paso actual y el número de paso recibido como parámetro
    if (currentStep === 1 && stepNumber === 1) {
      // Si estamos en el paso 1 y se solicita avanzar al paso 1, oculta el paso 1 y muestra el paso 2
      step1.style.display = 'none';
      step2.style.display = 'flex';
      currentStep++; // Incrementa el número del paso actual
      infoStep1(); // Llama a la función para mostrar la información del paso 1
    } else if (currentStep === 2 && stepNumber === 2) {
      // Si estamos en el paso 2 y se solicita avanzar al paso 2, realiza algunas validaciones y pasa al paso 3
      const selectedOptions = step2.querySelectorAll('.selected');
      if (selectedOptions.length === 0) {
        alert('Please select at least one option');
        return;
      }
      // Mueve las opciones seleccionadas al paso 3
      selectedOptions.forEach(option => {
        const selectedOption = document.createElement('li');
        selectedOption.textContent = option.textContent;
        selectedOption.classList.add('selected');
        selectedOption.setAttribute('data-option', option.id);
        step3.querySelector('ul').appendChild(selectedOption);
      });

      // Obtener todos los elementos con la clase "li-container"
      const liContainers = document.querySelectorAll('.li-container');

      // Agregar el evento de clic a cada elemento para pintar el estado de selección
      liContainers.forEach(container => {
        container.addEventListener('click', () => {
          // Alternar la clase "selected" para cambiar el estado de selección
          container.classList.toggle('selected');
        });
      });

      step2.style.display = 'none'; // Oculta el paso 2
      step3.style.display = 'flex'; // Muestra el paso 3
      currentStep++; // Incrementa el número del paso actual
    } else if (currentStep === 3 && stepNumber === 3) {
      // Si estamos en el paso 3 y se solicita avanzar al paso 3, muestra un mensaje de éxito
      alert('Form submitted successfully!');
    }

    // Agregar o eliminar opciones seleccionadas en el paso 2
    const options = document.querySelectorAll('.options');
    options.forEach(option => {
      option.addEventListener('click', function () {
        // Alternar la clase 'selected' para cambiar el estilo de la opción seleccionada
        option.classList.toggle('selected');
      });
    });


    // Actualiza el indicador de paso
    stepIndicator.textContent = `Step ${currentStep} of 3`;
    // Actualiza el estado de los círculos de navegación
    updateCircleStatus(stepNumber);
  };

  // Verifica si se han completado los campos obligatorios en el paso 1
  const infoRequired = () => {
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;

    if (name === '' || email === '') {
      alert('Please fill in all required fields');
      return false; // Retorna falso si no se han completado los campos obligatorios
    }
    return true; // Retorna verdadero si se han completado los campos obligatorios
  };

  // Actualiza la información en el paso 1 con el nombre y el correo electrónico ingresados
  const infoStep1 = () => {
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;

    document.querySelector('#selectedName').textContent = `${name}`;
    document.querySelector('#selectedEmail').textContent = `${email}`;
  };



  // Selecciona todos los círculos de navegación
  const circles = document.querySelectorAll('.circle');

  // Actualiza el estado de los círculos de navegación según el paso actual
  const updateCircleStatus = (stepNumber) => {
    circles.forEach((circle, index) => {
      if (index === stepNumber) {
        // Si el índice coincide con el número del paso, agrega la clase 'active' y 'with-shadow' al círculo

        circle.classList.add('active');
        circle.classList.add('with-shadow');
      } else if (index < stepNumber) {
        // Si el índice es menor que el número del paso, agrega la clase 'active' al círculo y quita 'with-shadow'
        circle.classList.add('active');
        circle.classList.remove('with-shadow');
      } else {
        // Si el índice es mayor que el número del paso, quita la clase 'active' y 'with-shadow' del círculo
        circle.classList.remove('active');
        circle.classList.remove('with-shadow');
      }
    });
  };
});
