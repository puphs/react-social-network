import preloader from '../../assets/images/preloader.svg';
import s from './Preloader.module.css';

const Preloader = () => {
	return (
		<div className={s.container}>
			<img className={s.preloader} src={preloader} />
		</div>
	);
};

export default Preloader;
