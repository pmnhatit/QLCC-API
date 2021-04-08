const otherBillServices = require('./otherBillServices');

module.exports.getBillByApartmentId = async (req, res, next)=>{
    try {
        const apart_id = req.params.apart_id;
        const all_bill = await otherBillServices.getOtherBillByApartmentId(apart_id);
        res.json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const month_bill = await otherBillServices.getOtherBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getOtherBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await otherBillServices.getOtherBillById(bill_id);
        res.status(200).json({data: bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}