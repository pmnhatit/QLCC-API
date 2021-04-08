const electricBillServices = require('./electricBillServices');
//GET
module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        const all_bill = await electricBillServices.getElectricBillByApartmentId(apart_id);
        res.status(200).json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const month_bill = await electricBillServices.getElectricBillByMonth(apart_id, month, year);
        res.status(200).json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getElectricBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await electricBillServices.getElectricBillById(bill_id);
        res.status(200).json({data: bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}