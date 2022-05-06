import connectMongo from "../../../lib/mongodb";
import PlantsModel from "../../../models/createPlantModel";

export default async function addPhoto(req, res) {
  const {filter, url, date} = req
  // const filter = {_id: "6271016eab275440ae4b3093"}
  const update = {"$push": {"pictures": {"url": "something.com", "date": new Date()}}}
  try {
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')

    console.log('adding photo')
    const mongoRes = await PlantsModel.findOneAndUpdate(filter, update, {})
    console.log(mongoRes)
    console.log('photo added')
    res.json({ mongoRes })
  } catch(error) {
    console.log(error)
    res.json({ error })
  }
}