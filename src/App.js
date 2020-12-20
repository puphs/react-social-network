import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';

const App = () => {
	return (
		<div className="container">
			<Header />
			<Sidebar />
			<div className="content">
				<Switch>
					<Route path="/profile" render={() => <Profile />} />
					<Route path="/dialogs" render={() => <DialogsContainer />} />
					<Route path="/news" component={News} />
					<Route path="/music" component={Music} />
					<Route path="/settings" component={Settings} />
					<Route path="/users" component={UsersContainer} />
					<Redirect from="/" to="/profile" />
				</Switch>
			</div>
		</div>
	);
};

export default App;
