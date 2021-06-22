import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react'

const { Consumer, Provider } = React.createContext();

export default function AuthProvider({children}) {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ user, setUser ] = useState(null);
    const [ session, setSession ] = useSession();

    useEffect(() => {
        if(session) {
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(session.user);
        } else {
            setIsLoggedIn(false);
            setIsLoading(true);
            setUser(null);
        }
    }, [session])

    return (
        <Provider value={{ isLoggedIn, isLoading, user }}>
            {children}
        </Provider>
    )
}

const withAuth = (WrappedComponent) => {
    return function (props) {
        return(
            <Consumer>
                {
                    (value) => {
                        const {isLoggedIn, isLoading, user} = value;

                        return (
                            <WrappedComponent isLoggedIn={isLoggedIn} isLoading={isLoading} user={user} {...props} />
                        )
                    }
                }
            </Consumer>
        )
    }
}

export {AuthProvider, withAuth}
