import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { withAuth } from '../../lib/auth';
import style from './style';

export default withAuth(class Header extends Component {
	
	componentWillMount(){
		if(this.props.auth.isAuthenticated()){
			this.setState({
					user: this.props.auth.getCurrentUser()
			});
		}
	}

	render(props, {user}) {
		return (
			<header class={style.header}>
				<h1>Preact App</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Home</Link>
					{user ? <Link activeClassName={style.active} href="/profile">Profile</Link> : null }
					{user 
						? <Link activeClassName={style.active} onClick={props.auth.logout.bind(null, props.history)} role="button">Logout</Link>
						: <Link activeClassName={style.active} onClick={props.auth.login.bind(null, props.history)} role="button">Login</Link>}
					
				</nav>
			</header>
		);
	}
})
