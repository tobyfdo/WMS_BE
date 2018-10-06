'use strict'

const Invoice = require ('./invoice');
const Recv = require ('./recv');

module.exports = {
    Invoice:Invoice.model,
    Recv:Recv.model
}