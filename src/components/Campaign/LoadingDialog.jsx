import React from 'react';
import { motion } from 'framer-motion';

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
    zIndex: 1050, // Ensure it's above other content
};

// Chain block style
const blockStyle = {
    width: '16px',
    height: '16px',
    backgroundColor: '#3498db',
    margin: '2px',
};

const spinnerVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            ease: "linear",
            repeat: Infinity,
        },
    },
};

const LoadingDialog = () => (
    <div style={LoadingDialogOverlayStyle}>
        <motion.div
            animate="animate"
            variants={spinnerVariants}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Create a "chain" of blocks */}
            <div style={blockStyle}></div>
            <div style={blockStyle}></div>
            <div style={blockStyle}></div>
            <div style={blockStyle}></div>
            {/* You can add more blocks or adjust the styling to your liking */}
        </motion.div>
        <p className="text-white mt-5">Processing...</p>
    </div>
);

export default LoadingDialog;
