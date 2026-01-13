const express = require("express");
const passport = require("passport");
const Quote = require("../models/Quote");

const router = express.Router();

// POST - Add a quote to favorites
router.post('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { quote, author } = req.body;
        
        if (!quote) {
            return res.status(400).json({ message: "Quote text is required" });
        }

        const newQuote = new Quote({
            userId: req.user._id,
            quote: quote,
            author: author || "Unknown"
        });

        await newQuote.save();
        res.status(201).json({ message: "Quote added to favorites", quote: newQuote });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while submitting quote" });
    }
});

// GET - Retrieve all favorite quotes for the logged-in user
router.get('/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const favorites = await Quote.find({ userId: req.user._id });
        res.json(favorites);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while fetching favorites" });
    }
});

module.exports = router;