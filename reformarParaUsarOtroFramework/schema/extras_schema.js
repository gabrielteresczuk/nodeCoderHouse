const { buildSchema } = require('graphql');

const extraSchema = buildSchema(`
type Info {
  args : String,
  plataform: String,
  version : String,
  memory: String,
  path : String,
  pid : Int,
  dir : String,
  cpus : Int,
}
type Query {
  getInfo(args : String,plataform: String,version : String,memory: String,path : String,pid : Int,dir : String,cpus : Int,): Info,
}
`);

module.exports = extraSchema;