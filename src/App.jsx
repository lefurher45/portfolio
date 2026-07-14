import SpaceBackground from './components/SpaceBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <SpaceBackground />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
