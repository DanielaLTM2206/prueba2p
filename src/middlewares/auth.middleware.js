const jwtService = require('../services/jwt.service');

/**
 * Middleware de Autenticación para proteger las rutas de la Fintech.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer <token>.'
    });
  }

  const token = parts[1];

  try {
    // 1. Invocar jwtService.verifyToken(token).
    const decodedToken = jwtService.verifyToken(token);
    
    // 2. Adjuntar el payload de usuario a la petición.
    req.user = decodedToken;
    
    // 3. Habilitar next() bajo validación exitosa.
    next();
  } catch (error) {
    // Retornar una respuesta adecuada según el tipo de error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'El token ha expirado. Por favor, genere uno nuevo.'
      });
    }
    
    return res.status(401).json({
      error: 'Token inválido o expirado',
      message: error.message || 'El token proporcionado no es válido.'
    });
  }
}

module.exports = authMiddleware;
