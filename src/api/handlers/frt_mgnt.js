'use strict'

const models = require ('../../../models');
const Invoice = models.Invoice;
const Recv = models.Recv;
const utils = require ('../../utils');
const invUtils = utils.invoiceUtils;
const recvUtils = utils.recvUtils;
const co = require ('co');

const addInvoice = (req,res) => { 

    console.log("Entering addInvoice");
    console.log ("REQ : " + JSON.stringify(req.body));    

    Invoice.create (req.body, (err,document) => {
        if (err) {
            console.log ("Error in creating Invoice : " + err);
            res.status (409).send('Error in creating Invoice');
        } else {
            console.log ("Invoice created successfully")   
            //res.json(document.toObject());
            res.status (200).send('Invoice added successfully');
        }
    });

    //res.send ('REQ: ' + req.body);
}

const saveInvoice = (req,res,next) => {
    console.log("Entering saveInvoice");

    const invoice = new Invoice ({
        bolNbr: req.body.bolNbr,
        inv: req.body.inv,
        container: req.body.container,
        invQty: req.body.invQty,
        po: req.body.po        
    });

    invoice.save().then (result =>  {
        console.log (result);        
        res.status(200).json({
            message:"Handling POST request",
            Invoice: invoice
        });
    })
    .catch (err => res.status (409).send('Error in creating Invoice'));   
}

const getBolByVal = (req,res,next) => {
    const val = req.params.bolId;

    Invoice.find ({bolNbr:val})
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
    });
}

const removeBolByVal = (req,res,next) => {
    const val = req.params.bolId;

    Invoice.remove ({ bolNbr: val })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
    });
}

const updateBolByVal = (req,res,next) => {
    const nbr = req.params.bolId;

    Invoice.update (
        { bolNbr: nbr },
        {
            $set: {
                inv: req.body.inv,
                container: req.body.container,
                invQty: req.body.invQty,
                po: req.body.po,
                lastChangeTs:Date.now()             
            }
        }
    )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
    });
}

const getAllBol = (req,res,next) => {    
    console.log ("Inside getAllBol");

    Invoice.find ()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
    });
}

const getSkuDetails = (req,res,next) => {
    const sku = req.params.sku;    

    console.log ("Inside getSkuDetails");

    co(function* () {
        try {

            const count = yield invUtils.getDocCountForSku(sku);
            console.log ("Count Response : " + JSON.stringify(count));

            if (count > 0)
            {
                const skuDet = yield invUtils.getSkuDoc(sku);
                console.log ("SKU Response : " + JSON.stringify(skuDet));

                const result = yield invUtils.getTotQtyForSku (sku);
                console.log ("Result Response : " + JSON.stringify(result));
                
                res.status(200).json({
                    skuNbr: sku,
                    invNbr: skuDet[0].inv,                   
                    ordQty: result[0].total
                });
            }
            else
            {
                res.status(500).json({
                    Message:"No records Found"
                });
            }
        }catch (e) {
            console.log ("Database retrieve error : " + e);
        }        
    });  
}

const updateRecv = (req,res,next) => {
    const nbr = req.params.sku;

    co(function* () {
        try {
            const count = yield recvUtils.getRecvCountForSku(nbr, req.body.invNbr);

            if (count > 0) {
                const recv = yield recvUtils.getRecvDetails (nbr, req.body.invNbr);
                console.log ("RECV : " + JSON.stringify(recv));
                recv[0].ordQty = req.body.ordQty;
                recv[0].recvQty = req.body.recvQty;
                recv[0].slotNbr = req.body.slotNbr;

                let updatedRecv = yield recv[0].save();
                updatedRecv = updatedRecv.toObject();
                console.log ("UPDATED successfully : " + JSON.stringify (updatedRecv));
                //const ret = recvUtils.updateRecv(req);
                res.status (200).send('Receiving updated successfully');
            }
            else {
                Recv.create (req.body, (err,document) => {
                    if (err) {
                        console.log ("Error in creating Receiving record : " + err);
                        res.status (409).send('Error in creating recv record');
                    } else {
                        console.log ("Receiving Record created successfully")   
                        //res.json(document.toObject());
                        res.status (200).send('Receiving added successfully');
                    }
                });       
            }
        }catch (e) {
            console.log ("Error in DB operation : " + e);
        }
    });   
}

const getAllRecv = (req,res,next) => {    
    console.log ("Inside getAllRecv");

    Recv.find ()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
    });
}

module.exports = {
    addInvoice,
    saveInvoice,   
    removeBolByVal,    
    updateBolByVal,
    getAllBol,
    getAllRecv,
    getBolByVal,
    getSkuDetails,
    updateRecv
};