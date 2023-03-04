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
  let h1 = document.querySelector('h2');
  let delay = h1.innerHTML.length * speed + speed;
  
  // type affect to header
  
  typeEffect(h1, speed);
  
  document.getElementById('ActiveSlider1').style.display = 'block';
  
  function slide(id) {
    let clicked = id.getAttribute('id');
  
    if (clicked == 'slider1') {
      disableClass('ActiveSlider', "Slide");
      document.getElementById('Slide1').style.display = 'block';
      document.getElementById('ActiveSlider1').style.display = 'block';
    }
    if (clicked == 'slider2') {
      disableClass('ActiveSlider', "Slide");
      document.getElementById('Slide2').style.display = 'block';
      document.getElementById('ActiveSlider2').style.display = 'block';
    }
    if (clicked == 'slider3') {
      disableClass('ActiveSlider', "Slide");
      document.getElementById('Slide3').style.display = 'block';
      document.getElementById('ActiveSlider3').style.display = 'block';
    }
    if (clicked == 'slider4') {
      disableClass('ActiveSlider', "Slide");
      document.getElementById('Slide4').style.display = 'block';
      document.getElementById('ActiveSlider4').style.display = 'block';
      
    }
  }
  
  function disableClass(...id) {
    id.forEach(element => {
      var classes = document.querySelectorAll("." + element);
      classes.forEach(element1 => {
        element1.style.display = 'none';
      });
    });
  }

var scrolling = false;
  document.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (scrolling) {
        return;
    }
    if (e.deltaY > 0 && !scrolling) {
        scrolling = true;
        var currentActive = document.querySelector('.ActiveSlider[style="display: block;"]').getAttribute('id');
        switch (currentActive) {
            case 'ActiveSlider1':
                document.getElementById('slider2').click();
                break;
            case 'ActiveSlider2':
                document.getElementById('slider3').click();
                break;
            case 'ActiveSlider3':
                document.getElementById('slider4').click();
                break;
            case 'ActiveSlider4':
                document.getElementById('slider1').click();
                break;
    }
    } else {
        scrolling = true;
        var currentActive = document.querySelector('.ActiveSlider[style="display: block;"]').getAttribute('id');
        switch (currentActive) {
            case 'ActiveSlider1':
                document.getElementById('slider4').click();
                break;
            case 'ActiveSlider2':
                document.getElementById('slider1').click();
                break;
            case 'ActiveSlider3':
                document.getElementById('slider2').click();
                break;
            case 'ActiveSlider4':
                document.getElementById('slider3').click();
                break;
        }
    }

    setTimeout(() => {
        scrolling = false;
    }, 1000);
  });
  
  var io = io(window.location.origin);
  var isPaused = false;
  
  io.on("ping", (data) => {
      var v = new Date();
      if(isPaused) { return; }
    //   document.getElementById("value").innerHTML = data.val.toFixed(4);
      addData(v.getHours() +":"+ v.getMinutes() + ":" + v.getSeconds(), data.val.toFixed(4));
  });
  let ctx = document.querySelector('#line');
  
  //Line Chart
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Purezza aria',
        data: [],
        backgroundColor: "#00ADED",
        pointBorderColor: "#FFFFFF",
        borderWidth: 2,
      }],
    },
    options: {
      reponsive: true,
      animation: false,
      scales: {
        y: {
          grid: {
            color: "#515962",
            beginAtZero: true
          }
        },
        x: {
          grid: {
            color: "#515962",
          }
        },
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        }
      }  
    }
  });

  
  const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
  const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
  
  
  function pauseManager(v) {
      if(isPaused == false) {
          isPaused = true;
          v.innerHTML = "Start";
      } else {
          isPaused = false;
          v.innerHTML = "Pause";
      }
  }
  
  function addData(label, data) {
    if(myChart.data.labels.length > 50){
        removeData(myChart);
    }
    myChart.data.labels.push(label);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    myChart.update();
  }
  
  function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
  }