import Hero from "../components/Hero"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureSection />
    </main>
  )
}

function FeatureSection() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <FeatureItem
        imageUrl="/images/icon-chat.png"
        alt="Chat Icon"
        title="You are our #1 priority"
        desc="Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes."
      />
      <FeatureItem
        imageUrl="/images/icon-money.png"
        alt="Money Icon"
        title="More savings means higher rates"
        desc="The more you save with us, the higher your interest rate will be!"
      />
      <FeatureItem
        imageUrl="/images/icon-security.png"
        alt="Security Icon"
        title="Security you can trust"
        desc="We use top of the line encryption to make sure your data and money is
          always safe."
      />
    </section>
  )
}

function FeatureItem({
  imageUrl,
  alt,
  title,
  desc,
}: {
  imageUrl: string
  alt: string
  title: string
  desc: string
}) {
  return (
    <div className="feature-item">
      <img src={imageUrl} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{desc}</p>
    </div>
  )
}
