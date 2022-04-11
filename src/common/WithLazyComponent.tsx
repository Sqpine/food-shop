import React, { Suspense } from 'react';
import {Preloader} from "./Preloader/Preloader";

export function withLazyComponent <WCP>(LazyComponent: React.ComponentType<WCP>){
    return (props: WCP) => (
        <Suspense fallback={<Preloader/>}>
            <LazyComponent {...props} />
        </Suspense>
    )
}