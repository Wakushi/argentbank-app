import { useDispatch, useSelector } from "react-redux"
import { FormEvent, useState } from "react"
import { getProfileFetchStatus, getUserInfo } from "../selectors"
import { User } from "../lib/types"
import AccountCard, { AccountSection } from "../components/AccountCard"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../features/user/userSlice"
import { AppDispatch } from "../store"

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useSelector(getUserInfo)
  const status = useSelector(getProfileFetchStatus)

  if (status === "loading") {
    return (
      <main className="main bg-dark">
        <div>Loading...</div>
      </main>
    )
  }

  if (status === "failed") {
    navigate("/")
    return
  }

  if (!user) {
    return (
      <main className="main bg-dark">
        <div>Something went wrong..</div>
      </main>
    )
  }

  return (
    <main className="main bg-dark">
      <DashboardHead user={user} />
      <h2 className="sr-only">Accounts</h2>
      <AccountCard
        section={AccountSection.ACCOUNT_CHECKING}
        sectionCount={8349}
        amount={10928.42}
      />
      <AccountCard
        section={AccountSection.ACCOUNT_SAVINGS}
        sectionCount={6712}
        amount={10928.42}
      />
      <AccountCard
        section={AccountSection.ACCOUNT_CREDIT_CARD}
        sectionCount={8349}
        amount={184.3}
      />
    </main>
  )
}

function DashboardHead({ user }: { user: User }) {
  const dispatch = useDispatch<AppDispatch>()
  const { firstName, lastName } = user

  const [editMode, setEditMode] = useState<boolean>(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const { firstName, lastName } = Object.fromEntries(formData.entries())
    try {
      await dispatch(
        updateUser({
          firstName: firstName.toString(),
          lastName: lastName.toString(),
        })
      ).unwrap()
    } catch (error: any) {
      alert(error.message)
      console.error(error)
    } finally {
      setEditMode(false)
    }
  }

  return (
    <div className="header">
      <h1>Welcome back</h1>
      {editMode ? (
        <div>
          <form className="update-form" onSubmit={onSubmit}>
            <div className="update-form-inputs">
              <input type="text" placeholder={firstName} name="firstName" />
              <input type="text" placeholder={lastName} name="lastName" />
            </div>
            <div className="update-form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <h1 className="userName">
            {" "}
            {firstName} {lastName}!
          </h1>
          <button
            className="edit-button"
            onClick={() => setEditMode((prevEditMode) => !prevEditMode)}
          >
            Edit Name
          </button>
        </>
      )}
    </div>
  )
}
