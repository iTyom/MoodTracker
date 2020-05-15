const express = require('express');
const router = express.Router();
const enigmaService = require('../services/enigma.service');
const jwt = require('../../_helpers/jwt')


// routes
router.post('/getCodeToExecute', jwt.isAuthorized, getCodeToExecute);
router.get('/getValidationSlug', jwt.isAuthorized, getValidationSlug);
router.get('/getBatch', jwt.isAuthorized, getBatch);

module.exports = router;

function getCodeToExecute(req, res, next) {
    enigmaService.getCodeToExecute(req.body)
        .then(data => data ? res.json(data) : res.status(400).json({
            message: "Erreur"
        }))
        .catch(err => next(err));
}

function getValidationSlug(req, res, next) {
    enigmaService.getValidationSlug()
        .then(data => data ? res.json(data) : res.status(400).json({
            message: "Erreur"
        }))
        .catch(err => next(err));
}

function getBatch(req, res, next) {
    enigmaService.getBatch()
        .then(data => data ? res.json(data) : res.status(400).json({
            message: "Erreur"
        }))
        .catch(err => next(err));
}