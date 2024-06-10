import React, {ReactComponentElement} from 'react';

export const WithSuspense = (Component:React.FunctionComponent) => {
    return (props:any) => {
        return (
            <React.Suspense fallback={<div>Loading ...</div>}>
                <Component {...props} />
            </React.Suspense>
        );
    }
}