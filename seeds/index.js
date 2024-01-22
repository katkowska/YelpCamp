const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers.js');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // MY USER ID
            author:'65a4053dcffba82fa5937380',
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
                    url: 'https://res.cloudinary.com/dtli3ahwf/image/upload/v1705581163/YelpCamp/kwruiwctbbtwqaynnadr.webp',
                    filename: 'YelpCamp/kwruiwctbbtwqaynnadr',
                },
                {
                    url: 'https://res.cloudinary.com/dtli3ahwf/image/upload/v1705581343/YelpCamp/oa6isb9ragriq9vbacm9.webp',
                    filename: 'YelpCamp/oa6isb9ragriq9vbacm9'
                }
              ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
    });
