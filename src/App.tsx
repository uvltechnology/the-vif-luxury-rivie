import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Stays from '@/pages/Stays'
import PropertyDetail from '@/pages/PropertyDetail'
import Experiences from '@/pages/Experiences'
import AreaGuide from '@/pages/AreaGuide'
import HowToBook from '@/pages/HowToBook'
import OurStory from '@/pages/OurStory'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="stays" element={<Stays />} />
                    <Route path="stays/:propertySlug" element={<PropertyDetail />} />
                    <Route path="experiences" element={<Experiences />} />
                    <Route path="the-riviera" element={<AreaGuide />} />
                    <Route path="how-to-book" element={<HowToBook />} />
                    <Route path="our-story" element={<OurStory />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
            <Toaster position="top-right" />
        </BrowserRouter>
    )
}

export default App