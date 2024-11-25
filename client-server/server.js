// Initialization components
import express from 'express'
import cors from './src/core/cors.js'
import routes from './src/core/routes.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import serverStart from './src/core/start.js'
import GRPCClientConnection from './src/core/gRPCClientConnection.js'

// Initialization env
dotenv.config({ path: './.env' })

// Initialization express server
const server = express()

// Configuration request
cors(server)
server.disable('x-powered-by') // Disable Express signature
server.use(bodyParser.urlencoded({ extended: false })) // support encoded bodies
server.use(bodyParser.json()) // support json encoded bodies

// Initialization main endpoints
routes(server)

// Start server
serverStart(server)
export const gRPCClientConnection = GRPCClientConnection()
