import './Loader.css'

const Loader = ({ light=false }) => {
    return (
        <div className={light ? 'loader loader-light' : 'loader'} />
    )
}

export default Loader