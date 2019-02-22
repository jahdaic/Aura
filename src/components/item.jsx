import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as icons from '../images/icons';

class Item extends Component {
	renderIcon() {

	}
	
	render() {
		const { data, active, payload } = this.props;

		let activeClass = active ? 'active' : '';

		return (
			<div className="col-xs-4 col-sm-3 col-md-2 col-lg-1" onClick={payload}>
				<div className={`item ${activeClass}`}>
					<div className={`item-data ${data.desc ? 'triple' : 'double'}`}>
						<div className="item-icon">
							<img src={data.icon ? icons[data.icon] : icons.music} alt={data.name} />
						</div>
						<div className="item-title">{data.name}</div>
						<div className="item-desc">{data.desc}</div>
					</div>
				</div>
			</div>
		);
	}
}

Item.propTypes = {
	data: PropTypes.object.isRequired,
};

export default Item;
