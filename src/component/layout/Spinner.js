import { Fragment } from "react"
import SpinnerImg from './spinner.gif'

const Spinner = () => <Fragment>
    <img src={SpinnerImg} alt='loading...' style={{ width: '200px', margin: 'auto', display: 'block' }} />
</Fragment>


export default Spinner;