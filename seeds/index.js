const mongoose = require('mongoose');
const cities = require('./cities');
const Venue = require('../models/venue');
const {places, descriptors} = require('./seedHelpers.js');

mongoose.connect('mongodb://localhost:27017/gigaunty', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Venue.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 100;
        const ven = new Venue({
            // MY USER ID
            author:'65b8ff2ce2cc6b3dc8d10837',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price,
            geometry: {
                type: "Point",
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtli3ahwf/image/upload/v1706624475/GigAunty/photo-1514320291840-2e0a9bf2a9ae_n9b8it.jpg',
                    filename: 'GigAunty/photo-1514320291840-2e0a9bf2a9ae_n9b8it',
                },
                {
                    url: 'https://res.cloudinary.com/dtli3ahwf/image/upload/v1706613181/GigAunty/long-truong-0hbiRNbMgM4-unsplash_myuwyl.jpg',
                    filename: 'GigAunty/long-truong-0hbiRNbMgM4-unsplash_myuwyl'
                }
              ],
        });
        await ven.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
    });
