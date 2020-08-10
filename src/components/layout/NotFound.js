import React, { Fragment } from 'react'

const NotFound = () => {
    return (
        <div className="text-center" style={{ marginTop: '100px' }}>
            <Fragment>
                <h1>Not Found</h1>
                <p className='lead'>page you are looking for does not exists</p>
            </Fragment>
        </div>
    )
}

export default NotFound;