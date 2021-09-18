import { Themes } from "../../utils/theme"

export const Reference = ({ n, theme, className }: { n: number, theme?: number, className?: any }) => {
    return (
        <a title={`See footnote`} className={`group`} href={`#reference-${n}`}>
            <sup className={`group-hover:underline text-4xl -top-16`}>{n}</sup>
        </a>
    )
}