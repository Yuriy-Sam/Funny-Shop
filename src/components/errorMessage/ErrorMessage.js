import error  from '../../resources/img/error.gif';

// position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
const ErrorMessage = () => {
    return <img style={{ boxShadow: "0 0 100px #fff", borderRadius: "20px" ,height: '250px', margin: '0 auto'} } src={error} alt="spinner" />;
}

export default ErrorMessage;