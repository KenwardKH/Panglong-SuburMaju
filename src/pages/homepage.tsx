import Features from "../components/homepage/features";
import Hero from "../components/homepage/hero";

export default function Homepage(){
    return(
        <div className="z-0">
            <Hero />
            <Features />
        </div>
    )
}