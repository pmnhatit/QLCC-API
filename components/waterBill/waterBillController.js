const waterBillServices = require('./waterBillServices');

module.exports.getBillByApartmentId = async (req, res, next) =>{
    try {
        const apart_id = req.params.apart_id;
        const all_bill = await waterBillServices.getWaterBillByApartmentId(apart_id);
        res.json({data: all_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.getBillByMonth = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const month_bill = await waterBillServices.getWaterBillByMonth(apart_id, month, year);
        res.json({data: month_bill});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500);
    }
}
module.exports.createElectricBill = async (req, res, next) =>{
    try {
        const {apart_id, new_index, month, year} = req.body;
        const new_bill = await waterBillServices.createWaterBill(apart_id, new_index, month, year);
        res.json({data: new_bill});
    } catch (error) {
        console.log("errors: ", error);
        res.status(500);
    }
}