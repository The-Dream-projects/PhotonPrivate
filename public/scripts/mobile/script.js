/*//Animazione titolo slide1
function typeEffect(element, speed) {
  let text = element.innerHTML;
  element.innerHTML = "";

  let i = 0;
  let timer = setInterval(function () {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// application
let speed = 140;
let h1 = document.querySelector('h1');
let delay = h1.innerHTML.length * speed + speed;

// type affect to header

typeEffect(h1, speed);*/

let lineChart = document.querySelector('#line');

//Line Chart
let line = new Chart(lineChart, {
  type: 'line',
  data: data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {}
});