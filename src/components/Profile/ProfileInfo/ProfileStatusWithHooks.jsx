import React, { useEffect, useState } from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const onStatusInputChange = (e) => {
		setStatus(e.target.value);
	};

	const onStatusInputBlur = () => {
		finishEditing();
	};

	const onStatusInputKeyPress = (e) => {
		if (e.key === 'Enter') finishEditing();
	};

	const finishEditing = () => {
		setEditMode(false);
		props.updateStatus(status);
	};

	const onEditBtnClick = () => {
		setEditMode(true);
	};

	return (
		<div className={s.statusContainer}>
			{editMode ? (
				<input
					className={s.statusInput}
					autoFocus={true}
					onBlur={onStatusInputBlur}
					onKeyPress={onStatusInputKeyPress}
					onChange={onStatusInputChange}
					value={status}
				/>
			) : (
				<>
					<div className={s.status}>{props.status || ''}</div>
					{props.isMyProfile && <button className={s.editBtn} onClick={onEditBtnClick}></button>}
				</>
			)}
		</div>
	);
};

export default ProfileStatusWithHooks;
