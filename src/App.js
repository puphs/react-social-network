import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

const App = () => {
	return (
		<BrowserRouter>
			<div className="container">
				<Header />
				<Navbar />
				<div className="content">
					<Switch>
						<Route path="/profile" component={Profile} />
						<Route path="/dialogs" component={Dialogs} />
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
