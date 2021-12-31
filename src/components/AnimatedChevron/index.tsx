import React from "react";
import { ArrowTop } from "../../icons/ArrowTop";

export const AnimatedChevron = ({ size }: { size?: number }) => (
    <ArrowTop className={`transform rotate-90 w-${size || 3} h-${size || 3} -translate-x-1 group-hover:translate-x-0 transition-all`}></ArrowTop>
)