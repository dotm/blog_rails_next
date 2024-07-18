import { LocalStorageKey } from "@/utils/constants";
import { LoggedInUserData } from "@/utils/types";
import useLocalStorage from "use-local-storage";
import SignInForm from "./SignInForm";
import SignOutForm from "./SignOutForm";
import SignUpForm from "./SignUpForm";

export default function Settings() {
  const [loggedInUserData, setLoggedInUserData] =
    useLocalStorage<LoggedInUserData | undefined>(LocalStorageKey.loggedInUser, undefined)

  return (
    <div>
      {
        loggedInUserData !== undefined
        ?
        <div className="space-y-10">
          <SignOutForm/>
        </div>
        :
        <>
          <div className="space-y-10">
            <SignInForm/>
            <SignUpForm/>
          </div>
        </>
      }
    </div>
  )
}
