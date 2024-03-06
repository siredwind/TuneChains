import React from 'react';
import BlockSpinner from '../common/Effects/BlockSpinner/BlockSpinner';

const LoadingDialogOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050
};

const LoadingDialog = ({ text }) => (
    <div style={LoadingDialogOverlayStyle}>
        <BlockSpinner size={30} />

        <p className="text-white mt-5">
            {text} ...
        </p>
    </div>
);

export default LoadingDialog;
