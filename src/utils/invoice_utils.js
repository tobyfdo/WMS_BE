'use strict'
const models = require ('../../models');
const Invoice = models.Invoice;

function getDocCountForSku(skuNbr) {
    console.log ("Inside SKU Count");

    return Invoice.find({"po.skuNbr":skuNbr}).count().exec();
}

function getSkuDoc(skuNbr) {
    console.log ("Inside SKU Doc");

    return Invoice.find({"po.skuNbr":skuNbr}).exec();
}


function getTotQtyForSku (skuNbr) {
    console.log ("Inside getTotQtyForSku");
    return Invoice.aggregate(
        [        
            {$match:{"po.skuNbr":skuNbr}},
            {$unwind:"$po"},
            {$match:{"po.skuNbr": skuNbr}},
            {$group:{_id:null, total: {$sum:"$po.qty"}}}       
        ]
    )
    .exec()
    // .then(result => {
    //     console.log(result[0].total);
    //     //return result.total;
    //     // res.status(200).json(result);
    // })
    // .catch(err => {
    //     console.log(err);
    //     // res.status(500).json();
    // });
}

module.exports = {
    getTotQtyForSku,
    getSkuDoc,
    getDocCountForSku
}