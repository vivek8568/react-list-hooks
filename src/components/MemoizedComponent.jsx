import React, {memo} from 'react';

export const MemoizedComponent = (Comp, displayName) => {
    const Component = memo(Comp);
    Component.displayName = displayName;
    return Component;
};