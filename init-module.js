console.log("INIT-MODULE: Laddad");
window.Module = {
    noInitialRun: true,
    onRuntimeInitialized: function() {
        console.log("WASM: Runtime redo");
        window.dispatchEvent(new CustomEvent('moduleReady'));
    }
};
