import s from './ErrorNotification.module.css';
import cn from 'classnames';
import { connect } from 'react-redux';

const ErrorNotification = ({ error, shown }) => {
	return (
		<div className={cn(s.errorContainer, 'shadowBase', !shown && s.errorContainer_hidden)}>
			<div className={s.errorMessage}>{error ?? 'Some error occured'}</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	shown: state.app.errorShown,
	error: state.app.errorText,
});

export default connect(mapStateToProps, {})(ErrorNotification);
