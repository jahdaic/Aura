import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './item';
import MusicItem from './music-item';

const Items = props => {
	const { type, items } = props;

	return (
		<div className="item-set">
			{(items || []).map(item => {
				switch (type) {
					case 'lights':
						return <Item key={item.name} data={item} type={type} />;
					case 'music':
						return <MusicItem key={item.name} data={item} />;
					case 'environments':
						return <Item key={item.name} data={item} type={type} />;
					case 'sounds':
						return <Item key={item.name} data={item} type={type} />;
					default:
						return null;
				}
			})}
		</div>
	);
};

Items.propTypes = {
	type: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
};

const mapStateToProps = (store, props) => {
	const { type } = props;

	return {
		items: store.appState.sets[type],
	};
};

export default connect(mapStateToProps)(Items);
