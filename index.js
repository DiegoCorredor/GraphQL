const express = require('express')
const app = express()
const express_graphql = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql')

//setters
app.set('port', process.env.PORT || 3000)

//data
const {missionaries} = require('./data/missionaries.json')
console.log(missionaries)
//schema
const root = {
    message: () => "Hello World! This is working"
}

const schema = buildSchema(`
    type Query {
        message: String
    }`)

app.use('/graphql',express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
app.listen(app.get('port'), () => {
    console.log(`Server on port http://localhost:${app.get('port')}`)
})