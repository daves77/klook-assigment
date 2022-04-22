export const truncateTitle = (title: string) => {
	if (title.length > 15) return `${title.slice(0, 15)} ...`;
	return title;
};

export const cleanTitle = (title: string) => {
	//remove number from title
	const titleSplit = title.split(' ');
	titleSplit.shift();
	return titleSplit.join(' ');
};
