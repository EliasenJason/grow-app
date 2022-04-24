import connectMongo from "../../../lib/mongodb";
import PlantsModel from "../../../models/createPlantModel";

export default async function createPlant(req, res) {
  try {
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')
    console.log('this was received', req.body)
    console.log('retrieving documents')
    const mongoRes = await PlantsModel.find({userEmail: req.body}).exec()
    console.log('documents received')
    res.json({ mongoRes })
  } catch(error) {
    console.log(error)
    res.json({ error })
  }
}