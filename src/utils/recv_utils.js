'use strict'
const models = require ('../../models');
const Recv = models.Recv;


function getRecvCountForSku(skuNbr, invNbr) {
    console.log ("Inside RECV SKU Count");

    return Recv.find({"skuNbr":skuNbr, "invNbr":invNbr}).count().exec();
}

function getRecvDetails(skuNbr, invNbr) {
    console.log ("Inside SKU Details");

    return Recv.find({"skuNbr":skuNbr, "invNbr":invNbr}).exec();
}

function getRecvAllDetails(skuNbr, invNbr) {
    console.log ("Inside GET ALL SKU Details");

    return Recv.find({}).exec();
}

function updateRecv (req) {
    console.log ("UPDATING : " + JSON.stringify(req.body));

    Recv.updateOne (
        { skuNbr: req.body.skuNbr },
        {
            $set: {
                invNbr:req.body.invNbr,
                skuNbr:req.body.skuNbr,
                ordQty:req.body.ordQty,
                recvQty:req.body.recvQty,
                slotNbr:req.body.slotNbr,                
                lastChangeTs:Date.now()             
            }
        }
    )
    .exec()
    .then (result => {
        console.log ("Updated");
        return 0;
    })
    .catch (err => {
        console.log ("ERR : " + err);
        return 1;
    })

    return 0;
    
}


module.exports = {
    getRecvCountForSku,
    getRecvDetails,
    getRecvAllDetails,
    updateRecv
}