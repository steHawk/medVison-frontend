import React from 'react'

function PreLoader() {
    return (
        <div class="d-flex justify-content-center m-5">
            <div class="spinner-border secondary-text" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default PreLoader
