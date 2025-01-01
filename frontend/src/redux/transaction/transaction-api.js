import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../../api/api'



export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getTransactions: builder.mutation({
      query: (token) => ({
        url: '/transactions',
        method: 'GET',
        headers: {
          token: `JWT ${token}`,
        },
      }),
    }),
    getTransactionById: builder.mutation({
      query: ({ id, token }) => ({
        url: `/transaction/${id}`,
        headers: {
          token: `JWT ${token}`,
        },
      }),
    }),
    addToTransaction: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/transaction/add`,
        method: 'POST',
        body: formData,
        headers: {
          token: `JWT ${token}`,
        },
      }),
    }),
    deleteFromTransaction: builder.mutation({
      query: ({ id, token }) => ({
        url: `/transaction/delete/${id}`,
        method: 'DELETE',
        headers: {
          token: `JWT ${token}`,
        },
      })
    }),
    updateTransactionById: builder.mutation({
      query: ({ id, token, formData }) => ({
        url: `/transaction/edit/${id}`,
        method: 'PUT',
        body: formData,
        headers: {
          token: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const { useGetTransactionsMutation, useGetTransactionByIdMutation, useAddToTransactionMutation, useDeleteFromTransactionMutation,useUpdateTransactionByIdMutation } = transactionApi