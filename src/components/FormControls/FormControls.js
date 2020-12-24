import s from './FormControls.module.css';

export const TextArea = ({ input, meta, ...props }) => {
	return (
		<div class={s.formControlTextAreaContainer + ' ' + (meta.touched && meta.error && s.error)}>
			{meta.touched && meta.error && (
				<div className={s.errorText + ' ' + s.textAreaErrorText}>{meta.error}</div>
			)}
			<textarea {...input} {...props}></textarea>
		</div>
	);
};

export const Input = ({ input, meta, ...props }) => {
	return (
		<div className={s.formControlInputContainer + ' ' + (meta.touched && meta.error && s.error)}>
			{meta.touched && meta.error && (
				<div className={s.errorText + ' ' + s.inputErrorText}>{meta.error}</div>
			)}
			<input {...input} {...props} />
		</div>
	);
};
