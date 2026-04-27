
import mongoose from 'mongoose';

const connectDb = async()=>{
  try{
      mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB connected using mongoose'))
  }

  catch(error){
    console.log("Mongodb Connection failed", error)
    


  }
}

export default connectDb  ;