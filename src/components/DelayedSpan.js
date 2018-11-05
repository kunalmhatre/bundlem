import React from 'react';

class DelayedSpan extends React.Component {

	constructor(props) {

		super(props);

		this.content = props.content;
		this.timeout = props.timeout;

		this.timerId = null;

		this.state = {
			hidden: true
		};

	}

	componentDidMount() {

		this.timerId = setTimeout(() => {

			this.setState({
				hidden: false
			});

		}, this.timeout);

	}

	componentWillUnmount() {

		clearTimeout(this.timerId);

	}

	render() {

		const { hidden } = this.state;

		return (

			<span>{ (hidden) ? null : this.content }</span>

		);

	}

}

export default DelayedSpan;