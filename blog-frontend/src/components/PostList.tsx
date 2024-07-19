import { useLazyGetPostListQuery } from "@/redux/apiSlice";
import { PostData } from "@/utils/types";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function PostList() {
  const router = useRouter()
  const [lastOldestPostId, setLastOldestPostId] = useState<number | undefined>(undefined)
  const [pageLimit, setPageLimit] = useState(2)
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
  // useEffect(() => {
  //   if (postList.length === 0 && !reachedEndOfPage) {
  //     fetchPost()
  //   }
  // }, [postList, reachedEndOfPage]);

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
            {postList
              .map(post => {
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
          </ul>
          :
          <></>
        }
        {
          reachedEndOfPage
          ?
          <div className="flex flex-1 justify-between sm:justify-end mt-2 pt-2 gap-2 items-center">
            <p>
              No more posts to load
            </p>
          </div>
          :
          <div className="flex flex-1 justify-between sm:justify-end mt-2 pt-2 gap-2 items-center">
            <p>
              Limit per page:
            </p>
            <input
              id="pageLimit"
              name="pageLimit"
              type="number"
              value={pageLimit}
              onChange={(event) => {
                setPageLimit(parseInt(event.target.value) ?? 0)
              }}
              className="block w-[60px] text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              onClick={() => {
                fetchPost()
              }}
              className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            >
              {postList.length === 0 && !reachedEndOfPage ? "Get First Page" : "Get Next Page"}
            </button>
          </div>
        }
      </div>
    </div>
  )
}
