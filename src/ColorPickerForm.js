import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	picker: {
		width: '100% !important',
		marginTop: '2rem'
	},
	addColor: {
		width: '100%',
		padding: '1rem',
		marginTop: '1rem',
		fontSize: '2rem'
	},
	colorNameInput: {
		width: '100%',
		height: '70px'
	}
};
class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentColor: 'teal',
			newColorName: ''
		};
		this.updateCurrColor = this.updateCurrColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	updateCurrColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleSubmit() {
		const newColor = { color: this.state.currentColor, name: this.state.newColorName };
		this.props.addNewColor(newColor);
		this.setState({ newColorName: '' });
	}
	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker color={currentColor} onChange={this.updateCurrColor} className={classes.picker} />
				<ValidatorForm onSubmit={this.handleSubmit} ref="form">
					<TextValidator
						value={newColorName}
						className={classes.colorNameInput}
						name="newColorName"
						variant="filled"
						margin="normal"
						placeholder="Color name"
						onChange={this.handleChange}
						validators={[ 'required', 'isColorNameUnique', 'isColorName' ]}
						errorMessages={[ 'enter a color name', 'Color already used!', 'Color name must be unique' ]}
					/>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						disabled={paletteIsFull}
						className={classes.addColor}
						style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
					>
						{paletteIsFull ? 'Palette full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}
export default withStyles(styles)(ColorPickerForm);
