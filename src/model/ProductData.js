const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsd.vpxw6.mongodb.net/productapp?retryWrites=true&w=majority');
const schema = mongoose.Schema;

var NewProductSchema = new schema({
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number,
    imageURL: String
});

var ProductData = mongoose.model('products',NewProductSchema);

module.exports = ProductData;