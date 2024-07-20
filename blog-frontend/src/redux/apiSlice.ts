import { env } from '@/env.mjs';
import { NewPostValues, PostListResponseData } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: env.NEXT_PUBLIC_BACKEND_URL }),
  refetchOnFocus: false,
  tagTypes: [
    'Post',
  ],
  endpoints: (builder) => ({
    getPostList: builder.query<
      PostListResponseData, //response
      {limit: number, last_oldest_post_id: number | undefined} //request
    >({
      query: ({limit, last_oldest_post_id}) => ({
        url: `/posts?limit=${limit}&last_oldest_post_id=${last_oldest_post_id ?? ""}`,
      }),
      providesTags: (result, error, payload) => [
        { type: 'Post', payload },
      ],
    }),
    addNewPost: builder.mutation({
      query: (payload: NewPostValues & {user_token: string | undefined}) => ({
        url: `/posts`,
        headers: {
          "Authorization": "Bearer " + payload.user_token,
        },
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'Post',
      ],
    }),
  }),
});

export const {
  useLazyGetPostListQuery,
  useAddNewPostMutation,
} = apiSlice