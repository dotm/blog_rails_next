import { env } from "@/env.mjs"
import { LocalStorageKey } from "@/utils/constants"
import { handleErrorInFrontend } from "@/utils/error"
import { LoggedInUserData } from "@/utils/types"
import { FormEvent, useState } from "react"
import useLocalStorage from "use-local-storage"

export default function SignInForm() {
  const [loggedInUserData, setLoggedInUserData] =
    useLocalStorage<LoggedInUserData | undefined>(LocalStorageKey.loggedInUser, undefined)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  async function interactor_userSignIn(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    
    try {
      setLoading(true)
      const signInRespJson = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "user": {
            "email": email,
            "password": password
          }
        }),
      })
      .then(response => response.json())
      if(signInRespJson.data){
        setLoggedInUserData({
          token: signInRespJson.data.token,
          email: signInRespJson.data.email,
        })
      }else if(signInRespJson.error){
        handleErrorInFrontend(signInRespJson.error)
      }
    } catch (error) {
      handleErrorInFrontend(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-gray-800 p-8 shadow sm:rounded-lg">
          <form className="space-y-6" onSubmit={interactor_userSignIn}>
            <div>
              <label htmlFor="signIn-email" className="sr-only block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div>
                <input
                  id="signIn-email"
                  name="signIn-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={event=>setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signIn-password" className="sr-only block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="">
                <input
                  id="signIn-password"
                  name="signIn-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={event=>setPassword(event.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="disabled:bg-slate-600 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
