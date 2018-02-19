import React, { Component } from 'react';

class PostSingle extends Component {
	render () {

		const post = this.props.post;

		return (
			<div className="row post-single hover" onClick={this.props.onClick}>
				<div
					className="col-xs-12 post-single-content"
					style={{
						backgroundImage: `url(/images/${post.localImageId}?size=800x300)`,
						color: 'white'
					}}
				>
					<p style={{marginBottom: 0, color: "#FF1D25", fontFamily: "Times"}}>New stuff</p>
					<h3 style={{marginTop: 0, marginBottom: 0, fontFamily: "Helvetica", fontWeight: 600, textTransform: "uppercase", fontSize: "1.5em"}}>{post.heading}</h3>
					<p>{post.text}</p>
				</div>
			</div>
		);
	}
}

export default PostSingle;