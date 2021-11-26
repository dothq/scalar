import { HollowButton, HollowButtonProps } from './Hollow'

export const TextButton = (props: HollowButtonProps) => (
    <HollowButton 
        {...props} 
        rippleOpacity={0} 
        style={{ padding: 0, backgroundColor: "transparent", ...props.style }} 
        className={`border-none bg-transparent text-${props.colour} ${props.className || ""}`}
    >
        {props.children}
    </HollowButton>
)