import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../features/profile/profileSlice"
import { useEffect } from "react"
import { getProfileFetchStatus, getUser } from "../selectors"
import { User } from "../lib/types"
import AccountCard, { AccountSection } from "../components/AccountCard"
import { useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(getUser)
  const status = useSelector(getProfileFetchStatus)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

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
    return <div>Something went wrong..</div>
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
  const { firstName, lastName } = user
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  )
}
