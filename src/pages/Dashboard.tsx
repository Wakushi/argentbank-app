enum AccountSection {
  ACCOUNT_CHECKING = "Checking",
  ACCOUNT_SAVINGS = "Savings",
  ACCOUNT_CREDIT_CARD = "Credit Card",
}

export default function DashboardPage() {
  return (
    <main className="main bg-dark">
      <DashboardHead />
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

function DashboardHead() {
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        Tony Jarvis!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  )
}

function AccountCard({
  section,
  sectionCount,
  amount,
}: {
  section: AccountSection
  sectionCount: number
  amount: number
}) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">
          Argent Bank {section} (x{sectionCount})
        </h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}
