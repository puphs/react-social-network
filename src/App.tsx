import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { connect, Provider } from 'react-redux';
import { initialize, showAndHideError } from './redux/appReducer';
import Preloader from './components/Preloader/Preloader';
import store, { AppStateType } from './redux/reduxStore';
import { withSuspense } from './components/hoc/withSuspense';
import ErrorNotification from './components/ErrorNotification/ErrorNotification';
import Login from './components/Login/Login';
import Users from './components/Users/Users';

// lazy loading
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

type MapStatePropType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropType = {
	initialize: () => void;
	showAndHideError: (errorText: string) => void;
};

const SuspendedDialogsContainer = withSuspense(DialogsContainer);

class App extends React.Component<MapStatePropType & MapDispatchPropType> {
	componentDidMount() {
		this.props.initialize();
	}
	render() {
		if (!this.props.initialized) return <Preloader />;
		return (
			<div className="container">
				<Header />
				<Sidebar />
				<ErrorNotification />
				<div className="content">
					<Switch>
						<Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
						<Route path="/dialogs/:dialog?" render={() => <SuspendedDialogsContainer />} />
						<Route path="/news" render={withSuspense(News)} />
						<Route path="/music" render={withSuspense(Music)} />
						<Route path="/settings" render={() => withSuspense(Settings)} />
						<Route path="/users:page?" render={() => <Users />} />
						<Route path="/login" render={() => <Login />} />
						<Redirect from="/" to="/profile" />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized,
});
const AppContainer = connect(mapStateToProps, { initialize, showAndHideError })(App);

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
