import connectMongo from "../../../lib/mongodb";
import PlantsModel from "../../../models/createPlantModel";
import {v2 as cloudinary} from 'cloudinary'

export default async function deletePlant(req, res) {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
  });

  try {
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')
    console.log(`deleting mongodb document with ID: ${req.body.mongoID}`)
    const cloudinaryPublicIds = []
    req.body.cloudinaryIdArray.forEach( element => cloudinaryPublicIds.push(element.cloudinaryId))
    console.log('deleting pictures associated with plant')
    cloudinary.api.delete_resources(cloudinaryPublicIds,
      function(error, result) {
        console.log(result, error)
      })

    
    console.log('deleting mongo document')
    const mongoRes = await PlantsModel.deleteOne({_id: req.body.mongoID})
    console.log('deleted mongo document')
    res.json({ mongoRes })
  } catch(error) {
    console.log(error)
    res.json({ error })
  }
}