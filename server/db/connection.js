import mongoose from "mongoose";

const connectToDB = async() => {
    await mongoose.connect('mongodb+srv://avez-taxlab:avez@cluster0.nwg85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
        console.log('Database connected')
    }).catch((error) => {
        console.log(error);
    })
}

export default connectToDB;
