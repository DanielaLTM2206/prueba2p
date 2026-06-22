const jwtService = require('../services/jwt.service');

class AuthController {
  constructor() {
    this.generateToken = this.generateToken.bind(this);
  }

  generateToken(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Los campos username y password son requeridos.'
        });
      }

      // Validar credenciales de forma simulada
      if (username === 'admin' && password === 'admin123') {
        const user = {
          id: 'usr_001',
          name: 'Daniela Tituaña',
          email: 'estudiante.alpha@espe.edu.ec'
        };

        const token = jwtService.signToken(user);
        return res.status(200).json({ token });
      }

      return res.status(401).json({
        error: 'No autorizado',
        message: 'Credenciales inválidas.'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Error del servidor',
        message: error.message
      });
    }
  }
}

module.exports = AuthController;
