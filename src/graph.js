import React, { PureComponent } from "react";
import * as d3 from "d3";
import data from "./data.json";

console.log(data);
class Graph extends PureComponent {
	componentDidMount() {
		const svg = d3.select("svg");
		const width = +svg.attr("width");
		const height = +svg.attr("height");

		let simulation = d3
			.forceSimulation()
			.force(
				"link",
				d3.forceLink().id(d => {
					return d.id;
				})
			)
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2));

		let link = svg
			.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(data.links)
			.enter()
			.append("line");

		let node = svg
			.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(data.nodes)
			.enter()
			.append("circle")
			.attr("r", 2.5);

		node.append("title").text(d => {
			return d.id;
		});

		const ticked = () => {
			link
				.attr("x1", d => {
					return d.source.x;
				})
				.attr("y1", d => {
					return d.source.y;
				})
				.attr("x2", d => {
					return d.target.x;
				})
				.attr("y2", d => {
					return d.target.y;
				});
			node
				.attr("cx", d => {
					return d.x;
				})
				.attr("cy", d => {
					return d.y;
				});
		};
		simulation.nodes(data.nodes).on("tick", ticked);
		simulation.force("link").links(data.links);
	}
	render() {
		return (
			<div>
				<svg width="600" height="600" />

			</div>
		);
	}
}

export default Graph;
