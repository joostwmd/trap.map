import React from 'react'
import {Link} from 'react-router-dom'
function Nav() {
    return (
        <div>
            <Link to="/">
                <button>home</button>
            </Link>

            <Link to="/profile">
                <button>artist</button>
            </Link>

            <Link to="/map">
                <button>map</button>
            </Link>

            <Link to="/profile">
                <button disabled>profile</button>
            </Link>
        </div>
    )
}

export default Nav
