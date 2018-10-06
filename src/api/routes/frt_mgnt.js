'use strict'

const express = require ('express');
const router = express.Router();
const handlers = require ('../handlers');

router.post ('/add', handlers.addInvoice);
router.get ('/:bolId', handlers.getBolByVal);
router.delete ('/:bolId', handlers.removeBolByVal);
router.patch ('/:bolId', handlers.updateBolByVal);
router.get ('/bol/all', handlers.getAllBol);
router.get ('/bol/sku/:sku', handlers.getSkuDetails);
router.patch ('/bol/sku/:sku', handlers.updateRecv);
router.get ('/bol/sku', handlers.getAllRecv);

module.exports = router;