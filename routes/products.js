const express = require('express');
const router = express.Router();

router.get('/products', (req, res, next) => {
    res.status(200).json();
});

router.post('/products/create', (req, res, next) => {
    res.status(200).json();
});

router.put('/products/update/:id', (req, res, next) => {
    res.status(200).json();
});

router.delete('/products/delete/:id', (req, res, next) => {
    res.status(200).json();
});

module.exports = router;