const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

/**
 * Genera un Token JWT firmado con clave privada asimétrica (RS256).
 * 
 * @param {Object} user - Objeto con la información del usuario a firmar.
 * @returns {string} JWT Token firmado.
 */
function signToken(user) {
  const privateKeyPath = path.join(__dirname, '../../private.pem');
  if (!fs.existsSync(privateKeyPath)) {
    throw new Error('La llave privada private.pem no existe en la raíz del proyecto.');
  }
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

  // Payload con claims seguros (sub, name y exp configurado para expirar en 2 minutos)
  const payload = {
    sub: user.id || user.sub,
    name: user.name || user.email
  };

  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '2m' });
}

/**
 * Verifica un Token JWT utilizando la clave pública asimétrica (RS256).
 * 
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Payload decodificado si es válido.
 */
function verifyToken(token) {
  const publicKeyPath = path.join(__dirname, '../../public.pem');
  if (!fs.existsSync(publicKeyPath)) {
    throw new Error('La llave pública public.pem no existe en la raíz del proyecto.');
  }
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

module.exports = {
  signToken,
  verifyToken
};
