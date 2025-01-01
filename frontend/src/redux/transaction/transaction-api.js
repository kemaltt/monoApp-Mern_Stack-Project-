import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../../api/api'



export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('token', `JWT ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactions: builder.mutation({
      query: () => ({
        url: '/transactions',
        method: 'GET',
        // headers: {
        //   token: `JWT ${token}`,
        // },
      }),
    }),
    getTransactionById: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        // headers: {
        //   token: `JWT ${token}`,
        // },
      }),
    }),
    addToTransaction: builder.mutation({
      query: (formData) => ({
        url: `/transaction/add`,
        method: 'POST',
        body: formData,
        // headers: {
        //   token: `JWT ${token}`,
        // },
      }),
    }),
    deleteFromTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/delete/${id}`,
        method: 'DELETE',
        // headers: {
        //   token: `JWT ${token}`,
        // },
      })
    }),
    updateTransactionById: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/transaction/edit/${id}`,
        method: 'PUT',
        body: formData,
        // headers: {
        //   token: `JWT ${token}`,
        // },
      }),
    }),
  }),
})

export const { useGetTransactionsMutation, useGetTransactionByIdMutation, useAddToTransactionMutation, useDeleteFromTransactionMutation, useUpdateTransactionByIdMutation } = transactionApi