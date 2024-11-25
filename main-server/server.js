// Initialization components
import express from 'express'
import mongoConnection from './src/core/db.js'
import cors from './src/core/cors.js'
import routes from './src/core/routes.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import serverStart from './src/core/start.js'
import gRPCServerStart from './src/core/gRPCServerStart.js'

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

// Database connection
mongoConnection()

// Start server
serverStart(server)
gRPCServerStart()
