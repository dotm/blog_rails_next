import { useAddNewPostMutation, useLazyGetPostListQuery } from "@/redux/apiSlice";
import { LocalStorageKey } from "@/utils/constants";
import { handleErrorInFrontend } from "@/utils/error";
import { LoggedInUserData, PostData } from "@/utils/types";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function PostAdd() {
  const router = useRouter()
  const [loggedInUserData, setLoggedInUserData] =
    useLocalStorage<LoggedInUserData | undefined>(LocalStorageKey.loggedInUser, undefined)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [addNewPost, result] = useAddNewPostMutation();
  async function submitPost(){
    addNewPost({
      user_token: loggedInUserData?.token,
      title,
      content,
    })
  }
  useEffect(() => {
    if (result.data) {
      setTitle("")
      setContent("")
      alert("Success creating post")
    } else if (result.error) {
      alert(JSON.stringify(result.error, null, 2))
    }
  }, [result.data, result.error]);
  
  return (
    <div className="space-y-3">
      {
        !loggedInUserData &&
        <Link href="/settings" className="bg-gray-800 hover:bg-gray-700 outline-red-500 text-white block w-[100%] outline pb-2 pt-1 px-3 rounded-xl mx-auto">
          <p className="text-sm">
          You need to login before you can add new post.
          <br />
          Click here to login.
          </p>
        </Link>
      }
      <div className="divide-y divide-gray-400 bg-gray-800 text-white block w-[100%] px-3 pb-3 rounded-xl mx-auto">
        <h2 className="text-center font-bold p-2">Create New Post</h2>
        <div className="bg-gray-800 text-white block w-[100%] pb-3 pt-2 mx-auto">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 text-white">
            Title:
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900 text-white">
            Content:
          </label>
          <div className="mt-2">
            <input
              id="content"
              name="content"
              type="text"
              value={content}
              onChange={(event) => {
                setContent(event.target.value)
              }}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="bg-gray-800 text-white block w-[100%] pb-3 pt-2 mx-auto">
          <button
            onClick={submitPost}
            disabled={result.isLoading}
            className="disabled:bg-slate-600 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
