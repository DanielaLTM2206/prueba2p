class StorageService {
  constructor() {
    this.usersDb = [
      { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
      { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
    ];
    this.transactionsHistory = [];
  }

  findAccount(accountId) {
    return this.usersDb.find(u => u.accountAlpha === accountId);
  }

  updateBalance(fromAccountId, toAccountId, amount) {
    const sender = this.findAccount(fromAccountId);
    const receiver = this.findAccount(toAccountId);
    if (sender) {
      sender.balance = Number((sender.balance - amount).toFixed(2));
    }
    if (receiver) {
      receiver.balance = Number((receiver.balance + amount).toFixed(2));
    }
  }

  saveTransaction(transaction) {
    this.transactionsHistory.push(transaction);
  }

  getTransactions() {
    return this.transactionsHistory;
  }
}

module.exports = StorageService;
