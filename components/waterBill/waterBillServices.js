const waterBillModel = require('./waterBill');
const unitPriceServices = require('../unitPrice/unitPriceServices');

module.exports.getWaterBillByApartmentId = async (id)=>{
    const result = await waterBillModel.find({'apart_id': id});
    return result;
}
module.exports.getWaterBillByMonth = async (apart_id, month, year)=>{
    const result = await waterBillModel.findOne({'apart_id': apart_id, 'month': month, 'year': year});
    return result;
}
module.exports.createWaterBill = async (apart_id, new_index, month, year) =>{
    let m=0, y=0;
    if(month==1){
        m = 12;
        y = year - 1;
    }else{
        m = month - 1;
        y = year;
    }
    console.log("month: ",m);
    console.log("year: ",y);
    const preBil = await this.getWaterBillByMonth(apart_id, m, y);
    const unitPrice = await unitPriceServices.getUnitPrice();
    let old_index;
    if(preBil==null){
        console.log("Vo if");
        old_index = 0;
    }else{
        console.log("Vo else");
        old_index = preBil.new_index;
    }
    console.log("old_index: ",old_index);
    const unit_price = unitPrice.water;
    const consume = new_index - old_index;
    console.log("consume: ",consume);
    const total_money = consume * unit_price;
    console.log("Total: ", total_money);
    const newBill = new waterBillModel({apart_id, old_index, new_index, unit_price, consume, month, year, total_money})
    return newBill.save();
}