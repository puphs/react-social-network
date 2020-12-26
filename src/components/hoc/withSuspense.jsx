import { Suspense } from 'react';
import Preloader from '../Preloader/Preloader';

export const withSuspense = (Component, props) => {
	return (
		<Suspense fallback={<Preloader />}>
			<Component {...props} />
		</Suspense>
	);
};
