import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LightItem from './light-item';
import MusicItem from './music-item';
import EnvironmentItem from './environment-item';
import SoundItem from './sound-item';

const Items = props => {
	const { type, items } = props;

	return (
		<div className="item-set row around-xs">
			{(items || []).map(item => {
				switch (type) {
					case 'lights':
						return <LightItem key={item.name} data={item} />;
					case 'music':
						return <MusicItem key={item.name} data={item} />;
					case 'environments':
						return <EnvironmentItem key={item.name} data={item} />;
					case 'sounds':
						return <SoundItem key={item.name} data={item} />;
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
