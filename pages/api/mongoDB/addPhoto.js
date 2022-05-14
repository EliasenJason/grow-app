import connectMongo from "../../../lib/mongodb";
import PlantsModel from "../../../models/createPlantModel";

export default async function addPhoto(req, res) {
  // const filter = {_id: "6271016eab275440ae4b3093"}
  console.log(req.body)
  console.log('id is: ', req.body.id)
  console.log('url is: ', req.body.url)
  const update = {"$push": {"pictures": {"url": req.body.url, "date": new Date()}}}
  try {
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')

    console.log('adding photo url to mongodb document')
    let mongoRes = await PlantsModel.findByIdAndUpdate(req.body.id, update, {})
    console.log(mongoRes)
    if (mongoRes = null) {
      console.log('picture not added to database')
      res.json({success: false})
    } else {
      console.log('picture added to database')
      res.json({success: true})
    }
  } catch(error) {
    console.log(error)
    res.json({ error })
  }
}