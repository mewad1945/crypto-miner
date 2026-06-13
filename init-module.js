window.Module = {
    noInitialRun: true,
    // Lägg till dessa två rader för att fånga upp ALLT
    print: (m) => console.log("Wasm-Output:", m),
    printErr: (m) => console.error("Wasm-Error:", m),
    onRuntimeInitialized: function() {
        console.log("Wasm Runtime redo!");
        window.dispatchEvent(new Event('minerReady'));
    }
};
console.log("INIT: Modul laddad.");
