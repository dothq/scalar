import React from "react"

export const Keybind = ({ keys }: { keys: string[] }) => {
    return (
        <kbd className={"text-base h-full mx-1"}>
            {keys.map((k, i) => {
                return (
                    <React.Fragment key={i}>
                        <span key={i} className={"bg-white border border-gray6 shadow px-2 py-1 rounded-md"}>{k}</span>
                        {keys[i+1] && <span key={`+${i}`} className={"mx-1"}>+</span>}
                    </React.Fragment>
                )
            })}
        </kbd>
    )
}