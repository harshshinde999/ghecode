const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get total count
router.get('/count', async (req, res) => {
    try {
        const count = await Song.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get songs by music director
router.get('/director/:director', async (req, res) => {
    try {
        const songs = await Song.find({ musicDirector: req.params.director });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get songs by music director and singer
router.get('/director/:director/singer/:singer', async (req, res) => {
    try {
        const songs = await Song.find({
            musicDirector: req.params.director,
            singer: req.params.singer
        });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get songs by singer and film
router.get('/singer/:singer/film/:film', async (req, res) => {
    try {
        const songs = await Song.find({
            singer: req.params.singer,
            film: req.params.film
        });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new song
router.post('/', async (req, res) => {
    try {
        const song = new Song(req.body);
        const savedSong = await song.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update song with actor and actress
router.put('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        
        song.actor = req.body.actor;
        song.actress = req.body.actress;
        
        const updatedSong = await song.save();
        res.json(updatedSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete song
router.delete('/:id', async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Initialize with sample data
router.post('/init', async (req, res) => {
    try {
        const sampleSongs = [
            {
                songName: "Chaiyya Chaiyya",
                film: "Dil Se",
                musicDirector: "A.R. Rahman",
                singer: "Sukhwinder Singh"
            },
            {
                songName: "Tum Hi Ho",
                film: "Aashiqui 2",
                musicDirector: "Mithoon",
                singer: "Arijit Singh"
            },
            {
                songName: "Kun Faya Kun",
                film: "Rockstar",
                musicDirector: "A.R. Rahman",
                singer: "A.R. Rahman"
            },
            {
                songName: "Raabta",
                film: "Agent Vinod",
                musicDirector: "Pritam",
                singer: "Pritam"
            },
            {
                songName: "Tum Se Hi",
                film: "Jab We Met",
                musicDirector: "Pritam",
                singer: "Mohit Chauhan"
            }
        ];

        await Song.insertMany(sampleSongs);
        res.status(201).json({ message: 'Sample songs added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 