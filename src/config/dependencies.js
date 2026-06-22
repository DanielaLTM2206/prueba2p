const StorageService = require('../services/storage.service');
const VerificationService = require('../services/verification.service');
const NotificationService = require('../services/notification.service');
const TransferController = require('../controllers/transfer.controller');
const AccountController = require('../controllers/account.controller');

// 1. Servicios de bajo nivel (SRP)
const storageService = new StorageService();
const verificationService = new VerificationService(storageService);
const notificationService = new NotificationService();

// 2. Controladores con Inversión de Dependencias (DIP)
const transferController = new TransferController(verificationService, storageService, notificationService);
const accountController = new AccountController(storageService);

module.exports = {
  storageService,
  verificationService,
  notificationService,
  transferController,
  accountController
};
