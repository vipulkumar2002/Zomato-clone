import mongoose from "mongoose";

//Setup mongoose connection
export default async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  return mongoose.connect(MONGODB_URL);
};
// export default async () => {
//   const MONGODB_URL = process.env.MONGODB_URL;
//   return mongoose
//     .connect(`${MONGODB_URL}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then((data) => {
//       console.log(`MongoDB connected with server: ${data.connection.host} `);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
