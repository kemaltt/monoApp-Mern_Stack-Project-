import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../../api/api'



export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (token) => ({
        url: '/cart',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addToCart: builder.mutation({
      query: ({ token, data }) => ({
        url: `/add-to-cart`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteFromCart: builder.mutation({
      query: ({ token, id }) => ({
        url: `/delete-from-cart/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),
    updateCartById: builder.mutation({
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

export const { useGetCartQuery, useAddToCartMutation, useDeleteFromCartMutation, useUpdateCartByIdMutation } = cartApi