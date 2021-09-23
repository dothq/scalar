import React from "react";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import MaskedInput from "react-text-mask";
import { ThemeColours } from "../../theme";

const Donate = () => {
    const [amount, setAmount] = React.useState(10);

    const [url, setUrl] = React.useState("https://liberapay.com/dothq/donate");

    React.useEffect(() => {
        setUrl(`https://liberapay.com/dothq/donate?amount=${amount}&currency=GBP&period=monthly#amount`)
    }, [amount])

    const onInputChange = (e) => {
        if(!e.currentTarget.value.length) setAmount(0);

        try {
            const parsed = parseInt(e.currentTarget.value)

            if(
                !isNaN(parsed)
            ) {
                setAmount(parsed);
            }
        } catch {}
    }

    return (
        <Layout title={"Donate"} selectionColour={ThemeColours.Blue.toHex(0.3)}>
            <div className={"w-full flex flex-col h-full md:min-h-screen items-center"}>
                <Header />

                <div className={"flex w-full md:px-8 sm:px-8 px-4 justify-center py-24 items-center"}>
                    <div className={"max-w-7xl w-full flex flex-col gap-6"}>
                        <h1 className={"text-7xl font-medium"}>Donate</h1>
                        <p className={"text-xl text-gray3"}>Your donation will support us in building next-generation privacy software and services.</p>
                    
                        <div className={"flex gap-3 items-center mt-5"}>
                            <HollowButton 
                                colour={"blue"}
                                className={amount == 5 ? `bg-transparent border-blue border-2 text-blue flex justify-center items-center w-max h-10 px-4 select-none font-bold bg-opacity-100 cursor-pointer transition-colors` : ``}
                                reset={amount == 5}
                                onClick={() => setAmount(5)}
                            >
                                £5
                            </HollowButton>

                            <HollowButton 
                                colour={"blue"}
                                className={amount == 10 ? `bg-transparent border-blue border-2 text-blue flex justify-center items-center w-max h-10 px-4 select-none font-bold bg-opacity-100 cursor-pointer transition-colors` : ``}
                                reset={amount == 10}
                                onClick={() => setAmount(10)}
                            >
                                £10
                            </HollowButton>

                            <HollowButton 
                                colour={"blue"}
                                className={amount == 15 ? `bg-transparent border-blue border-2 text-blue flex justify-center items-center w-max h-10 px-4 select-none font-bold bg-opacity-100 cursor-pointer transition-colors` : ``}
                                reset={amount == 15}
                                onClick={() => setAmount(15)}
                            >
                                £15
                            </HollowButton>

                            <HollowButton 
                                colour={"blue"}
                                className={amount == 20 ? `bg-transparent border-blue border-2 text-blue flex justify-center items-center w-max h-10 px-4 select-none font-bold bg-opacity-100 cursor-pointer transition-colors` : ``}
                                reset={amount == 20}
                                onClick={() => setAmount(20)}
                            >
                                £20
                            </HollowButton>

                            <HollowButton 
                                colour={"blue"}
                                className={amount == 50 ? `bg-transparent border-blue border-2 text-blue flex justify-center items-center w-max h-10 px-4 select-none font-bold bg-opacity-100 cursor-pointer transition-colors` : ``}
                                reset={amount == 50}
                                onClick={() => setAmount(50)}
                            >
                                £50
                            </HollowButton>

                            <Input 
                                colour={"blue"}
                                placeholder={"Custom amount"}
                                value={amount}
                                onKeyDown={onInputChange}
                                onKeyUp={onInputChange}
                                onFocus={onInputChange}
                                onBlur={onInputChange}
                                onChange={onInputChange}
                                groupAddon={<span className={"text-white font-bold"}>£</span>}
                            />
                        </div>

                        <ul>
                           <li>You have selected to donate <b>£{amount.toLocaleString()}</b>.</li>
                           <li>Upon clicking "Continue to payment", you will be sent to Liberapay to make the donation.</li>
                        </ul>

                        <HollowButton 
                            href={url}
                            colour={"blue"}
                            className={"mt-12"}
                            target={"_blank"}
                            disabled={amount == 0.00}
                        >
                            Continue to payment...
                        </HollowButton>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            messages: require(`../l10n/${locale}.json`),
        }
    };
}

export default Donate;