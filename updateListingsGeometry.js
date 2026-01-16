if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
let geocodingClient;
if (mapToken) {
    geocodingClient = mbxGeocoding({ accessToken: mapToken });
}

const MONGO_URL = "mongodb://127.0.0.1:27017/test"; // Use your actual DB URL

async function updateListingsGeometry() {
    if (!geocodingClient) {
        console.log("Mapbox token not found. Skipping geocoding.");
        return;
    }
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB.");

        const listings = await Listing.find({});
        console.log(`Found ${listings.length} listings.`);

        for (let listing of listings) {
            if (listing.location && (!listing.geometry || !listing.geometry.coordinates || listing.geometry.coordinates.length === 0)) {
                console.log(`Geocoding location for listing: ${listing.title} (${listing.location})`);
                try {
                    let response = await geocodingClient.forwardGeocode({
                        query: listing.location,
                        limit: 1
                    }).send();

                    if (response && response.body && response.body.features && response.body.features.length > 0) {
                        listing.geometry = response.body.features[0].geometry;
                        await listing.save();
                        console.log(`Updated geometry for ${listing.title}`);
                    } else {
                        console.warn(`Could not geocode location for ${listing.title}: No features found.`);
                    }
                } catch (geocodeError) {
                    console.error(`Error geocoding ${listing.title} (${listing.location}):`, geocodeError.message);
                }
            } else if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length > 0) {
                console.log(`Listing ${listing.title} already has geometry.`);
            } else {
                console.log(`Listing ${listing.title} has no location to geocode.`);
            }
        }

        console.log("All listings processed.");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

updateListingsGeometry();
