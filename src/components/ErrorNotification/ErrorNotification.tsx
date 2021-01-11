import s from './ErrorNotification.module.css';
import cn from 'classnames';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';

type PropsType = {
	error: string | null;
	shown: boolean;
};

const ErrorNotification: React.FC<PropsType> = ({ error, shown }) => {
	return (
		<div className={cn(s.errorContainer, 'shadowBase', !shown && s.errorContainer_hidden)}>
			<div className={s.errorMessage}>{error ?? 'Some error occured'}</div>
		</div>
	);
};
const mapStateToProps = (state: AppStateType) => ({
	shown: state.app.errorShown,
	error: state.app.errorText,
});

export default connect(mapStateToProps, {})(ErrorNotification);
