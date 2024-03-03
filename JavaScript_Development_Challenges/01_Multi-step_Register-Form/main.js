document.addEventListener('DOMContentLoaded', function () {
  const nextBtns = document.querySelectorAll('.next-btn');

  const step1 = document.querySelector('#step1');
  const step2 = document.querySelector('#step2');
  const step3 = document.querySelector('#step3');

  const stepIndicator = document.querySelector('#stepIndicator');
  let currentStep = 1;

  const nextStep = () => {
    if (!infoRequired()) {
      return;
    }

    if (currentStep === 1) {
      step1.style.display = 'none';
      step2.style.display = 'flex';
      currentStep++;
      infoStep1();
    } else if (currentStep === 2) {
      step2.style.display = 'none';
      step3.style.display = 'flex';
      currentStep++;
    } else if (currentStep === 3) {
      alert('Form submitted successfully!');
    }

    stepIndicator.textContent = `Step ${currentStep} of 3`;
  };


  const infoRequired = () => {
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;

    if (name === '' || email === '') {
      alert('Please fill in all required fields');
      return false
    }
    return true
  }

  const infoStep1 = () => {
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;

    document.querySelector('#selectedName').textContent = `Name: ${name}`;
    document.querySelector('#selectedEmail').textContent = `Email: ${email}`;
  }

  const isOptionSelected = () => {
    // Verificar si al menos una opción ha sido seleccionada en el paso 2
    const selectedOptions = document.querySelectorAll('#step2 .selected');
    return selectedOptions.length > 0;
  }



  // Agregar o eliminar opciones seleccionadas
  const options = document.querySelectorAll('.options');
  options.forEach(option => {
    option.addEventListener('click', function () {
      const selectedOption = document.createElement('li');
      selectedOption.textContent = option.textContent;
      selectedOption.classList.add('selected');
      selectedOption.setAttribute('data-option', option.id);

      // Verificar si la opción ya está seleccionada
      const existingOption = step3.querySelector(`ul li.selected[data-option="${option.id}"]`);
      if (existingOption) {
        // Si ya está seleccionada, la eliminamos
        existingOption.remove();
      } else {
        // Si no está seleccionada, la agregamos

        step3.querySelector('ul').appendChild(selectedOption);
      }
    });
  });


  nextBtns.forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

});
