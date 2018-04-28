
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;
const products = [{
    id: 1,
    name: 'laptop',
}, {
    id: 2,
    name: 'microwave',
}];
let currentId = 2;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
    res.send({ products });
});

app.post('/products', (req, res) => {
    currentId += 1;
    products.push({
        id: currentId,
        name: req.body.name,
    });
    res.send('Successfully created product.');
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    const product = products.find(obj => id == obj.id);
    if (product) {
        product.name = newName;
        res.send('Successfully updated product');
    } else {
        res.status(404).send('id not found');
    }
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < products.length; i += 1) {
        if (products[i].id == id) {
            products.splice(i, 1);
            break;
        }
    }
    res.send('Successfully deleted product');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
