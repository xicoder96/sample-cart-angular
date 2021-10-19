// @ts-check
const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require("body-parser");
const port = 3000
const msal = require('@azure/msal-node');

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

// Before running the sample, you will need to replace the values in the config,
// including the clientSecret
const config = {
  auth: {
    clientId: "cbcf1aaf-bb79-434e-9b3b-6422a248da96",
    authority: "https://login.microsoftonline.com/d30feff3-78f9-476a-81e4-c71b80743988",
    clientSecret: "UYf7Q~_sYCR6u5ORTDfi0OL4yrEcye8GwIwC1"
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    }
  }
};

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

app.get('/', (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: "http://localhost:3000/redirect",
  };

  // get url to sign user in and consent to scopes needed for application
  cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    res.redirect(response);
  }).catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
  const tokenRequest = {
    code: String(req.query.code),
    scopes: ["user.read"],
    redirectUri: `http://localhost:${port}/redirect`,
  };

  cca.acquireTokenByCode(tokenRequest).then((response) => {
    console.log("\nResponse: \n:", response);
    res.sendStatus(200);
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

app.get('/products', (req, res) => {
  res.send(products);
})

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.post('/stopCampaign', async (req, res) => {
  console.log(`campaign Id:`, req.body)
  await sleep(5000);
  // res.send({
  //   message: "Campaign stoped successfully",
  //   requestUrl: "/softwaremanager/stopCampaign",
  //   responseCode: 200
  // })
  res.status(500).send({
    ErrorMessage: "{Error=Internal Server Error}",
    requestUrl: "/softwaremanager/stopCampaign",
    responseCode: "500 INTERNAL_SERVER_ERROR"
  });
})

app.post('/testPostRequest', async (req, res) => {
  console.log(`body`, req.body)
  // await sleep(5000);
  res.send({
    message: "Campaign stoped successfully",
    requestUrl: "/softwaremanager/stopCampaign",
    responseCode: 200
  })
  // res.status(400).send({
  //   ErrorMessage: "{Error=Error Message}",
  //   requestUrl: "/softwaremanager/uploadBinary",
  //   responseCode: "400 BAD_REQUEST"
  // });
  // res.status(500).send({
  //   ErrorMessage: "{Error=Internal Server Error}",
  //   requestUrl: "/softwaremanager/stopCampaign",
  //   responseCode: "500 INTERNAL_SERVER_ERROR"
  // });
})

app.get('/requestTypes', (req, res) => {
  res.send([
    {
      "updateTypeCode": "00",
      "updateTypeName": "Critical"
    },
    {
      "updateTypeCode": "01",
      "updateTypeName": "Generic"
    },
    {
      "updateTypeCode": "02",
      "updateTypeName": "Subscribed"
    }]);
});
app.get('/requestCategories', (req, res) => {
  res.send([
    {
      "updateCategoryCode": "00",
      "updateCategoryName": "Parameter"
    },
    {
      "updateCategoryCode": "01",
      "updateCategoryName": "Firmware"
    },
    {
      "updateCategoryCode": "02",
      "updateCategoryName": "Feature"
    },
    {
      "updateCategoryCode": "03",
      "updateCategoryName": "BugFix"
    },
    {
      "updateCategoryCode": "04",
      "updateCategoryName": "SecurityPatch"
    }
  ]);
});
app.get('/vehicleType', (req, res) => {
  res.send([
    "2EV",
    "2IC",
    "3EV",
    "3IC"
  ]);
});
app.get('/vehicleModel', (req, res) => {
  res.send([
    "TVS IQube",
    "TVS Jupiter"
  ]);
});
app.get('/binaries', (req, res) => {
  console.log(req.query)
  res.send([
    {
      "vehicleSoftwareVersion": "v1.0",
      "binaryList": [
        "014f39v15200121.dat",
        "024S77v0201200121.bin",
        "034f62v0301200121.elf",
        "034f62v0301200121.hex"
      ],
      "releaseNote": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
    },
    {
      "vehicleSoftwareVersion": "v2.0",
      "binaryList": [
        "014f39v15200121.dat",
        "024S77v0201200121.bin"
      ],
      "releaseNote": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<\/p> <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<\/p>"
    }
  ]);
});

app.get('/product/:id', (req, res) => {
  const product = products.find(product => String(product.id) === req.params.id);
  res.send(product);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})