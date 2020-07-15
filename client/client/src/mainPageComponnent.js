import React from 'react';
import Posts from './postsComponnent/postsComponnent';
import UploadButtonCommponnent from './UploadComponnent/uploadButtonCommponnent';

function MainPage(props) {
    return (
        <div>
            <Posts url={props.url} />
            <UploadButtonCommponnent />
        </div>
    );
}

export default MainPage;