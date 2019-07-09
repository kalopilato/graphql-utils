require('dotenv').config()

const fetch = require('node-fetch')
const { ensureDirSync } = require('./utils/ensureDirSync')
const { introspectionQuery } = require('graphql')
const fs = require('fs')
const config = require('../config')

/**
 * Runs an introspection query and writes the result to `introspection.json`
 */

const { API_HOST, ID_TOKEN } = process.env
const OUTPUT_FILE = process.env.OUTPUT_FILE || config.fileNames.introspection
const OUTPUT = `${config.outputPath}/${OUTPUT_FILE}`

const headers = {
  'Content-Type': 'application/json'
}

if(ID_TOKEN) {
  headers.Authorization = `Bearer ${ID_TOKEN}`
} else {
  console.log('No ID_TOKEN detected. To make authenticated introspection queries please provide an ID_TOKEN.')
}

console.log(`Running introspection for ${API_HOST} ...`)

fetch(API_HOST, {
  headers,
  method: 'POST',
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    if (res.errors) {
      console.log(`ERROR: ${JSON.stringify(res.errors)}`)
    } else {
      console.log('Writing result to file ...')
      ensureDirSync(config.outputPath)
      fs.writeFileSync(OUTPUT, JSON.stringify(res.data, null, 2))
      console.log(`SUCCESS: Result written to \`${OUTPUT}\``)
    }
  })
