import Print from './soem/print';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.onclick = Print.bind(null, 'Hello webpack!');

  const asd = {
    a: 1,
    b: 2
  };

  console.log('111', { ...asd });

  return element;
}

document.body.appendChild(component());
