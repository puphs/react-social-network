import { Suspense } from 'react';
import Preloader from '../Preloader/Preloader';

export const withSuspense = <P extends {}>(Component: React.ComponentType<P>) => {
	return (props: P) => (
		<Suspense fallback={<Preloader />}>
			<Component {...props} />
		</Suspense>
	);
};
