import { NavLink } from 'react-router-dom';
import s from './Pagination.module.css';
import cn from 'classnames';

const Pagination = ({ maxVisiblePagesCount, totalPagesCount, currentPage, basePath }) => {
	maxVisiblePagesCount = maxVisiblePagesCount || 9;
	let pagesCount = Math.min(totalPagesCount, maxVisiblePagesCount);
	pagesCount = pagesCount >= 0 ? pagesCount : 0;
	const firstPage = 1;
	const lastPage = totalPagesCount;

	const maxSideVisible = Math.floor((maxVisiblePagesCount - 2) * 0.5);

	let leftFreeSpace = Math.min(currentPage - firstPage - 1, maxSideVisible);
	let rightFreeSpace = Math.min(totalPagesCount - 1 - currentPage, maxSideVisible);
	let fromPage = Math.max(
		currentPage - leftFreeSpace + rightFreeSpace - maxSideVisible,
		firstPage + 1
	);
	let toPage = Math.min(
		currentPage +
			rightFreeSpace -
			leftFreeSpace +
			maxSideVisible -
			(1 - (maxVisiblePagesCount % 2)),
		lastPage - 1
	);
	let pages = [firstPage];
	if (fromPage !== firstPage + 1) pages.push('...');
	for (let i = fromPage; i <= toPage; i++) {
		pages.push(i);
	}
	if (toPage !== lastPage - 1) {
		pages.push('...');
	}
	pages.push(lastPage);

	let dotsNextKey = -10;
	const pagesElements = pages.map((page) => {
		const dotsKey = dotsNextKey;
		dotsNextKey--;
		if (page === '...') {
			return (
				<div className={s.dots} key={dotsKey}>
					...
				</div>
			);
		} else if (typeof page === 'number') {
			return (
				<NavLink
					className={cn(s.page, currentPage === page && s.page_active)}
					to={basePath + page}
					key={page}
					// onClick={() => setCurrentPage(page)}
				>
					{page}
				</NavLink>
			);
		}
	});
	return <div className={s.pagination}>{pagesElements}</div>;
};

export default Pagination;
