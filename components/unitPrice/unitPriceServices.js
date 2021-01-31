const unitPriceModel = require("./unitPrice");

module.exports.getUnitPrice = async ()=>{
    const result = await unitPriceModel.find();
    return result[0];
}
module.exports.createUnitPrice = async (electric, water)=>{
    const newUnitPrice = new unitPriceModel({electric, water});
    return newUnitPrice.save();
}
module.exports.editUnitPrice = async (electric, water) =>{
    const result = await unitPriceModel.updateOne({}, { $set: { 'electric': electric, 'water': water }}, (err, doc) => {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
    console.log("hết service");
}