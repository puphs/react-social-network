import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Sidebar from './Sidebar/Sidebar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect } from 'react-redux';
import { initialize } from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
class App extends React.Component {
	componentDidMount() {
		this.props.initialize();
	}
	render() {
		console.log(this.props.initialized);
		if (!this.props.initialized) return <Preloader />;
		return (
			<div className="container">
				<Header />
				<Sidebar />
				<div className="content">
					<Switch>
						<Route path="/profile/:userId?" render={() => <ProfileContainer />} />
						<Route path="/dialogs" render={() => <DialogsContainer />} />
						<Route path="/news" component={News} />
						<Route path="/music" component={Music} />
						<Route path="/settings" component={Settings} />
						<Route path="/users" component={UsersContainer} />
						<Route path="/login" component={LoginContainer} />
						{/* <Redirect from="/" to="/profile" /> */}
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initialize })(App);
