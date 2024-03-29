import connectMongo from "../../../lib/mongodb";
import PlantsModel from "../../../models/createPlantModel";

export default async function createPlant(req, res) {
  try {
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')

    console.log('creating document')
    const mongoRes = await PlantsModel.create(req.body)
    console.log('created document')
    res.json({ mongoRes })
  } catch(error) {
    console.log(error)
    res.json({ error })
  }
}