import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1150;

  transition: opacity 0.5s ease;
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

const DialogContent = styled.div`
  background-color: #1A202C;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 80%;
  height: auto;
  min-width: 300px;

  transition: transform 0.5s ease, opacity 0.5s ease;
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(-20px)'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const WelcomeDialog = ({ onClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = useCallback((e) => {
        setIsVisible(false);
        setTimeout(() => {
            onClick();
        }, 500);
    }, [onClick]);

    return (
        <DialogOverlay isVisible={isVisible} onClick={handleClose}>
            <DialogContent isVisible={isVisible} onClick={e => e.stopPropagation()}>
                <CloseButton className="mr-1" onClick={onClick}>&times;</CloseButton>
                <div className="background-color: #f2f4f8; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2>Welcome to Tune Chains! 🎵🎉</h2>
                    <hr />
                    <p>
                        Hey there! We're super excited to have you on board. Crowdfunding on Tune Chains is all about empowering artists and uniting music lovers. 🎤💕
                    </p>
                    <p>Here's how you can dive in:</p>
                    <ul>
                        <li><strong>Create a Campaign:</strong> Got a project in mind? Launch your campaign and share your vision! Let the community know what you're all about and what you need to make it happen. 🚀</li>
                        <li><strong>Fund a Campaign:</strong> Explore and back the projects that resonate with you. Your support can turn an artist's dream into reality! Every contribution counts. 💸🎶</li>
                        <li><strong>Track Progress:</strong> Stay updated with the campaigns you've backed. Watch as they reach their milestones, thanks to your support! 📈</li>
                        <li><strong>Close a Campaign:</strong> If you're an artist, you'll have the power to close your campaign once your goal is reached, making your dream project a reality! 🌟</li>
                    </ul>
                    <p>
                        So, what are you waiting for?
                    </p>
                    <p>
                        Start exploring Tune Chains, create, fund, and follow exciting music projects, and be part of a community that's set to revolutionize the music industry! 🎉🎵 
                        Let's create, share, and celebrate music together!
                    </p>
                </div>
            </DialogContent>
        </DialogOverlay>
    )
}

WelcomeDialog.propTypes = {
    onClick: PropTypes.func
};

export default WelcomeDialog;