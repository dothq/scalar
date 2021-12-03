import { HollowButton, HollowButtonProps } from './Hollow'

export const TextButton = (props: HollowButtonProps) => (
    <HollowButton 
        {...props} 
        rippleOpacity={0} 
        reset={true}
        className={`font-bold text-${props.colour} ${props.className || ""}`}
    >
        {props.children}
    </HollowButton>
)