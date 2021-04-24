const allBillServices = require('./allBillServices');
const apartServices = require('../apartment/apartServices');

//GET
module.exports.getBillByApartId = async (req, res, next) =>{
    try {
        const {apart_id, month, year} = req.params;
        const bill = await allBillServices.getBillByApartId(apart_id, month, year);
        const apart = await apartServices.getApartmentById(apart_id);
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getAllByIsPayStatus = async (req, res, next) =>{
    try {
        const {apart_id, status} = req.params;
        const bills = await allBillServices.getAllByIsPayStatus(apart_id, status);
        let data = [];
        for(let i=0; i<bills.length; i++){
            const apart = await apartServices.getApartmentById(bills[i].apart_id);
            const bill = {
                id: bills[i]._id,
                apart_id: bills[i].apart_id,
                apart_name: apart.name,
                electric_bill: bills[i].electric_bill,
                water_bill: bills[i].water_bill,
                other_bill: bills[i].other_bill,
                image: bills[i].image,
                month: bills[i].month,
                year: bills[i].year,
                total_money: bills[i].total_money,
                is_pay: bills[i].is_pay,
                is_delete: bills[i].is_delete
            }
            data.push(bill);
        }
        res.status(200).json({data: data});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.getBillById = async (req, res, next) =>{
    try {
        const {bill_id} = req.params;
        const bill = await allBillServices.getBillById(bill_id);
        const apart = await apartServices.getApartmentById(bill.apart_id);
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//UPDATE
module.exports.updateImage = async (req, res, next) =>{
    try {
        const {bill_id, image} = req.body;
        const bill = await allBillServices.updateImage(image, bill_id);
        const apart = await apartServices.getApartmentById(bill.apart_id);
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, is_pay: bill.is_pay, is_delete: bill.is_delete};
        res.status(200).json({data: result});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
module.exports.changeReportStatus = async (req, res, next) =>{
    try {
        const {bill_id} = req.body;
        const bill = await allBillServices.changeReportStatus(bill_id);
        if(bill){
            const apart = await apartServices.getApartmentById(bill.apart_id);
        const result = {id: bill._id, apart_id: bill.apart_id, apart_name: apart.name, electric_bill: bill.electric_bill,
            water_bill: bill.water_bill, other_bill: bill.other_bill, total_money: bill.total_money, image: bill.image,
            month: bill.month, year: bill.year, report: bill.report, is_pay: bill.is_pay, is_delete: bill.is_delete};
            res.status(200).json({data: result});
        }else{
            res.status(400).json({message: "No bill to update!"});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}