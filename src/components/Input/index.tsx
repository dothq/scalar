import { ThemeColours } from "../../../theme"

export const Input = (props: { colour: string, groupAddon?: any } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <fieldset 
            className={`flex w-96 h-10 input-active focus-within:bg-transparent bg-gray6 items-center focus:border-${props.colour} focus:bg-transparent transition-all`}
            style={({
                "--dot-ui-input-accent": ThemeColours[props.colour].toHex()
            } as any)}
        >
            {props.groupAddon && <div className={`flex items-center justify-center w-10 h-10 bg-${props.colour} font-medium`}>
                {props.groupAddon}
            </div>}
            <input 
                className={[
                    "appearance-none",
                    "outline-none",
                    "flex",
                    "w-full",
                    "h-full",
                    "pl-3",
                    "bg-transparent",
                    ...(props.className?.split("") || [])
                ].join(" ")} 
                {...props}
            ></input>
        </fieldset>
    )
}