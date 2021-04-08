import React from "react";
import { StyledIcon } from "./style";

export const Icon = ({ i, size, lsp, rsp }: { i: string; size?: number; lsp?: number, rsp?: number }) => (
    <StyledIcon icon={i} size={size || 16} lsp={lsp} rsp={rsp}>
    </StyledIcon>
)