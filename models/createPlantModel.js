import { Schema, model, models } from 'mongoose'

const plantSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },  
  plantName: {
    type: String,
    required: true
  },
  plantedDate: {
    type: Date,
    required: true
  },
  pictures: {
    type: [{
      date: Date,
      url: String
    }],
    default: undefined
  },
  wateredDates: {
    type: Array,
    default: [Date]
  },
  finalHarvest: {
    date: {type: Date},
    weightInKgs: {type: Number},
    picture: {type: String}
  }
})

const PlantsModel = models.plants || model('plants', plantSchema)

export default PlantsModel

/*
{
  "userEmail": "bobjones@gmail.com",
  "name": "lettuce",
  "plantedDate": "2022-03-30",
  "picture": [
    {
      "date": "2022-03-30",
      "url": "http://res.cloudinary.com/dzxhltwmz/image/upload/v1648584419/my_uploads/cesclclohyh2jblidt1z.jpg"
    },
    {
      "date": "2022-04-02", 
      "url": "http://res.cloudinary.com/dzxhltwmz/image/upload/v1648584419/my_uploads/cesclclohyh2jblidt1z.jpg"
    }
  ],
  "wateredDates": [
    "2022-04-02",
    "2022-05-02",
    "2022-06-02"
  ],
  "finalHarvest": {
    "date": "2022-09-30",
    "weightInKgs": 100,
    "picture": "http://res.cloudinary.com/dzxhltwmz/image/upload/v1648584419/my_uploads/cesclclohyh2jblidt1z.jpg"
  }
}
*/