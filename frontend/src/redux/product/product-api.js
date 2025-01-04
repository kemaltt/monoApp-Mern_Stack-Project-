// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from '../../api/api'


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: (category) => ({
        url: '/products',
        params: {
          category: category || 'All',
        },
      }),
    }),
    getProductById: builder.query({
      query: ({ id, token }) => ({
        url: `/product/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProductById: builder.mutation({
      query: ({ id, token, updatedCountInStock }) => ({
        url: `/product/${id}`,
        method: 'PATCH',
        body: { updatedCountInStock },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/add-product',
        method: 'POST',
        body: product,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `/delete-product/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/edit-product/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    uploadImages: builder.mutation({
      query: ({ formData, id, token }) => ({
        url: `upload-images/${id}`,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
})

export const { useGetProductsMutation, useGetProductByIdQuery, useUpdateProductByIdMutation, useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useUploadImagesMutation } = productApi