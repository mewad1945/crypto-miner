window.Module = {
    noInitialRun: true,
    print: (m) => console.log("Wasm Log:", m),
    printErr: (m) => console.error("Wasm Error:", m),
    onRuntimeInitialized: function() {
        console.log("Wasm Runtime redo!");
        window.dispatchEvent(new Event('minerReady'));
    }
};
console.log("INIT: Modul laddad.");
