import React from "react";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { Themes } from "../utils/theme";
import { Tab } from "../components/Tab";
import { ThemeColours } from "../../theme";
import { Footer } from "../components/Footer";

const constructDonateUrl = ({ amount, currency, period }: { amount: number, currency: string, period: string }) => {
    return `https://liberapay.com/dothq/donate?amount=${amount}&currency=${currency}&period=${period}#amount`
}

const Donate = () => {
    const [amount, setAmount] = React.useState(10);
    const [currency, setCurrency] = React.useState("GBP");
    const [period, setPeriod] = React.useState("monthly");

    const [continueBtnDisabled, setContinueBtnDisabled] = React.useState(false);

    const [processing, setProcessing] = React.useState(false);

    const [error, setError] = React.useState("");

    const onInputChange = (e: any) => {
        setContinueBtnDisabled(false);
        setAmount(e.currentTarget.value)
        setError("")
    }

    return (
        <Layout title={"Donate"} theme={Themes.Light}>
            <style>{`
                body::before {
                    content: "";
                    opacity: ${Number(processing)};
                    display: ${processing ? `flex` : `none`};
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background-color: ${ThemeColours.Black.toHex(0.5)};
                    z-index: 999999999999;
                    transition: 0.3s opacity;
                }
            `}</style>

            <div className={"w-full flex flex-col h-full md:min-h-screen items-center"}>
                <Header theme={Themes.Light} bg={"bg-gray7"} />

                <div className={"w-full flex justify-center bg-gray7 grid-pattern text-black py-36 pb-44 md:px-8 sm:px-8 px-4"}>
                    <div className={"max-w-7xl flex flex-col justify-start w-full gap-8"}>
                        <h1 className={"text-6xl font-bold"}>Support us financially</h1>
                        <p className={"text-2xl text-gray3 max-w-2xl"}>Your donation will support us in building next-generation privacy software and services.</p>
                    </div>
                </div>

                <div className={"container my-10 max-w-7xl w-full flex flex-row gap-4 flex-wrap md:px-8 sm:px-8 px-4 justify-between"}>
                    <div className={"flex flex-col"}>
                        {!!error.length && <summary className={"px-6 py-3 mb-6 bg-red bg-opacity-10 border-red border-opacity-50 rounded-lg list-none text-red font-medium"} id={"donation-error-msg"}>{error}</summary>}

                        <h1 className={"text-4xl font-semibold"}>Donation period</h1>
                        
                        <ul className={"flex gap-5 flex-wrap px-10 md:px-0 my-10"}>
                            <Tab active={period == "weekly"} onClick={() => setPeriod("weekly")}>
                                Weekly
                            </Tab>
                            <Tab active={period == "monthly"} onClick={() => setPeriod("monthly")}>
                                Monthly
                            </Tab>
                            <Tab active={period == "yearly"} onClick={() => setPeriod("yearly")}>
                                Yearly
                            </Tab>
                        </ul>

                        <h1 className={"text-4xl font-semibold"}>Donation amount</h1>
                        
                        <ul className={"flex gap-5 flex-wrap px-10 md:px-0 my-10"}>
                            <Tab active={amount == 5} onClick={() => setAmount(5)}>
                                £5
                            </Tab>
                            <Tab active={amount == 10} onClick={() => setAmount(10)}>
                                £10
                            </Tab>
                            <Tab active={amount == 15} onClick={() => setAmount(15)}>
                                £15
                            </Tab>
                            <Tab active={amount == 20} onClick={() => setAmount(20)}>
                                £20
                            </Tab>
                            <Tab active={amount == 50} onClick={() => setAmount(50)}>
                                £50
                            </Tab>
                        </ul>

                        <div className={"ml-10 flex flex-col gap-6 mt-2"}>
                            <h1 className={"text-2xl font-semibold"}>Other amount</h1>
                            <Input
                                colour={"blue"}
                                groupAddon={<span className={"text-white"}>£</span>}
                                onChange={onInputChange}
                                onKeyUp={(e: any) => {
                                    setContinueBtnDisabled(!e.target.value.length)
                                }}
                                value={amount}
                            />
                        </div>

                        <HollowButton 
                            href={"https://liberapay.com/dothq/donate"}
                            colour={"blue"}
                            className={"mt-12"}
                            target={"_blank"}
                            disabled={continueBtnDisabled}
                            onClick={(e: any) => {
                                setError("")

                                const url = constructDonateUrl({
                                    amount,
                                    currency,
                                    period
                                })

                                const width = window.innerWidth 
                                    ? window.innerWidth 
                                    : document.documentElement.clientWidth 
                                        ? document.documentElement.clientWidth 
                                        : screen.width;

                                const height = window.innerHeight 
                                    ? window.innerHeight 
                                    : document.documentElement.clientHeight 
                                        ? document.documentElement.clientHeight 
                                        : screen.height;
                                
                                const left = ((width / 2) - (650 / 2)) + window.screenLeft;
                                const top = ((height / 2) - (800 / 2)) + window.screenTop;

                                let win = window.open(
                                    url,
                                    "_blank",
                                    `menubar=0,toolbar=0,width=650,height=800,left=${left},top=${top}`
                                )

                                setProcessing(true);

                                const onClickListener = () => {
                                    if(win) win.close();

                                    setProcessing(false);
                                    window.removeEventListener("click", onClickListener);
                                }

                                let closedInt: any;

                                closedInt = setInterval(() => {
                                    win?.focus()

                                    if (win?.closed) {
                                        clearInterval(closedInt);
                                        onClickListener();
                                    }
                                }, 500);

                                window.addEventListener("click", () => {
                                    onClickListener()
                                })
                            }}
                        >
                            Continue to payment...
                        </HollowButton>
                    </div>

                    <div>
                        <select onChange={(e) => setCurrency(e.target.value)} className={"md:hidden lg:flex flex justify-center items-center w-max h-10 bg-blue px-4 select-none text-white font-bold border-2 border-transparent bg-opacity-100 hover:border-blue hover:bg-transparent hover:text-blue hover:bg-opacity-100 cursor-pointer transition-colors "}>
                            <option value="EUR">
                                £ British Pound
                            </option>
                            <option value="EUR">
                                € Euro
                            </option>
                            <option value="USD">
                                $ US Dollar
                            </option>
                            <option value="AUD">
                                $ Australian Dollar
                            </option>
                            <option value="BGN">
                                BGN Bulgarian Lev
                            </option>
                            <option value="BRL">
                                R$ Brazilian Real
                            </option>
                            <option value="CAD">
                                $ Canadian Dollar
                            </option>
                            <option value="CHF">
                                CHF Swiss Franc
                            </option>
                            <option value="CNY">
                                ¥ Chinese Yuan
                            </option>
                            <option value="CZK">
                                CZK Czech Koruna
                            </option>
                            <option value="DKK">
                                DKK Danish Krone
                            </option>
                            <option value="HKD">
                                $ Hong Kong Dollar
                            </option>
                            <option value="HRK">
                                HRK Croatian Kuna
                            </option>
                            <option value="HUF">
                                Ft Hungarian Forint
                            </option>
                            <option value="IDR">
                                IDR Indonesian Rupiah
                            </option>
                            <option value="ILS">
                                ₪ Israeli New Shekel
                            </option>
                            <option value="INR">
                                ₹ Indian Rupee
                            </option>
                            <option value="ISK">
                                ISK Icelandic Króna
                            </option>
                            <option value="JPY">
                                ¥ Japanese Yen
                            </option>
                            <option value="KRW">
                                ₩ South Korean Won
                            </option>
                            <option value="MXN">
                                $ Mexican Peso
                            </option>
                            <option value="MYR">
                                MYR Malaysian Ringgit
                            </option>
                            <option value="NOK">
                                NOK Norwegian Krone
                            </option>
                            <option value="NZD">
                                $ New Zealand Dollar
                            </option>
                            <option value="PHP">
                                PHP Philippine Piso
                            </option>
                            <option value="PLN">
                                zł Polish Zloty
                            </option>
                            <option value="RON">
                                RON Romanian Leu
                            </option>
                            <option value="RUB">
                                RUB Russian Rouble
                            </option>
                            <option value="SEK">
                                SEK Swedish Krona
                            </option>
                            <option value="SGD">
                                SGD Singapore Dollar
                            </option>
                            <option value="THB">
                                THB Thai Baht
                            </option>
                            <option value="TRY">
                                TRY Turkish Lira
                            </option>
                            <option value="ZAR">
                                ZAR South African Rand
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <Footer />
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

export default Donate;