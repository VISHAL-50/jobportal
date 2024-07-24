const jobModel = require('../models/jobsModels');




const createJob = async (req, res)=>{
    
    try{
      
        const job = new jobModel({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            category: req.body.categories
           

        });
        if(!req.body.title || !req.body.description || !req.body.location){
            res.status(200).send({success: false, msg: "please fill all the details "});
        }
        else{
            const job_Data = await job.save();
            res.status(200).send({success: true, data: job_Data});
        }
    }
    catch(error){
        res.status(400).send(error);
    }
}

module.exports = { createJob };
