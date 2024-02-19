import mongoose from "mongoose"

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxLength: 150
    },
    adress: {
        city: {
            type: String,
            required: [true, 'Please provide a city'],
            trim: true,
        },
        ZipCode: {
            type: Number,
            required: [true, 'Please provide a ZipCode']
        }
    },
    pictures: {
        type: [String],
        required: false
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    location: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        },
    }
})

export default mongoose.model("Listing", ListingSchema)