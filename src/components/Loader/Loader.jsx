import { RevolvingDot } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.loader}>
            <RevolvingDot            
            />
        </div>
    );
};

export default Loader;