// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from '../../api/api'



export const favApi = createApi({
  reducerPath: 'favApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getFavorite: builder.query({
      query: (token) => ({
        url: '/get-favorites',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addFavorite: builder.mutation({
      query: ({ token, id }) => ({
        url: `/add-favorite/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteFavorite: builder.mutation({
      query: ({ id, token }) => ({
        url: `/delete-favorite/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoriteQuery } = favApi
