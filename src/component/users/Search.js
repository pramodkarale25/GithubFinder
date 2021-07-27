import { Component, Fragment } from "react";
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.SetAlert();
        }
        else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    }

    render() {

        const { ShowClear, ClearUsers } = this.props;
        const { text } = this.state;

        return (
            <Fragment>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type='text' value={text} name='text' onChange={this.onChange} placeholder='Search Users' />
                    <input type='submit' className='btn btn-dark btn-block' value='Search'></input>
                </form>
                {ShowClear && (<input type='button' value='Clear' className='btn btn-light btn-block' onClick={ClearUsers}></input>)}
            </Fragment>
        );
    }
}

export default Search;