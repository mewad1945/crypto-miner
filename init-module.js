window.Module = {
    noInitialRun: true,
    onRuntimeInitialized: function() {
        console.log("Wasm Runtime redo!");
        window.isMinerReady = true; // Flagga som script.js kommer leta efter
    }
};
