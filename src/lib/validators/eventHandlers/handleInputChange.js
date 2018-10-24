function handleInputChange(event) {

	let fields = this.state.fields;

	fields[event.target.name] = event.target.value;

	this.setState({
		fields
	});

}

export default handleInputChange;