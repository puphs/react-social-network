import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './Sidebar/Sidebar';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect, Provider } from 'react-redux';
import { initialize } from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
import store from './redux/reduxStore';
import { withSuspense } from './components/hoc/withSuspense';

// lazy loading
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
class App extends React.Component {
	componentDidMount() {
		this.props.initialize();
	}
	render() {
		if (!this.props.initialized) return <Preloader />;
		return (
			<div className="container">
				<Header />
				<Sidebar />
				<div className="content">
					<Switch>
						<Route path="/profile/:userId?" render={() => <ProfileContainer />} />
						<Route path="/dialogs" render={() => withSuspense(DialogsContainer)} />
						<Route path="/news" render={() => withSuspense(News)} />
						<Route path="/music" render={() => withSuspense(Music)} />
						<Route path="/settings" render={() => withSuspense(Settings)} />
						<Route path="/users:page?" render={() => <UsersContainer />} />
						<Route path="/login" render={() => <LoginContainer />} />
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
const AppContainer = connect(mapStateToProps, { initialize })(App);

const MainApp = () => {
	return (
		<React.StrictMode>
			<HashRouter>
				<Provider store={store}>
					<AppContainer />
				</Provider>
			</HashRouter>
		</React.StrictMode>
	);
};

export default MainApp;
