// import spinner  from './spinner.svg
import {ReactComponent as spinner} from '../../resources/icons/spinner.svg';
// console.log(spinner);

const Spinner = () => {
    return <img style={{minHeight: '200px', margin: 'auto'} } src={spinner} alt="spinner" />;
}

export default Spinner;