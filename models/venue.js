const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// Now you can use the `geocodingClient` to make requests to the Mapbox Geocoding API


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
});

const opts = { toJSON: { virtuals: true } };

const venueSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
}, opts);

venueSchema.virtual('properties.popUpM').get(function () {
    return `
            <strong><a href="/venues/${this._id}">${this.title}</a></strong>
            <p>${this.description.substring(0, 25)}...</p>`;
});

venueSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});


module.exports = mongoose.model('Venue', venueSchema);
