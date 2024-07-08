export enum AccountSection {
  ACCOUNT_CHECKING = "Checking",
  ACCOUNT_SAVINGS = "Savings",
  ACCOUNT_CREDIT_CARD = "Credit Card",
}

export default function AccountCard({
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
