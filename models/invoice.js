'use strict'

const db = require ('mongoose');
const PO = require ('./PO')

const Schema = db.Schema;
const invSchema = new Schema ({
    bolNbr: {type:String,index:true},
    inv: {type:String,index:true},
    container: String,
    invQty: Number,
    po: [PO.schema],
    lastChangeTs: { type: Date, default: Date.now }
}, {_id:true});

const Inv = db.model ('Inv', invSchema);

module.exports = {
    model:Inv,
    schema:invSchema
};