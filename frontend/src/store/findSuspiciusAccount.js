function findSuspiciousAccounts(graph, transactionThreshold, valueThreshold, repetitiveThreshold, isolationFlag, flaggedAccounts) {
    const { nodes, edges } = graph;

    // Create a map for adjacency list and transactions
    const adjacencyList = new Map();
    const transactions = new Map();

    // Populate adjacency list and transactions map
    edges.forEach(edge => {
        if (!adjacencyList.has(edge.from)) {
            adjacencyList.set(edge.from, []);
        }
        adjacencyList.get(edge.from).push(edge.to);

        if (!transactions.has(edge.from)) {
            transactions.set(edge.from, []);
        }
        transactions.get(edge.from).push({
            to: edge.to,
            value: parseFloat(edge.label.split(' ')[0]) // Extract the ETH value from the label
        });
    });

    const suspiciousAccounts = new Set();

    // Iterate through accounts and apply the rules
    nodes.forEach(node => {
        const accountId = node.id;
        const outgoingTransactions = transactions.get(accountId) || [];
        const incomingTransactions = edges.filter(edge => edge.to === accountId);

        // Rule 1: Check transaction threshold
        if (outgoingTransactions.length + incomingTransactions.length >= transactionThreshold) {
            suspiciousAccounts.add(accountId);
        }

        // Rule 2: Check value threshold
        const totalValue = outgoingTransactions.reduce((sum, tx) => sum + tx.value, 0);
        if (totalValue >= valueThreshold) {
            suspiciousAccounts.add(accountId);
        }

        // Rule 3: Check repetitive transfers
        const repetitionCount = outgoingTransactions.reduce((map, tx) => {
            map[tx.value] = (map[tx.value] || 0) + 1;
            return map;
        }, {});
        if (Object.values(repetitionCount).some(count => count >= repetitiveThreshold)) {
            suspiciousAccounts.add(accountId);
        }

        // Rule 4: Check isolation
        if (isolationFlag && outgoingTransactions.length === 0 && incomingTransactions.length === 0) {
            suspiciousAccounts.add(accountId);
        }

        // Rule 5: Check flagged accounts interaction
        const interactsWithFlagged = outgoingTransactions.some(tx => flaggedAccounts.includes(tx.to));
        if (interactsWithFlagged) {
            suspiciousAccounts.add(accountId);
        }
    });

    return Array.from(suspiciousAccounts);
}

// Example Usage
const graph = {
    nodes: [
        { id: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", label: "0x6...b62" },
        { id: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "0x5...b0d" },
        { id: "0x413e86a54ee4ef3f67a2aaf4cd2e552fb3e869e9", label: "0x4...9e9" },
        { id: "0xa060b6fa587f673aa06e69e17acfc72226c796d3", label: "0xa...6d3" },
        // Add more nodes...
    ],
    edges: [
        { from: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "4.0000 ETH", id: "bc7e4f99-ed8e-4dc9-b536-becfc4b1e680" },
        { from: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "4.0000 ETH", id: "21092f6a-e738-46fd-822b-ba0d274503f6" },
        { from: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "4.0000 ETH", id: "21092f6a-e738-46fd-822b-ba0d274503f6" },
        { from: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "4.0000 ETH", id: "21092f6a-e738-46fd-822b-ba0d274503f6" },
        { from: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "4.0000 ETH", id: "21092f6a-e738-46fd-822b-ba0d274503f6" },
        { from: "0x413e86a54ee4ef3f67a2aaf4cd2e552fb3e869e9", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "14.0000 ETH", id: "a5025ced-bfdb-410b-aeff-f26eee2af64d" },
        { from: "0xa060b6fa587f673aa06e69e17acfc72226c796d3", to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "4.0000 ETH", id: "5aa6d0a3-23ab-4d80-9fd6-07e6ca85e2ad" },
        // Add more edges...
    ]
};

const suspiciousAccounts = findSuspiciousAccounts(graph, 5, 10, 3, true, ["0x5c97902c8c80779cb99235e42c354e53f38c3b0d"]);
console.log("Suspicious Accounts:", suspiciousAccounts);
