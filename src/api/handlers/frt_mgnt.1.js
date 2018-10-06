'use strict'

const models = require ('../../../models');
const Invoice = models.Invoice;
const utils = require ('../../utils');
const invUtils = utils.invoiceUtils;
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

const getBolById = (req,res,next) => {
    const Id = req.params.bolId;

    Invoice.findById (Id)
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

const removeBolById = (req,res,next) => {
    const Id = req.params.bolId;

    Invoice.remove ({ _id: Id })
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

const updateBolById = (req,res,next) => {
    const Id = req.params.bolId;

    Invoice.update (
        { _id: Id },
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
            const result = yield invUtils.getTotQtyForSku (sku);
            console.log ("Response : " + result);
        }catch (e) {
            console.log ("Database retrieve error : " + e);
        }        
    });  

}

module.exports = {
    addInvoice,
    saveInvoice,
    getBolById,
    removeBolById,
    removeBolByVal,
    updateBolById,
    updateBolByVal,
    getAllBol,
    getBolByVal,
    getSkuDetails
};