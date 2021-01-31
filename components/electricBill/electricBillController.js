const electricBillServices = require('./electricBillServices');

module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const apart_id = req.params.apart_id;
        console.log("user_id: ", apart_id);
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
module.exports.createElectricBill = async (req, res, next) =>{
    try {
        const {apart_id, new_index, month, year} = req.body;
        const new_bill = await electricBillServices.createElectricBill(apart_id, new_index, month, year);
        res.json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}