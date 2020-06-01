var images = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
];

var totalClicks = 0;

//(1) get the images
var leftImage = document.getElementById('leftImage');
var centerImage = document.getElementById('centerImage');
var rightImage = document.querySelector('#rightImage');
var imagesSection = document.querySelector('#imagesSection');

//(2) add src,alt,title to the images to test if ever thing is working
// leftImage.src = `assets/${names[0]}.jpg`;
// leftImage.alt = names[0];
// leftImage.title = names[0];

// rightImage.setAttribute('src', `assets/${names[1]}.jpg`);
// rightImage.setAttribute('alt', names[1]);
// rightImage.setAttribute('title', names[1]);

//(3_1) create constructor function for the goats
// var goatArray = [];
function Product(name) {
  this.productName = name.split(".")[0];
  this.imagePath = `assets/${name}`;
  this.clicks = 0;
  this.views = 0;
  // goatArray.push(this);
  Product.all.push(this);
}
Product.all = [];

//(3_2) instantiate objects for all the goats one shot
for (var i = 0; i < images.length; i++) {
  new Product(images[i]);
}
//   console.log(Product.all);

var leftProduct, rightProduct, centerProduct;
//(4) render 2 random images
function renderImages() {
  // var randomIndex = randomNumber(0,Product.all.length-1);
  leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  centerProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
  if (leftProduct=== centerProduct || centerProduct === rightProduct || leftProduct === rightProduct) {
    renderImages();
  }

  leftImage.src = leftProduct.imagePath;
  leftImage.alt = leftProduct.productName;
  leftImage.title = leftProduct.productName;
  leftProduct.views++;

  centerImage.src = centerProduct.imagePath;
  centerImage.alt = centerProduct.productName;
  centerImage.title = centerProduct.productName;
  centerProduct.views++;

  rightImage.src = rightProduct.imagePath;
  rightImage.alt = rightProduct.productName;
  rightImage.title = rightProduct.productName;
  rightProduct.views++;
}
renderImages();

//(5) add the event listener to render new images
// (5) Where should we add the event listener(for the left or right/ to imagesSection will be better since we will have only one clickListener )
// 5a identify the  clicked image
// 5b keep track of how many times the image have been clicked and viewed?
// 5c re render the images
imagesSection.addEventListener('click', handleClick);

function handleClick(event) {
  // console.log(event);
  // console.log(event.target);
  // console.log(event.target.id);
  if (totalClicks < 25) {
    // if(event.target.id === 'leftImage' || event.target.id === 'rightImage')
    if (event.target.id !== 'imagesSection') {
      totalClicks++;
      if (event.target.id === 'leftImage') {
        leftProduct.clicks++;
      }
      if (event.target.id === 'rightImage') {
        rightProduct.clicks++;
      }
      if (event.target.id === 'centerImage') {
        centerProduct.clicks++;
      }
      renderImages();
    }
  } else if(totalClicks ===25 ) {
    imagesSection.removeEventListener('click', handleClick);
    renderResults();
  }
}

function renderResults() {
  var ulE1 = document.getElementById('finalResult');
  for (var i = 0; i < Product.all.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${Product.all[i].productName} has clicked ${Product.all[i].clicks} and has viewed ${Product.all[i].views}`;
    ulE1.append(li);
  }
}



// TODO unique images
// (6) prevent having two exact images at the same time
// (7) prevent images from repeating one right after the other


//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});