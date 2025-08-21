import { MoonLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <>
      <p className={css.text}>Loading movies, please wait...</p>
      <MoonLoader className={css.loader} color="#2acd48ff" />
    </>
  );
};

export default Loader;