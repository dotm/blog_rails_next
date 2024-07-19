import { useLazyGetPostListQuery } from "@/redux/apiSlice";
import { PostData } from "@/utils/types";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PostList() {
  const router = useRouter()
  const [lastOldestPostId, setLastOldestPostId] = useState<number | undefined>(undefined)
  const [pageLimit, setPageLimit] = useState(10)
  const [reachedEndOfPage, setReachedEndOfPage] = useState(false)
  const [trigger, result] = useLazyGetPostListQuery();
  const [postList, setPostList] = useState<PostData[]>([])
  function fetchPost() {
    trigger({limit: pageLimit, last_oldest_post_id: lastOldestPostId})
  }
  useEffect(() => {
    if (result.data?.data) {
      const nextPageForPost = result.data.data
      setPostList([...postList, ...nextPageForPost])
      if (nextPageForPost.length > 0) {
        setLastOldestPostId(nextPageForPost[nextPageForPost.length - 1].id) //assuming post has already been sorted descending from backend
      } else {
        setReachedEndOfPage(true)
      }
    } else if (result.error) {
      alert(JSON.stringify(result.error, null, 2))
    }
  }, [result.data?.data, result.error]);

  //trigger initial load
  //commented out in development because this cause duplicate fetch when hot-reloading
  useEffect(() => {
    if (postList.length === 0 && !reachedEndOfPage) {
      fetchPost()
    }
  }, [postList, reachedEndOfPage]);

  return (
    <div className="space-y-3">
      <div className="divide-y divide-gray-400 bg-gray-800 text-white block w-[100%] px-3 pb-3 rounded-xl mx-auto">
        <h2 className="text-center font-bold p-2">Post List</h2>
        {
          result.isLoading
          ?
          <div className="bg-gray-800 text-white block w-[100%] pb-3 pt-2 mx-auto">
            <p className="text-center">
              Please wait...
            </p>
          </div>
          :
          <></>
        }
        {
          postList.length === 0 && reachedEndOfPage
          ?
          <div className="bg-gray-800 text-white block w-[100%] pb-3 pt-2 mx-auto">
            <p className="text-center">
              No post available
            </p>
          </div>
          :
          <></>
        }
        {
          !result.isLoading && postList.length > 0
          ?
          <ul role="list" className="pt-3 grid grid-cols-1 gap-6">
            <InfiniteScroll
              dataLength={postList.length} //This is important field to render the next data
              next={fetchPost}
              hasMore={!reachedEndOfPage}
              loader={
                <p style={{ textAlign: 'center' }}>
                  Loading...
                </p>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  No more posts to load
                </p>
              }
            >
              {
                postList.map(post => {
                  return (
                    <li
                      key={post.id}
                      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-900 hover:bg-black text-center shadow border"
                    >
                      <div className="flex flex-1 flex-col p-8">
                        <h3 className="text-sm font-medium text-gray-200">{post.title}</h3>
                        <p className="text-sm text-gray-200">{post.content}</p>
                      </div>
                    </li>
                  )
                })
              }
            </InfiniteScroll>
          </ul>
          :
          <></>
        }
      </div>
    </div>
  )
}
