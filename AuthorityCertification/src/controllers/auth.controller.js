
const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

// routes
router.get('/login', login);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);


module.exports = router;

function login(req, res, next) {
    authService.login(req, res)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    authService.register(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    authService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    authService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    authService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    authService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    authService.delete(req.params.id)
        .then(() => res.json({ "message": "Utilisateur supprimé avec succés" }))
        .catch(err => next(err));
}