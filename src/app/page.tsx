import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import FreeBooks from "@/components/sections/FreeBooks";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyLumeo from "@/components/sections/WhyLumeo";
import RecentBooks from "@/components/sections/RecentBooks";
import Founders from "@/components/sections/Founders";
import Reviews from "@/components/sections/Reviews";
import BlogPreview from "@/components/sections/BlogPreview";
import Faq from "@/components/sections/Faq";
import Newsletter from "@/components/sections/Newsletter";
import Partners from "@/components/sections/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FreeBooks />
      <HowItWorks />
      <WhyLumeo />
      <RecentBooks />
      <Founders />
      <Reviews />
      <BlogPreview />
      <Faq />
      <Newsletter />
      <Partners />
    </>
  );
}
