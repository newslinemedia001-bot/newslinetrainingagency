import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Partners from '@/components/Partners';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import ApplicationForm from '@/components/ApplicationForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <Partners />
      <Gallery />
      <Testimonials />
      <ApplicationForm />
      <Contact />
      <Footer />
    </main>
  );
}
