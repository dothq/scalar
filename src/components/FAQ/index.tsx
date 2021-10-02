import { useID } from "@dothq/id";
import Link from "next/link";
import React from "react";
import { useRipple } from "react-use-ripple";
import { ThemeColours } from "../../../theme";
import { ChevronDown } from "../../icons/ChevronDown";
import { Themes } from "../../utils/theme";

const FAQItem = ({ text, theme }: { text: string, theme?: number }) => {
    const onAccordianShow = (e: any) => {
        if(!e.target.checked) return;

        setTimeout(() => {
            e.target.parentNode.scrollIntoView(true)
        }, 200);
    };

    const ref = React.createRef<HTMLLabelElement>();
    useRipple(ref, { animationLength: 300, rippleColor: theme == Themes.Dark ? ThemeColours.Black.toHex(0.3) : ThemeColours.White.toHex(0.3) });

    const id = `faq-section-${useID(2)}`;

    return (
        <>
            <input type="checkbox" id={id} onChange={onAccordianShow} />
            <label 
                htmlFor={id}
                ref={ref}
                className={`flex items-center px-6 w-full h-32 text-3xl justify-between transition-all ${theme == Themes.Dark ? `hover:bg-white hover:text-black` : `hover:bg-black hover:text-white`}`}
            >
                <span>
                    {text}
                </span>

                <ChevronDown width={24} height={24} stroke={"currentColor"} className={"transition-transform"} />
            </label>
        </>
    )
}

export const FAQAccordian = ({ theme }: { theme?: number }) => {
    return (
        <div className={"flex flex-col gap-2 mt-6"}>
            <div className={"accordian-item mt-2"}>
                <FAQItem theme={theme} text={"What is Dot Browser?"} />

                <div className={"accordian-content text-2xl"}>
                    <div className={`p-6 ${theme == Themes.Dark ? `text-gray6` : `text-gray3`} flex flex-col gap-6`}>
                        <span>
                            Dot Browser is a privacy-focused web browser with a built-in ad
                            blocker and tracker blocker to stop sneaky trackers and ads following
                            you around the internet.
                        </span>

                        <span>
                            It also features a refreshing user interface that is simple and easy
                            on the eyes.
                        </span>

                        <span>
                            Our goal is to make your privacy matter and hopefully Dot brings you
                            a step closer to that.
                        </span>

                        <strong>Privacy is a right. Not a privilage.</strong>

                        <span className={"flex flex-col gap-6"}>
                            You can learn more about our web browser through these links:

                            <ul className={"flex flex-col gap-2"}>
                                <li>
                                    <Link href={"/browser"}>
                                        <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}>
                                            Download
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/browser/features"}>
                                        <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}>
                                            Features
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/browser/comparison"}>
                                        <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}>
                                            Comparison
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/browser/whats-new"}>
                                        <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}>
                                            What's New
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>

            <div className={"accordian-item"}>
                <FAQItem theme={theme} text={"Is Dot Browser based on Chrome?"} />

                <div className={"accordian-content text-2xl"}>
                    <div className={`p-6 ${theme == Themes.Dark ? `text-gray6` : `text-gray3`} flex flex-col gap-6`}>
                        <strong>Nope, Dot Browser is based on Firefox.</strong>
                        
                        <span>
                            We decided to go with Firefox as the base for Dot Browser because
                            there are already a plethora of Chromium-based web browsers out
                            there, and we want to stand out among the others.
                        </span>

                        <span>
                            Furthermore, by using a Chromium-based browser like Brave or Chrome
                            you are contributing to Google's massive monopoly and it allows them
                            to hold the entire browser market.
                        </span>
                        
                        <span>
                            <a
                                target={"_blank"}
                                href="https://siasky.net/PAC1yX5eytS0iJRCqcdu0QnI1DBIoILUEGYA7judB5JBdA"
                                className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}
                            >
                                Imagine a world where everything is Chromium-based.
                            </a>
                        </span>
                    </div>
                </div>
            </div>

            <div className={"accordian-item"}>
                <FAQItem theme={theme} text={"What platforms support Dot Browser?"} />

                <div className={"accordian-content text-2xl"}>
                    <div className={`p-6 ${theme == Themes.Dark ? `text-gray6` : `text-gray3`} flex flex-col gap-6`}>
                        <span>
                            As of right now,{' '}
                            <strong>
                            Dot Browser is supported on Windows, macOS and Linux.
                            </strong>
                        </span>

                        <span>
                            If you are looking for more specific system requirements for Dot
                            Browser, please check our{' '}
                            <Link href={"/browser/system-requirements"}>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}>
                                    system requirements page
                                </a>
                            </Link>
                            .
                        </span>
                    </div>
                </div>
            </div>

            <div className={"accordian-item"}>
                <FAQItem theme={theme} text={"How is Dot Browser more private than other browsers?"} />
            
                <div className={"accordian-content text-2xl"}>
                    <div className={`p-6 ${theme == Themes.Dark ? `text-gray6` : `text-gray3`} flex flex-col gap-6`}>
                        
                    </div>
                </div>
            </div>

            <div className={"accordian-item"}>
                <FAQItem theme={theme} text={"Is there anywhere I can donate to help you financially?"} />
            
                <div className={"accordian-content text-2xl"}>
                    <div className={`p-6 ${theme == Themes.Dark ? `text-gray6` : `text-gray3`} flex flex-col gap-6`}>
                        <strong>Yes!</strong>
                        
                        <span>
                            You can send donations to us by heading over to our{" "}
                            <Link href={"/donate"}>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`}>
                                    donations page
                                </a>
                            </Link>
                            .
                        </span>
                        
                        <span>
                            We appreciate anything big or small as it helps to fund our
                            services and servers and keep us going!
                        </span>
                    </div>
                </div>
            </div>

            <div className={"accordian-item"}>
                <FAQItem theme={theme} text={"I have a question about Dot Browser and or where can I find support?"} />
                
                <div className={"accordian-content text-2xl"}>
                    <div className={`p-6 ${theme == Themes.Dark ? `text-gray6` : `text-gray3`} flex flex-col gap-6`}>
                        <span>
                            Hopefully our FAQ answered one of your questions. However if it did
                            not, we would be happy to answer your questions on our social
                            channels.
                        </span>
                        
                        <ul className={"flex flex-col gap-2"}>
                            <li>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`} target={'_blank'} href="https://dothq.link/dsc">
                                    Dot Community Discord Server
                                </a>
                            </li>
                            <li>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`} target={'_blank'} href="https://dothq.link/matrix">
                                    Dot Community Matrix Room
                                </a>
                            </li>
                            <li>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`} target={'_blank'} href="https://twitter.com/DotBrowser">
                                    @DotBrowser on Twitter
                                </a>
                            </li>
                            <li>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`} target={'_blank'} href="https://github.com/dothq">
                                    Discussions on GitHub
                                </a>
                            </li>
                            <li>
                                <a className={`${theme == Themes.Dark ? `text-neon hover:bg-neon hover:text-black` : `text-blue hover:bg-blue hover:text-white`} font-medium transition-all`} target={'_blank'} href="https://support.dothq.co">
                                    Get Help at our Support Centre
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}