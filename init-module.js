window.Module = {
    noInitialRun: true,
    onRuntimeInitialized: function() {
        console.log("Wasm Runtime redo!");
        window.isMinerReady = true; 
    }
};
