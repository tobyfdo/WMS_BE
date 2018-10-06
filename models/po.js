'use strict'

const db = require ('mongoose');

const Schema = db.Schema;
const poSchema = new Schema ({
    poNbr:String,
    skuNbr:String,
    qty:Number
}, {_id:false});

const PO = db.model ('PO', poSchema);

module.exports = {
    model:PO,
    schema:poSchema
};