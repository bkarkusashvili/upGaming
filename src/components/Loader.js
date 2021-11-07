import './Loader.scss';


const Loader = ({ isLoading, children }) => {

    if (isLoading) return (<div className="lds-hourglass">Loading...</div>)

    return children;
};

export default Loader;