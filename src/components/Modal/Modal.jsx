import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }
    
    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot,
        );
    };
};