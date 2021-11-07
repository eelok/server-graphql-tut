const graphql = require('graphql');
const book = require('../models/book');
const author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    ////todo ???? () => ({})
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books.filter(book => book.authorId === parent.id);
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
           type: AuthorType,
            resolve(parent, args){
               // return authors.find(author => author.id === parent.authorId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return authors.find(author => author.id === args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

