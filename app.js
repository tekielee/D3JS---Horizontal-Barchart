const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
	
const data = [
	{country: 'China', population: 1415046000},
	{country: 'India', population: 1354052000},
	{country: 'United States', population: 326767000},
	{country: 'Indonesia', population: 266795000},
	{country: 'Brazil', population: 210868000},
	{country: 'Pakistan', population: 200814000},
	{country: 'Nigeria', population: 195875000},
	{country: 'Bangladesh', population: 166368000},
	{country: 'Russia', population: 143865000},
	{country: 'Mexico', population: 130759000}
];

const render = data => {
	const xValue = d => d.population;
	const yValue = d => d.country;
	const margin = {top: 50, right: 40, bottom: 75, left: 180};
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	
	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data, xValue)])
		.range([0, innerWidth]);
				
	const yScale = d3.scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.padding(0.1);
	
	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);
	
	const xAxisTickFormat = number => 
		d3.format('.3s')(number)
			.replace('G', 'B');
			
	const xAxis = d3.axisBottom(xScale)
		.tickFormat(xAxisTickFormat)
		.tickSize(-innerHeight);
	
	g.append('g')
		.call(d3.axisLeft(yScale))
		.selectAll('.domain, .tick line')
			.remove();
			
	const xAxisG = g.append('g').call(xAxis)
		.attr('transform', `translate(0, ${innerHeight})`);
		
		xAxisG.select('.domain').remove();
		xAxisG.append('text')
			.attr('class', 'axis-label')
			.attr('y', 60)
			.attr('x', innerWidth/2)
			.attr('fill', 'black')
			.text('Population');
			
	g.selectAll('rect').data(data)
		.enter().append('rect')
			.attr('y', d => yScale(yValue(d)))
			.attr('width', d => xScale(xValue(d)))
			.attr('height', yScale.bandwidth());
			
	g.append('text')
		.attr('class', 'title')
		.attr('y', -10)
		.text('Top 10 most Most Populous Countries');
};

render(data);