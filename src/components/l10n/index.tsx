import React from 'react';
import l10nController from '../../l10n'

export const L10n = (attributes: any) => {
    const attrs: any = Object.fromEntries(Object.entries(attributes).filter(e => e[0] !== 'children'))
    const str = l10nController.hydrate(attributes.children, attrs);

    return (
        <>
            {str}
        </>
    )
}