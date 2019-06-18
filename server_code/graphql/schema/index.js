const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
  _id: ID!
  email: String!
  bio: String!
  password: String
  isTenant: Boolean!
  myHouse: [House!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  user: User!
}

type Picture{
  _id: ID!
  discription: Int!
}

type Favorite{
  _id: ID!
  house: House!
  user: User!
}

type House {
  _id: ID!
  forRent: Boolean!
  address: String!
  aptNum: Int!
  price: Int!
  owner: User
  lng: Float!
  lat: Float!
  discription: String
  pics: [Picture!]
}

input HouseInput {
  forRent: Boolean!
  address: String!
  aptNum: Int!
  price: Int!
  lng: Float!
  lat: Float!
  discription: String!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    myHouses: [House!]!
    login(email: String!, password: String!): AuthData!
    oneUser(userId: ID!): User
    myFavorites: [Favorite!]!
}

type RootMutation {
    createHouse(houseInput: HouseInput): User
    createUser(userInput: UserInput): User
    changeUserTeanentStatus(isTenant: Boolean!): User!
    updateUserProfile(bio: String!): User!
    addFavorite(houseId: ID!): Favorite!
    removeFavorite(favoriteId: ID!): House!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
