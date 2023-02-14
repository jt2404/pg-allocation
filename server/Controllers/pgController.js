const Pg = require("../model/pgSchema");

exports.createPg = async(req,res,next)=>
{
    const pg = await Pg.create(req.body);

    res.status(201).json(
        {
            success:true,
            pg
        }
    )
}
// exports.getAllPg =(req,res)=>
// {
//     res.status(200).json({message:"Route is working fine"})
// }