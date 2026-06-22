class AccountController {
  constructor(storageService) {
    this.storageService = storageService;
    
    this.getBalance = this.getBalance.bind(this);
  }

  getBalance(req, res) {
    try {
      const accountId = req.query.accountId;
      
      if (!accountId) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Debe proporcionar un parámetro accountId por query string (ej: ?accountId=ACC-12345).'
        });
      }

      const account = this.storageService.findAccount(accountId);
      if (!account) {
        throw new Error(`La cuenta '${accountId}' no existe.`);
      }

      return res.status(200).json({
        accountId: account.accountAlpha,
        email: account.email,
        balance: account.balance
      });
    } catch (error) {
      return res.status(404).json({
        error: 'Recurso no encontrado',
        message: error.message
      });
    }
  }
}

module.exports = AccountController;
