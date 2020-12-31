import React, { FocusEvent, KeyboardEvent, useEffect, useState } from 'react';
import s from './ProfileStatus.module.css';
import cn from 'classnames';
type PropsType = {
	status: string;
	isMyProfile: boolean;
	updateStatus: (status: string) => void;
};

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const onStatusInputChange = (e: FocusEvent<HTMLInputElement>) => {
		setStatus(e.target.value);
	};

	const onStatusInputBlur = () => {
		finishEditing();
	};

	const onStatusInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
					<div className={cn(s.status, props.status === '' && s.status_empty)}>
						{props.status || 'Write something...'}
					</div>
					{props.isMyProfile && <button className={s.editBtn} onClick={onEditBtnClick}></button>}
				</>
			)}
		</div>
	);
};

export default ProfileStatusWithHooks;
