const { buildClientSchema } = require('graphql')
const { ensureDirSync } = require('./utils/ensureDirSync')
const fs = require('fs')
const config = require('../config')

/**
 * Converts an introspection response to a GraphQLSchema object
 */

const INPUT_FILE = process.env.INPUT_FILE || `${config.outputPath}/${config.fileNames.introspection}`
const OUTPUT_FILE = process.env.OUTPUT_FILE || config.fileNames.schemaObject
const OUTPUT = `${config.outputPath}/${OUTPUT_FILE}`

console.log(`Reading introspection file: ${INPUT_FILE} ...`)
const introspectionSchemaResult = JSON.parse(fs.readFileSync(INPUT_FILE))

console.log('Building GraphQLSchema object ...')
const graphqlSchemaObj = buildClientSchema(introspectionSchemaResult)

console.log('Writing result to file ...')
ensureDirSync(config.outputPath)
fs.writeFileSync(OUTPUT, JSON.stringify(graphqlSchemaObj, null, 2))
console.log(`Result written to \`${OUTPUT}\``)
