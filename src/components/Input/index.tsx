export const Input = (props: { colour: string } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <input 
            className={[
                "mt-12",
                "appearance-none",
                "outline-none",
                "w-96",
                "px-4",
                "py-2",
                "bg-gray6",
                "border-transparent",
                "border-2",
                `focus:border-${props.colour}`,
                `focus:bg-transparent`,
                "transition-all",
            ].join(" ")} 
            {...props}
        ></input>
    )
}