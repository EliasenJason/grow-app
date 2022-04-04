import clientPromise from "../../../lib/mongodb";

export default async function createPlant(req, res) {
  const client = await clientPromise;
  const db = client.db("Testing");
  console.log(req.body)
  let bodyObject = JSON.parse(req.body);
  // db.collection("names").deleteMany()
  await db.collection("names").insertOne(bodyObject)
  res = await res.JSON
}