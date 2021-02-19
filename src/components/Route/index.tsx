import React, { useContext } from 'react'
import queryString from 'query-string'

import { Route as DefaultRoute, Redirect } from 'react-router-dom'


import { RouteProps } from 'react-router-dom'
import { GlobalContext } from '../../Utils/Context/GlobalContext'

interface Props extends RouteProps {
    type?: 'authenticated' | 'notAuthenticated'
}

const Route: React.FC<Props> = ({ type, location, ...props }) => {
    const { authenticated } = useContext(GlobalContext)
    const query = location && location.pathname !== '/' && location.search.length > 0 ? queryString.parse(location.search) : null

    if (query) {
        if (query.has_logged_out) return <Redirect to="/login" />
        else if (query.redirectUrl && authenticated) return <Redirect to={query.redirectUrl as string} />
    }

    return authenticated !== null ? (
        type === 'notAuthenticated' && authenticated ? (
            <Redirect to="/" />
        ) : type === 'authenticated' && !authenticated ? (
            <Redirect to={`/login${location && location.pathname !== '/' ? `?redirectUrl=${location.pathname}` : ''}`} />
        ) : (
                    <DefaultRoute {...props} />
                )
    ) : null
}

export default Route
