import mongoose from 'mongoose'

export function connectionString() {
  const { NODE_ENV, MONGO_DB_CONNECTION_STRING, MONGO_DB_CONNECTION_STRING_PROD } = process.env

  if (NODE_ENV === 'prod') return MONGO_DB_CONNECTION_STRING_PROD
  return MONGO_DB_CONNECTION_STRING
}

mongoose.set('strictQuery', false)

export default function mongoConnection() {
  mongoose.connect(connectionString()).catch(err => console.log(err))

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected')
  })
}
