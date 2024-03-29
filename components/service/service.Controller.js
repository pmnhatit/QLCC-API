const service_Services = require('./service.Service');

//GET
module.exports.getServices = async (req, res, next) =>{
    try {
        const services = await service_Services.getServices(req.query);
        res.status(200).json({data: services});
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}
//CREATE
//UPDATE
module.exports.updateRegisted = async (req, res, next) =>{
    try {
        const {service_id, registed} = req.body;
        const service = await service_Services.updateRegisted(service_id, registed);
        if(service==null){
            res.status(400).json({message: "Parameter incorrect"});
        }else{
            res.status(200).json({data: service});
        }
    } catch (error) {
        console.log("errors: ",error);
        res.status(500).json(error);
    }
}