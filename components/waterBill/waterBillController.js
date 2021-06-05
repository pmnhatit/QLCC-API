const waterBillServices = require('./waterBillServices');
const {validateBillId, validateGetBillByApartmentId, validateGetBillByMonth} = require('../../services/validation/validationWaterBill');

//GET
module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const apart_id = req.params.apart_id;
        const valid = await validateGetBillByApartmentId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const all_bill = await waterBillServices.getWaterBillByApartmentId(apart_id);
            res.status(200).json({data: all_bill});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const valid = await validateGetBillByMonth(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const month_bill = await waterBillServices.getWaterBillByMonth(apart_id, month, year);
            res.status(200).json({data: month_bill});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getWaterBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const valid = await validateBillId(req.params);
        if(valid.error){
            console.log(valid.error);
            res.status(400).json({message: "Parameter incorrect!"});
        }else{
            const bill = await waterBillServices.getWaterBillById(bill_id);
            res.status(200).json({data: bill});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}