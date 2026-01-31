import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Products />
      <Footer />
    </main>
  )
}
