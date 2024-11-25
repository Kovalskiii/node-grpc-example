import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

// ===== gRPC client connection =====//
const GRPCClientConnection = () => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname)

  // Load protobuf
  const PROTO_PATH = path.resolve(__dirname, './service.proto')
  const packageDefinition = protoLoader.loadSync(PROTO_PATH)
  const grpcService = grpc.loadPackageDefinition(packageDefinition).grpcService

  let PORT = Number(process.env.GRPC_MAIN_SERVER_PORT) || 50051

  return new grpcService.UserService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure())
}

export default GRPCClientConnection
