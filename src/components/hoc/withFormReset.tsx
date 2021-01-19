import React, { Dispatch, ReactElement } from 'react';
import { Action } from 'redux';
import { InjectedFormProps, reduxForm, reset } from 'redux-form';

type Props<FormValuesType> = {
	Form: React.FC<InjectedFormProps<FormValuesType, {}>>;
	formName: string;
};

type OnSubmitType = (formData: any, dispatch?: Dispatch<Action>) => void;

const withFormReset = <FormValuesType extends {}>(
	Form: React.FC<InjectedFormProps<FormValuesType, {}>>,
	formName: string,
	onSubmit: OnSubmitType,
	shouldResetForm: (formData: any) => boolean
): ReactElement<Props<OnSubmitType>> => {
	const handleSubmit = (formData: FormValuesType, dispatch: (action: Action) => void) => {
		onSubmit(formData, dispatch);
		if (shouldResetForm(formData)) dispatch(reset(formName));
	};

	const ReduxForm = reduxForm<FormValuesType>({ form: formName })(Form);

	return <ReduxForm onSubmit={handleSubmit} />;
};

export default withFormReset;
