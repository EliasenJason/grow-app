import Header from '../components/header'
import clientPromise from "../lib/mongodb";

export default function Active(plants) {
  console.log(plants)
  return (
    <>
      <Header />
      <h1>Active</h1>
    </>
  )
}


export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("Testing");

  let plants = await db.collection("names").find({}).toArray();
  plants = JSON.parse(JSON.stringify(plants));

  return {
    props: { plants },
  };
}