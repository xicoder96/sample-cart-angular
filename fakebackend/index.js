// @ts-check
const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require("body-parser");
const port = 3000

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const products = [
  {
    id: 1,
    name: 'Phone XL',
    price: 799,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis enim lobortis scelerisque. Sed faucibus turpis in eu. Dictum fusce ut placerat orci. Malesuada proin libero nunc consequat interdum varius sit.',
    imagesrc: "../assets/images/280x180.png"
  },
  {
    id: 2,
    name: 'Phone Mini',
    price: 699,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales neque sodales ut etiam sit amet nisl purus. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris.',
    imagesrc: "../assets/images/280x180.png"
  },
  {
    id: 3,
    name: 'Phone Standard',
    price: 499,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Elit eget gravida cum sociis natoque penatibus et magnis dis. Malesuada fames ac turpis egestas sed tempus. Sollicitudin aliquam ultrices sagittis orci a.',
    imagesrc: "../assets/images/280x180.png"
  },
  {
    id: 4,
    name: 'Phone Classic',
    price: 299,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Elit eget gravida cum sociis natoque penatibus et magnis dis. Malesuada fames ac turpis egestas sed tempus. Sollicitudin aliquam ultrices sagittis orci a.',
    imagesrc: "../assets/images/280x180.png"
  },
  {
    id: 5,
    name: 'Phone Mate',
    price: 199,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Elit eget gravida cum sociis natoque penatibus et magnis dis. Malesuada fames ac turpis egestas sed tempus. Sollicitudin aliquam ultrices sagittis orci a.',
    imagesrc: "../assets/images/280x180.png"
  },
  {
    id: 6,
    name: 'Phone Basic',
    price: 99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Elit eget gravida cum sociis natoque penatibus et magnis dis. Malesuada fames ac turpis egestas sed tempus. Sollicitudin aliquam ultrices sagittis orci a.',
    imagesrc: "../assets/images/280x180.png"
  }
];

app.use(cors())


app.get('/products', (req, res) => {
  res.send(products);
})

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get('/product/:id', (req, res) => {
  const product = products.find(product => String(product.id) === req.params.id);
  res.send(product);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
