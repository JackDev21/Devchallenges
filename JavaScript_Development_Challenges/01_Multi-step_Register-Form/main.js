document.addEventListener('DOMContentLoaded', function () {
  // Selecciona los botones de cada paso
  const nextBtnStep1 = document.querySelector('.next-btn-step1');
  const nextBtnStep2 = document.querySelector('.next-btn-step2');
  const nextBtnStep3 = document.querySelector('.next-btn-step3');

  // Agrega event listeners a los botones de cada paso
  nextBtnStep1.addEventListener('click', function () {
    nextStep(1);
  });

  nextBtnStep2.addEventListener('click', function () {
    nextStep(2);
  });

  nextBtnStep3.addEventListener('click', function () {
    nextStep(3);
  });

  const step1 = document.querySelector('#step1');
  const step2 = document.querySelector('#step2');
  const step3 = document.querySelector('#step3');

  const stepIndicator = document.querySelector('#stepIndicator');
  let currentStep = 1;

  const nextStep = (stepNumber) => {
    if (!infoRequired()) {
      return;
    }

    if (currentStep === 1 && stepNumber === 1) {
      step1.style.display = 'none';
      step2.style.display = 'flex';
      currentStep++;
      infoStep1();
    } else if (currentStep === 2 && stepNumber === 2) {
      const selectedOptions = step2.querySelectorAll('.selected');
      if (selectedOptions.length === 0) {
        alert('Please select at least one option');
        return;
      }
      // Aquí movemos las opciones seleccionadas al paso 3
      selectedOptions.forEach(option => {
        const selectedOption = document.createElement('li');
        selectedOption.textContent = option.textContent;
        selectedOption.classList.add('selected');
        selectedOption.setAttribute('data-option', option.id);
        step3.querySelector('ul').appendChild(selectedOption);
      });
      step2.style.display = 'none';
      step3.style.display = 'flex';
      currentStep++;
    } else if (currentStep === 3 && stepNumber === 3) {
      alert('Form submitted successfully!');
    }

    stepIndicator.textContent = `Step ${currentStep} of 3`;
  };

  const infoRequired = () => {
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;

    if (name === '' || email === '') {
      alert('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const infoStep1 = () => {
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;

    document.querySelector('#selectedName').textContent = `${name}`;
    document.querySelector('#selectedEmail').textContent = `${email}`;
  };

  // Agregar o eliminar opciones seleccionadas
  const options = document.querySelectorAll('.options');
  options.forEach(option => {
    option.addEventListener('click', function () {
      // Alternar la clase 'selected' para cambiar el estilo
      option.classList.toggle('selected');
    });
  });
});
