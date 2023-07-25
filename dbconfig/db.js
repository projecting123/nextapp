import mongoose from "mongoose"
export async function  connect(){
    try {
      await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log('Some error occurred.')
    }
}