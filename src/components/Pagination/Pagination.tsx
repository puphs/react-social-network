import { NavLink } from 'react-router-dom';
import s from './Pagination.module.css';
import cn from 'classnames';
import { Fragment } from 'react';

type PropsType = {
	maxVisiblePagesCount: number;
	totalPagesCount: number;
	currentPage: number;
	basePath: string;
};

const Pagination: React.FC<PropsType> = ({
	maxVisiblePagesCount,
	totalPagesCount,
	currentPage,
	basePath,
}) => {
	maxVisiblePagesCount = maxVisiblePagesCount || 9;
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
	let dotsIndexes = new Set();
	if (fromPage !== firstPage + 1) {
		dotsIndexes.add(1);
	}
	for (let i = fromPage; i <= toPage; i++) {
		pages.push(i);
	}
	if (toPage !== lastPage - 1) {
		dotsIndexes.add(toPage);
	}
	pages.push(lastPage);

	const pagesElements = pages.map((page) => {
		const dots = <div className={s.dots}>...</div>;

		const pageLink = (
			<NavLink
				key={page}
				className={cn(s.page, currentPage === page && s.page_active)}
				to={basePath + page}
			>
				{page}
			</NavLink>
		);
		return (
			<Fragment key={page}>
				{pageLink}
				{dotsIndexes.has(page) && dots}
			</Fragment>
		);
	});
	return <div className={s.pagination}>{pagesElements}</div>;
};

export default Pagination;
