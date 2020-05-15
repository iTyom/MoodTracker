const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const msg = "Ca marche"

        res.json(msg);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const uuid = uuidv4();
        res.json(uuid);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router