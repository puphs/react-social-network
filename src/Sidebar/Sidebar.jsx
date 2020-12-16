import s from './Sidebar.module.css';

import Navbar from './Navbar/Navbar';
import BestFriends from './BestFriends/BestFriends';

const Sidebar = () => {
	return (
		<div className={s.sidebar}>
			<Navbar />
			<div className={s.bestFriends}>
				<BestFriends />
			</div>
		</div>
	);
};

export default Sidebar;
