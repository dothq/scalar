import { useRouter } from "next/router"

const Home = () => {
    const { locale } = useRouter();

    return (
        <div>
            <h1>BINGUS in {locale}</h1>

            <img src={"https://bingus.dothq.workers.dev"}></img>
        </div>
    )
}

export default Home;