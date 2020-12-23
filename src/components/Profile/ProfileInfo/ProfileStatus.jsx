import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
	state = {
		editMode: false,
	};

	onStatusTextClick = () => {
		this.setState({
			editMode: true,
		});
	};

	onStatusInputBlur = () => {
		console.log('blur :>> ');
		this.setState({
			editMode: false,
		});
	};

	render() {
		return (
			<div className={s.statusContainer}>
				{this.state.editMode ? (
					<input
						className={s.statusInput}
						autoFocus={true}
						onBlur={this.onStatusInputBlur}
						value={this.props.status}
					/>
				) : (
					<div className={s.status} onDoubleClick={this.onStatusTextClick}>
						{this.props.status}
					</div>
				)}
			</div>
		);
	}
}

export default ProfileStatus;
