import {useEffect} from "react";

export function useOnClickOutside(ref: any, handler: any) {
    useEffect(() => {
            const listener = (event: any) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document?.addEventListener('click', listener);
            document?.addEventListener('touchstart', listener);
            return () => {
                document?.removeEventListener('click', listener);
                document?.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}