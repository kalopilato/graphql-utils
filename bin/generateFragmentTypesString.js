const { ensureDirSync } = require('./utils/ensureDirSync')
const fs = require('fs')
const config = require('../config')

/**
 * Filters the introspection response to only include interfaces and unions.
 */

const INPUT_FILE =
  process.env.INPUT_FILE ||
  `${config.outputPath}/${config.fileNames.introspection}`
const OUTPUT_FILE = process.env.OUTPUT_FILE || config.fileNames.fragmentTypes
const OUTPUT = `${config.outputPath}/${OUTPUT_FILE}`

console.log(`Reading introspection file: ${INPUT_FILE} ...`)
const introspectionSchemaResult = JSON.parse(fs.readFileSync(INPUT_FILE))

console.log('Building fragment Types string ...')
const fragmentTypes = introspectionSchemaResult.__schema.types.filter(
  type => type.possibleTypes !== null,
)

const schemaWithFragmentTypesOnly = {
  ...introspectionSchemaResult,
  __schema: { ...introspectionSchemaResult.__schema, types: fragmentTypes },
}

console.log('Writing result to file ...')
ensureDirSync(config.outputPath)
fs.writeFileSync(OUTPUT, JSON.stringify(schemaWithFragmentTypesOnly, null, 2))
console.log(`Result written to \`${OUTPUT}\``)
