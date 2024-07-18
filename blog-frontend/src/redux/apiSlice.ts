import { PostListResponseData } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getPostList: builder.query<
      PostListResponseData, //response
      {limit: number, last_oldest_post_id: number | undefined} //request
    >({
      query: ({limit, last_oldest_post_id}) => ({
        url: `/posts?limit=${limit}&last_oldest_post_id=${last_oldest_post_id ?? ""}`,
      }),
    }),
  }),
});

export const {
  useLazyGetPostListQuery,
} = apiSlice