import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../../api/api'



export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (token) => ({
        url: '/transactions',
        method: 'GET',
        headers: {
          token: `JWT ${token}`,
        },
      }),
    }),
    getTransactionById: builder.query({
      query: ({ id, token }) => ({
        url: `/transaction/${id}`,
        headers: {
          token: `JWT ${token}`,
        },
      }),
    }),
    addToTransaction: builder.mutation({
      query: ({ token, data }) => ({
        url: `/add-to-cart`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteFromTransaction: builder.mutation({
      query: ({ token, id }) => ({
        url: `/delete-from-cart/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),
    updateTransactionById: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/update-cart/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const {useGetTransactionsQuery,useGetTransactionsMutation,useGetTransactionByIdQuery,useAddToTransactionMutation } = transactionApi