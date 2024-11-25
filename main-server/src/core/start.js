import createDefaultUserQuery from '../controllers/defaults/createDefaultUser.js'

// ===== START SERVER =====//
const serverStart = (app, isWebSocket = false) => {
  let PORT = Number(process.env.SERVER_PORT) || 8000

  return app
    .listen(PORT, () => {
      if (isWebSocket) {
        console.log(`WebSocket listening on port ${PORT}. Worker Pid: ${process.pid}`)
      } else {
        console.log(`Listening on port ${PORT}. Worker Pid: ${process.pid}`)
      }

      createDefaultUserQuery()
    })
    .on('error', err => {
      console.log(err)
      process.exit()
    })
}

export default serverStart
