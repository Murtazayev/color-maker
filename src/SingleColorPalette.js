import { color } from '@mui/system';
import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		console.log(this._shades);
		this.state = { format: 'hex' };
		this.changeFormat = this.changeFormat.bind(this);
	}

	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
		}
		return shades.slice(1);
	}
	changeFormat(val) {
		this.setState({ format: val });
	}
	render() {
		const { format } = this.state;
		const colorBoxes = this._shades.map((color) => (
			<ColorBox key={color.id} name={color.name} background={color[format]} showLink={false} />
		));

		return (
			<div className="Palette">
				<Navbar handleChange={this.changeFormat} />
				<h1>singel</h1>
				<div className="Palette-colors">{colorBoxes}</div>
			</div>
		);
	}
}

export default SingleColorPalette;
