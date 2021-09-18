import { Themes } from "../../utils/theme"

export const Reference = ({ n, theme, className }: { n: number, theme?: number, className?: any }) => {
    return (
        <a title={`See footnote`} className={`hover:text-${theme == Themes.Dark ? `neon` : `blue`}`} href={`#reference-${n}`}>
            <sup className={`text-4xl -top-16`}>{n}</sup>
        </a>
    )
}