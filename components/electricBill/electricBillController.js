const electricBillServices = require('./electricBillServices');
//GET
module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const {apart_id} = req.params;
        console.log("apart_id: ", apart_id);
        const all_bill = await electricBillServices.getElectricBillByApartmentId(apart_id);
        res.json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        console.log("month: ",month);
        const month_bill = await electricBillServices.getElectricBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}