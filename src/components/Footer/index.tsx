import { useRouter } from "next/router"
import Link from "next/link"
import React from "react"
import { Discord } from "../../icons/Discord"
import { GitHub } from "../../icons/GitHub"
import { Matrix } from "../../icons/Matrix"
import { Reddit } from "../../icons/Reddit"
import { Twitter } from "../../icons/Twitter"
import { Themes } from "../../utils/theme"
import { LangPicker } from "../LangPicker"
import { Logo } from "../Logo"
import { useTranslations } from "next-intl"

export const Footer = ({ theme }: { theme?: number }) => {
    const t = useTranslations("");

    const { locale } = useRouter();

    return (
        <footer className={`w-full flex justify-center md:px-8 sm:px-8 px-4 ${theme == Themes.Dark ? `bg-black text-white` : `bg-gray7 text-black`} z-50`}>
            <div className={"max-w-7xl w-full py-28"}>
                <ul className={"flex gap-24 flex-wrap"}>
                    <li className={"w-64 md:w-48"}>
                        <ul className={"flex flex-col gap-2"}>
                            <li className={"mb-2"}>
                                <span className={"font-bold text-xl"}>{t("footer-explore-section")}</span>
                            </li>
                            <li>
                                <Link href={"/"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-explore-section-home")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/about"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-explore-section-about")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/blog"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-explore-section-blog")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/donate"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-explore-section-donate")}</a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={"w-64 md:w-48"}>
                        <ul className={"flex flex-col gap-2"}>
                            <li className={"mb-2"}>
                                <span className={"font-bold text-xl"}>{t("footer-learn-section")}</span>
                            </li>
                            <li>
                                <Link href={"/faq"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-learn-section-faq")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/support"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-learn-section-support")}</a>
                                </Link>
                            </li>
                            <li>
                                <a target={"_blank"} href={"https://docs.dothq.co"} className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-learn-section-documentation")}</a>
                            </li>
                        </ul>
                    </li>

                    <li className={"w-64 md:w-48"}>
                        <ul className={"flex flex-col gap-2"}>
                            <li className={"mb-2"}>
                                <span className={"font-bold text-xl"}>{t("footer-products-section")}</span>
                            </li>
                            <li>
                                <Link href={"/browser"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>Desktop</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/android"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>Android</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/one"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>Dot One</a>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={"w-64 md:w-48"}>
                        <ul className={"flex flex-col gap-2"}>
                            <li className={"mb-2"}>
                                <span className={"font-bold text-xl"}>{t("footer-legal-section")}</span>
                            </li>
                            <li>
                                <Link href={"/about/privacy"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-legal-section-privacy")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/about/terms"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>{t("footer-legal-section-terms")}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/about/gdpr"}>
                                    <a className={"text-lg text-blue font-medium hover:bg-blue hover:text-white"}>GDPR</a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className={"w-full flex justify-between pt-14 mt-14 flex-wrap gap-10 border-t-2 border-gray6"}>
                    <div className={"flex flex-col gap-6 items-start"}>
                        <Logo linked />
                        <span className={"text-sm"}>{t("footer-copyright-notice", { year: new Date().getFullYear() })}</span>
                    </div>
                    <div className={"flex flex-row gap-6 md:items-center md:justify-end"}>
                        <LangPicker menuTop={"-422px"} locale={locale} />

                        <a target={"_blank"} title={"Discord"} className={"text-gray3 hover:text-discord transition-all"} href={"https://discord.gg/WRDEK2D"}>
                            <Discord className={"fill-current"} />
                        </a>

                        <a target={"_blank"} title={"Twitter"} className={"text-gray3 hover:text-twitter transition-all"} href={"https://twitter.com/DotBrowser"}>
                            <Twitter className={"fill-current"} />
                        </a>

                        <a target={"_blank"} title={"GitHub"} className={"text-gray3 hover:text-github transition-all"} href={"https://github.com/dothq"}>
                            <GitHub className={"fill-current"} />
                        </a>

                        <a target={"_blank"} title={"Reddit"} className={"text-gray3 hover:text-reddit transition-all"} href={"https://reddit.com/r/dothq"}>
                            <Reddit className={"fill-current"} />
                        </a>

                        <a target={"_blank"} title={"Matrix"} className={"text-gray3 hover:text-matrix transition-all"} href={"https://matrix.to/#/#dothq:matrix.org"}>
                            <Matrix className={"fill-current"} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    )
}