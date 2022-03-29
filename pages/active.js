import Header from '../components/header'
import clientPromise from "../lib/mongodb";
import Image from 'next/image'

export default function Active({plants}) {
  console.log(plants)
  return (
    <>
      <Header />
      {plants.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <Image src={item.pictureUrl} height="250px" width="250px" alt="loaded image"/>
        </div>
      ))}
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