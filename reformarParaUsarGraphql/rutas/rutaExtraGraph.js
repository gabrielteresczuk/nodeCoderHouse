const controllerExtrasGraph = require("../controllers/controllerExtrasGraph.js");

const extraSchema = require('../schema/extras_schema.js');

extrasRoot = {
    getInfo:controllerExtrasGraph.getInfo,
}

rutasExtrasGraph = 
    {
        schema: extraSchema,
        rootValue: extrasRoot,
        graphiql: true,
    }


module.exports = rutasExtrasGraph
