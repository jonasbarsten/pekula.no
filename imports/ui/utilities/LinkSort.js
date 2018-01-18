import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

class LinkSort extends Component {

	onSortEnd({oldIndex, newIndex}) {
		const newOrder = arrayMove(this.props.items, oldIndex, newIndex)
		this.props.reorder(newOrder);
	}

	render () {

		const SortableItem = SortableElement(({value}) =>
			<div className={this.props.itemClass} onClick={() => this.props.onClick(value)}><p>{value.name}</p></div>
		);

		const SortableList = SortableContainer(({items}) => {
			return (
				<div className="row">
					{items.map((value, index) => (
						<SortableItem key={`item-${index}`} index={index} value={value} />
					))}
				</div>
			);
		});

		return (
			<div>
				<div className="text-center">
					<p>Click link to delete, drag to reorder</p>
				</div>
				<SortableList axis="xy" distance={5} items={this.props.items} onSortEnd={this.onSortEnd.bind(this)} />
			</div>
		);
	}
}

export default LinkSort;