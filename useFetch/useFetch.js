import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
    const isMounted = useRef(true); // check if component is mounted
    const [state, setState] = useState({ data: null, loading: true, error: null})
    
    useEffect( () => {
        return () => {
            isMounted.current = false;
        }
    }, [])
    // se ejecuta cada vez que cambia la url
    useEffect( () => {
        setState({
            loading: true,
            error: null,
            data: null
        })

        fetch(url)
            .then(res => res.json())
            .then( data => {
                // con el siguiente if se valida si el componente aún esta montado
                if(isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
            })
    }, [url]);

    return state;
}
