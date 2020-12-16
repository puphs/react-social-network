import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

const App = (props) => {
	return (
		<BrowserRouter>
			<div className="container">
				<Header />
				<Sidebar />
				<div className="content">
					<Switch>
						<Route
							path="/profile"
							render={() => (
								<Profile profilePage={props.state.profilePage} dispatch={props.dispatch} />
							)}
						/>
						<Route
							path="/dialogs"
							render={() => (
								<Dialogs dialogsPage={props.state.dialogsPage} dispatch={props.dispatch} />
							)}
						/>
						<Route path="/news" component={News} />
						<Route path="/music" component={Music} />
						<Route path="/settings" component={Settings} />
						<Redirect from="/" to="/profile" />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
