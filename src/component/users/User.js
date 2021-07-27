import { Component, Fragment } from "react";
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'

class User extends Component {
    static propTypes =
        {
            loading: PropTypes.bool.isRequired,
            getUser: PropTypes.func.isRequired,
            getUserRepos: PropTypes.func.isRequired,
            user: PropTypes.object.isRequired,
            repos: PropTypes.array.isRequired,
        }

    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    render() {

        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;

        const { repos, loading } = this.props;

        if (loading) return <Spinner></Spinner>

        return <Fragment>
            <p><Link to='/' className='btn btn-dark'>Back to search</Link></p>
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }}></img>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>}
                    <a href={html_url} className='btn btn=dark my-1'>Visit Github Profile</a>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos}></Repos>
        </Fragment>
    }
}

export default User;