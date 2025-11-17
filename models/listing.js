const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { 
        type: String,
        required: true,
        minLength: 1
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   category: {
    type: String,
    enum: [
        'trending',
        'rooms',
        'iconic-cities',
        'mountains',
        'castles',
        'pools',
        'camping',
        'farms',
        'arctic',
        'boats'
    ]
}

});


listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        const Review = mongoose.model("Review");
        await Review.deleteMany({
            _id: { $in: listing.reviews }  
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
