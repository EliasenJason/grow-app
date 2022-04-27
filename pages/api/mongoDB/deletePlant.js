import connectMongo from "../../../lib/mongodb";
import PlantsModel from "../../../models/createPlantModel";

export default async function deletePlant(req, res) {
  console.log(req.body)
  try {
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')

    console.log('deleting document')
    const mongoRes = await PlantsModel.deleteOne({_id: req.body})
    console.log('deleted document')
    res.json({ mongoRes })
  } catch(error) {
    console.log(error)
    res.json({ error })
  }
}