import HeroSection from "../components/Home/HeroSection";
import NewestProductsSection from "../components/Home/NewestProductsSection";
import PopularCategories from "../components/Home/PapularCategories";

function Home(){
    return (
        <div>
            <HeroSection />
            <PopularCategories />
            <NewestProductsSection />
        </div>
    )
}

export default Home;