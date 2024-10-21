// routes/user.js
const express = require('express');
const router = express.Router();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } = AmazonCognitoIdentity;
require('dotenv').config()

// Configurar el User Pool
const poolData = {
    UserPoolId: process.env.USERPOOLID, // ID de tu User Pool
    ClientId: process.env.CLIENTID // ID de tu app cliente
};

const userPool = new CognitoUserPool(poolData);

// Endpoint para registrar un usuario
router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const attributeList = [];

    const dataEmail = {
        Name: 'email',
        Value: email
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message || JSON.stringify(err) });
        }
        const cognitoUser = result.user;
        res.json({ message: 'User registered successfully', username: cognitoUser.getUsername() });
    });
});

// Endpoint para confirmar el registro de un usuario
router.post('/confirm', (req, res) => {
    const { username, code } = req.body;
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message || JSON.stringify(err) });
        }
        res.json({ message: 'User confirmed successfully', result });
    });
});

// Endpoint para iniciar sesión
router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const authenticationData = {
        Username: username,
        Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            res.json({
                AccessToken: result.getAccessToken().getJwtToken(),
                IDToken: result.getIdToken().getJwtToken(),
                RefreshToken: result.getRefreshToken().getToken()
            });
        },
        onFailure: (err) => {
            return res.status(400).json({ error: err.message || JSON.stringify(err) });
        }
    });
});

// Endpoint para verificar si el usuario está confirmado
router.get('/isConfirmed', (req, res) => {
    const { username } = req.query; // Suponemos que se envía el nombre de usuario como un parámetro de consulta
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.getSession((err, session) => {
        if (err) {
            return res.status(400).json({ error: err.message || JSON.stringify(err) });
        }

        // Verificamos si el usuario está confirmado
        const isConfirmed = session.isValid() && session.getIdToken().payload['cognito:email_verified'] === 'true';

        res.json({ isConfirmed });
    });
});

module.exports = router;
