import { h, Component } from 'preact';
import { route } from 'preact-router';
import { withAuth } from '../../lib/auth';
import style from './style';

export default withAuth(class Profile extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		if(this.props.auth.isAuthenticated()){
			this.state = {
				user: this.props.auth.getCurrentUser()
			};
		}else{
			return route('/login/');
		}
	}

	// Note: `user` comes from the URL, courtesy of our router
	render(props, { user }) {
		return (
			user ?
			<div class={style.profile}>
				<h3 class={style.heading}>Profile</h3>
				<ul>
					<li>
						<span class={style.key}>Name:</span>
						<span class={style.value}>{user.claims.name}</span>
					</li>
					<li>
						<span class={style.key}>Email:</span>
						<span class={style.value}>{user.claims.email}</span>
					</li>
				</ul>
			</div> :
			null
		);
	}
})