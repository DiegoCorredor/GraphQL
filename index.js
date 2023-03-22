const express = require('express')
const app = express()
const express_graphql = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql')

//setters
app.set('port', process.env.PORT || 3000)

//data
const {missionaries} = require('./data/missionaries.json')
//console.log(missionaries)

const schema = buildSchema(`
    type Query {
        missionarie(id: Int!): Missionarie
        missionaries(formation: String): [Missionarie]
    },
    type Missionarie {
        id: Int
        name: String
        dni: Int
        age: Int
        formation: String
        province: String
    }`)

const getMissionarie = (args)=>{
    let id = args.id
    return missionaries.filter(missionarie => missionarie.id == id)[0]
}

const getMissionaries = (args)=>{
    if(args.formation){
        let formation = args.formation
        return missionaries.filter(missionarie => missionarie.formation == formation)
    }else{
        return missionaries
    }
}

//schema
const root = {
    missionarie : getMissionarie,
    missionaries : getMissionaries
}

app.use('/graphql',express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
app.listen(app.get('port'), () => {
    console.log(`Server on port http://localhost:${app.get('port')}`)
})