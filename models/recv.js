'use strict'

const db = require ('mongoose');

const Schema = db.Schema;
const recvSchema = new Schema ({
    invNbr: String,
    skuNbr: {type:String,index:true},
    ordQty: Number,
    recvQty: Number,
    slotNbr: String,
    lastChangeTs: { type: Date, default: Date.now }
}, {_id:true});

const Recv = db.model ('Recv', recvSchema);

module.exports = {
    model:Recv,
    schema:recvSchema
};