import { productQuery, userQuery } from "./queries/userQueries.js";
import { productMutation, userMutation } from "./mutations/userMutatios.js"

export const resolver = {
    Query: {
        ...userQuery,
        ...productQuery,

    },
    Mutation: {
        ...userMutation,
        ...productMutation,
    }
}