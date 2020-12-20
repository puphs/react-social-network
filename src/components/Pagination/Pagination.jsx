import s from './Pagination.module.css';

const Pagination = (props) => {
	const maxVisiblePagesCount = Math.max(props.maxVisiblePagesCount || 9, 9);
	let pagesCount = Math.min(props.totalPagesCount, maxVisiblePagesCount);
	pagesCount = pagesCount >= 0 ? pagesCount : 0;

	const firstPage = 1;
	const lastPage = props.totalPagesCount;

	const maxSideVisible = Math.floor((maxVisiblePagesCount - 2) * 0.5);

	let leftFreeSpace = Math.min(props.currentPage - firstPage - 1, maxSideVisible);
	let rightFreeSpace = Math.min(props.totalPagesCount - 1 - props.currentPage, maxSideVisible);

	let fromPage = Math.max(
		props.currentPage - leftFreeSpace + rightFreeSpace - maxSideVisible,
		firstPage + 1
	);
	let toPage = Math.min(
		props.currentPage +
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

	const pagesElements = pages.map((page) => {
		if (page === '...') {
			return <div className={s.dots}>...</div>;
		} else if (typeof page === 'number') {
			return (
				<div
					className={s.page + ' ' + (props.currentPage === page && s.page_active)}
					onClick={() => props.setCurrentPage(page)}
				>
					{page}
				</div>
			);
		}
	});

	return <div className={s.pagination}>{pagesElements}</div>;
};

export default Pagination;
