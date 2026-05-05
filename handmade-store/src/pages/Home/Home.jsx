import { Header } from '../../components/layout/Header.jsx';
import { HomeSlider } from './components/HomeSlider.jsx';
import { DealOfTheDay } from '../../components/sections/DealOfTheDay/DealOfTheDay.jsx';
import { SaleBanner } from '../../components/common/SaleBanner.jsx';
import { ProductsInFocus } from './components/ProductsInFocus.jsx';
import { CallToAction } from './components/CallToAction.jsx';
import { Feature } from './components/Feature.jsx';
import { InstagramFeed } from './components/InstagramFeed.jsx';
import { Footer } from '../../components/layout/Footer.jsx';
import { QuickView } from '../../components/common/QuickView.jsx';

export function Home() {
    return (
        <>
            <Header />
            <HomeSlider />
            <DealOfTheDay />
            <SaleBanner />
            <ProductsInFocus />
            <CallToAction />
            <Feature />
            <InstagramFeed />
            <Footer />
            <QuickView />
        </>
    );
}
