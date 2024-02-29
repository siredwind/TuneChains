import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const BlockSpinner = ({ size = 16 }) => {
    const blockStyle = {
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#3498db',
        margin: `${size * 0.125}px`,
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

    return (
        <motion.div
            animate="animate"
            variants={spinnerVariants}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={blockStyle}></div>
            <div style={blockStyle}></div>
            <div style={blockStyle}></div>
            <div style={blockStyle}></div>
        </motion.div>
    )
}

BlockSpinner.propTypes = {
    size: PropTypes.number,
};

export default BlockSpinner;
