import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./Graph.scss";

const dimensions = {
    width: 800,
    height: 600,
};
const initial_state = [
    { name: "test20", units: 54 },
    { name: "test57", units: 97 },
    { name: "test79", units: 22 },
    { name: "test45", units: 87 },
    { name: "test36", units: 61 },
    { name: "test86", units: 93 },
    { name: "test85", units: 71 },
    { name: "test54", units: 72 },
    { name: "test44", units: 83 },
    { name: "test83", units: 20 },
];
const Graph = () => {
    const ref = useRef<SVGSVGElement | null>(null);
    const [selection, setSelection] = useState<null | d3.Selection<SVGSVGElement | null, unknown, null, undefined>>();
    const [data, setData] = useState(initial_state);

    let y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.units)!])
        .range([dimensions.height, 0]);
    let x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, dimensions.width])
        .padding(0.1);

    useEffect(() => {
        if (!selection) {
            setSelection(d3.select(ref.current));
        } else {
            selection
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("width", x.bandwidth())
                .attr("height", 0)
                .attr("fill", "orange")
                .attr("x", (d) => x(d.name)!)
                .attr("height", 0)
                .attr("y", dimensions.height)
                .transition()
                .duration(500)
                .delay((d, i) => i * 100)
                .ease(d3.easeElastic)
                .attr("height", (d) => dimensions.height - y(d.units))
                .attr("y", (d) => y(d.units));
        }
    }, [data, selection, x, y]);

    useEffect(() => {
        if (selection) {
            const rects = selection.selectAll("rect").data(data);
            rects.exit().transition().duration(500).attr("y", dimensions.height).attr("height", 0).remove();

            rects
                .transition()
                .duration(500)
                .attr("width", x.bandwidth())
                .attr("height", (d) => dimensions.height - y(d.units))
                .attr("x", (d) => x(d.name)!)
                .attr("y", (d) => y(d.units))
                .attr("fill", "orange");

            rects
                .enter()
                .append("rect")
                .attr("width", x.bandwidth())
                .attr("height", 0)
                .attr("fill", "orange")
                .attr("x", (d) => x(d.name)!)
                .attr("y", dimensions.height)
                .attr("height", 0)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr("fill", "lightorange")
                .attr("y", (d) => y(d.units))
                .attr("height", (d) => dimensions.height - y(d.units));
        }
    }, [data, selection, x, y]);

    const addRandomData = () => {
        const datatoadded = {
            name: `test${Math.floor(Math.random() * 100)}`,
            units: Math.floor(Math.random() * 80 + 20),
        };
        setData([...data, datatoadded]);
    };

    const removeRandomData = () => {
        const datatoremoved = data[Math.floor(Math.random() * data.length)];
        setData(data.filter((d) => d !== datatoremoved));
    };

    const allRandomData = () => {
        let temp: { name: string; units: number }[] = [];
        for (let i = 0; i < (data.length > 2 ? data.length : 10); i++) {
            temp.push({
                name: `test${Math.floor(Math.random() * 100)}`,
                units: Math.floor(Math.random() * 80 + 20),
            });
        }
        setData([...temp]);
    };

    return (
        <div className="graph-container">
            <div className="graph-container__button-box">
                <button onClick={addRandomData}>Add Random Data</button>
                <button onClick={removeRandomData}>Remove Random Data</button>
                <button onClick={allRandomData}>all Random Data</button>
            </div>
            <svg ref={ref} width={dimensions.width} height={dimensions.height}></svg>
        </div>
    );
};

export default Graph;
