import { useEffect, useRef } from "react";
import { Network } from "vis-network";


const GraphComponent = ({ data, onNodeClick }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    // Ensure graph container exists before creating a Network
    if (!graphRef.current) return;

    // Create the network visualization
    const network = new Network(graphRef.current, data, {
      nodes: {
        shape: "dot",
        size: 14,
        font: { size: 11, color: 'white' },
      },
      edges: {
        font: { size: 7, align: "middle",face: "verdana"},
        arrows: { to: { enabled: true } },
      },
      physics: {
        enabled: true,
        stabilization: { iterations: 200 },
      },
    });

    // Add click event listener for nodes
    network.on("doubleClick", (params) => {
      if (params.nodes.length > 0) {
        const clickedNodeId = params.nodes[0]; // Get the clicked node's ID
        console.log("Clicked Node ID:", clickedNodeId);
        onNodeClick(clickedNodeId); // Pass the ID to the parent callback
      }
    });

    return () => {
      // Cleanup network instance on component unmount
      network.destroy();
    };
  }, [data, onNodeClick]);

  return (
    <div
      ref={graphRef}
      style={{ height: "600px", width: "100%", border: "1px solid black"  }}
    />
  );
};

export default GraphComponent;
