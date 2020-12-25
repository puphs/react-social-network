import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status,
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status)
			this.setState({
				status: this.props.status,
			});
	}

	onEditBtnClick = () => {
		this.setState({
			editMode: true,
		});
	};

	onStatusInputBlur = () => {
		this.setState({
			editMode: false,
		});
		if (this.state.status != this.props.status) this.props.updateStatus(this.state.status);
	};

	onStatusInputChange = (e) => {
		this.setState({
			status: e.currentTarget.value,
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
						onChange={this.onStatusInputChange}
						value={this.state.status}
					/>
				) : (
					<>
						<div className={s.status}>{this.state.status || '--'}</div>
						<button className={s.editBtn} onClick={this.onEditBtnClick}></button>
					</>
				)}
			</div>
		);
	}
}

export default ProfileStatus;
