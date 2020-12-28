import s from './FormControls.module.css';
import cn from 'classnames';

export const TextArea = ({ input, meta, ...props }) => {
	return (
		<div className={cn(s.formControlTextAreaContainer, meta.touched && meta.error && s.error)}>
			{meta.touched && meta.error && (
				<div className={cn(s.errorText, s.textAreaErrorText)}>{meta.error}</div>
			)}
			<textarea {...input} {...props}></textarea>
		</div>
	);
};

export const Input = ({ input, meta, ...props }) => {
	return (
		<div className={cn(s.formControlInputContainer, meta.touched && meta.error && s.error)}>
			{meta.touched && meta.error && (
				<div className={cn(s.errorText, s.inputErrorText)}>{meta.error}</div>
			)}
			<input {...input} {...props} />
		</div>
	);
};
