window.Module = {
    noInitialRun: true,
    onRuntimeInitialized: function() {
        console.log("Wasm Runtime redo!");
        // Skicka signal till script.js att biblioteket är redo att användas
        window.dispatchEvent(new CustomEvent('moduleReady', { detail: window.Module }));
    },
    print: (msg) => console.log("XMRig:", msg)
};
