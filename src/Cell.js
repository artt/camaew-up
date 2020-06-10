import React from 'react';

function Cell({cellData}) {
	return (
		<div className="cell">
			<div className="cell-content">
			{
				cellData.stack.slice(0).reverse().map((x) => {
					return(<div className={`token-${x+1}`}>{x}<br /></div>)
				})
			}
			</div>
		</div>
	);
}

export default Cell;