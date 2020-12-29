import { reduxForm, reset } from 'redux-form';

const withFormReset = (Form, formName, onSubmit, ...props) => {
	const handleSubmit = (formData, dispatch) => {
		onSubmit(formData, dispatch);
		dispatch(reset(formName));
	};

	const ReduxForm = reduxForm({ form: formName })(Form);

	return <ReduxForm onSubmit={handleSubmit} {...props} />;
};

export default withFormReset;
