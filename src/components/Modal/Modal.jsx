import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({ children, onClose }) {
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown); 
        }
    }, [onClose]);
    
    

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }
    
    return createPortal(
            <div className={css.overlay} onClick={handleBackdropClick}>
                <div className={css.modal}>
                    {children}
                </div>
            </div>,
            modalRoot,
        );
    };

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};