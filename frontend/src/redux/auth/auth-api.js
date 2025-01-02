// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiBaseUrl } from '../../api/api'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers) => {
      // localStorage'dan token'i al
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('token', `JWT ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      })
    }),
    verifyAccount: builder.mutation({
      query: (token) => ({
        url: `/verify-account?token=${token}`,
        method: 'GET',
      })
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: email,
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/reset-password/${data.reset_password_key}`,
        method: 'PUT',
        body: data,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      })
    }),
    uploadProfileImage: builder.mutation({
      query: ({ token, formData }) => ({
        url: '/upload-profile-image',
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),
    updateUser: builder.mutation({
      query: ({ token, data }) => ({
        url: '/update-user',
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation, useUploadProfileImageMutation, useUpdateUserMutation, useVerifyAccountMutation } = authApi
