class TransferController {
  constructor(verificationService, storageService, notificationService) {
    this.verificationService = verificationService;
    this.storageService = storageService;
    this.notificationService = notificationService;
    
    this.executeTransfer = this.executeTransfer.bind(this);
  }

  executeTransfer(req, res) {
    try {
      const { fromAccountId, toAccountId, amount } = req.body;

      if (!fromAccountId || !toAccountId || amount === undefined) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
        });
      }

      const numericAmount = Number(amount);

      // 1. Verificación financiera (SRP)
      const { sender, receiver } = this.verificationService.validateTransfer(
        fromAccountId,
        toAccountId,
        numericAmount
      );

      // 2. Almacenamiento y actualización de estado (SRP)
      this.storageService.updateBalance(fromAccountId, toAccountId, numericAmount);

      const newTransaction = {
        transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        from: fromAccountId,
        to: toAccountId,
        amount: numericAmount,
        status: 'COMPLETED',
        timestamp: new Date().toISOString()
      };
      this.storageService.saveTransaction(newTransaction);

      // 3. Notificaciones (SRP)
      this.notificationService.sendTransferNotifications(sender, receiver, numericAmount);

      return res.status(200).json({
        success: true,
        message: 'Transferencia ejecutada con éxito',
        transaction: newTransaction,
        balanceRestante: sender.balance
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Error en la transacción',
        message: error.message
      });
    }
  }
}

module.exports = TransferController;
