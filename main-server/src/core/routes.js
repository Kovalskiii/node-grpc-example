import userRouter from '../router/userRoutes.js'

export default function routes(app) {
  app.use('/users', userRouter)
  app.get('/', function(req, res) {
    res.send('Node gRPC main server running')
  })
}
