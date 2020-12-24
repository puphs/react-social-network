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
import Login from './components/Login/Login';
import LoginContainer from './components/Login/LoginContainer';

const App = () => {
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
};

export default App;
