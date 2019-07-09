# GraphQL Utilities

A collection of simple utilities for working with GraphQL APIs using the [reference JS GraphQL implementation](https://graphql.org/graphql-js/).

## Installation

```bash
npm install
```

## Configuration

A `config.json` file is provided with the following options:

- outputPath: location to write output files
- fileNames: a list of default output file names

You may also configure a `.env` file for your API (see `.env.example`):

- `ID_TOKEN`: a valid JWT if your API requires an `Authorization` header (may also be provided via the commandline)
- `API_HOST`: the absolute url of your GraphQL API (may also be provided via the commandline)

## Scripts

Utility scripts are provided as follows:

#### Introspection

Perform an introspection query and write the result to disk.

```bash
npm run introspect
```

#### Generate a Schema Object

Create a GraphQLSchema object from the result of the introspection query and write it to disk.

```bash
npm run generate-schema-object
```

#### Generate a Schema String

Create a schema string from the result of the introspection query and write it to disk.

```bash
npm run generate-schema-string
```
