import React from "react";
import { ThemeColours } from "../../theme";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Layout from "../components/Layout";

const Bingus = () => {
    const [state, setState] = React.useState<'' | 'angry' | 'happy'>("");
    const [status, setStatus] = React.useState("Lord Bingus is currently accepting your generous gifts.");
    const [thinking, setThinking] = React.useState(true);

    const giftRef = React.createRef<HTMLInputElement>();

    const doTheThings = () => {
        const rand = Math.random();

        setStatus("Lord Bingus is thinking...");
        setThinking(true);

        setTimeout(() => {
            setThinking(false);

            if(rand < 0.5) {
                setStatus("Lord Bingus is angry at your terrible choice of gift. Try again.");
                setState("angry");
            } else {
                setStatus("Lord Bingus is pleased with your gift.");
                setState("happy");
            }

            if(giftRef.current) {
                giftRef.current.value = "";
            }
        }, 2000); 
    }

    return (
        <Layout title={"Bingus Shrine"} selectionColour={ThemeColours.Bingus}>
            <div className={"w-full flex flex-col h-full md:min-h-screen items-center"}>
                <Header />

                <main id={"main-content"}>
                    <div className={"hidden"}>
                        <img src={"/static/images/lord-bingus.webp"}></img>
                        <img src={"/static/images/lord-bingus-angry.webp"}></img>
                        <img src={"/static/images/lord-bingus-happy.webp"}></img>
                    </div>

                    <div className={"container my-10 max-w-7xl w-full flex flex-col gap-4 flex-wrap md:px-8 sm:px-8 lg:px-0 px-0 justify-center items-center"}>
                        <h1 className={"text-4xl font-bold"}>Bingus Shrine</h1>
                        <p>{status}</p>
                        <img src={`/static/images/lord-bingus${state.length ? `-${state}` : ``}.webp`} className={"rounded-3xl mt-6"}></img>

                        <Input 
                            type={"text"} 
                            colour={"bingus"}
                            placeholder={"Enter a gift to give to Lord Bingus"}
                            ref={giftRef}
                            onKeyUp={(e: any) => {
                                setThinking(!e.target.value.trim().length)
                            }}
                        ></Input>

                        <HollowButton 
                            onClick={doTheThings}
                            colour={"bingus"}
                            disabled={thinking}
                        >Offer gift</HollowButton>
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    if(locale == "en") locale = "en-GB";

    return {
        props: {
            messages: require(`../l10n/${locale}.json`),
        }
    };
}

export default Bingus;