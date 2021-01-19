import cn from 'classnames';
import { WrappedFieldProps } from 'redux-form';
import s from './FormControls.module.css';

export const TextArea = <P extends {}>({ input, meta, ...props }: P & WrappedFieldProps) => (
	<div className={cn(s.formControlTextAreaContainer, meta.touched && meta.error && s.error)}>
		{meta.touched && meta.error && (
			<div className={cn(s.errorText, s.textAreaErrorText)}>{meta.error}</div>
		)}
		<textarea {...input} {...props}></textarea>
	</div>
);

export const Input = <P extends {}>({ input, meta, ...props }: P & WrappedFieldProps) => {
	return (
		<div className={cn(s.formControlInputContainer, meta.touched && meta.error && s.error)}>
			{meta.touched && meta.error && (
				<div className={cn(s.errorText, s.inputErrorText)}>{meta.error}</div>
			)}
			<input {...input} {...props} />
		</div>
	);
};
