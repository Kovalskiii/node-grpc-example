import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import getUserService from '../controllers/user/getUserService.js'
import path from 'path'
import getUserFileService from '../controllers/user/getUserFileService.js'

// ===== START gRPC SERVER =====//
const gRPCServerStart = () => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname)

  // Load protobuf
  const PROTO_PATH = path.resolve(__dirname, './service.proto')
  const packageDefinition = protoLoader.loadSync(PROTO_PATH)
  const grpcService = grpc.loadPackageDefinition(packageDefinition).grpcService

  let PORT = Number(process.env.GRPC_SERVER_PORT) || 50051

  const server = new grpc.Server()
  server.addService(grpcService.UserService.service, { GetUserFile: getUserFileService, GetUser: getUserService })

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC main server running on port: ${PORT}`)
    server.start()
  })
}

export default gRPCServerStart
