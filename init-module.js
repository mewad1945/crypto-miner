window.Module = {
    noInitialRun: true,
    onRuntimeInitialized: function() {
        console.log("Wasm Runtime redo!");
        // Skicka signal till script.js att biblioteket är färdigladdat
        window.dispatchEvent(new Event('minerReady'));
    }
};
