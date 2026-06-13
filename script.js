window.onload = () => {
    console.log("--- DEBUGGING START ---");
    console.log("Globala objekt:");
    console.log("Window:", window);
    console.log("Module:", typeof Module !== 'undefined' ? Module : "Inte definierad");
    console.log("XMRigMiner:", typeof XMRigMiner !== 'undefined' ? XMRigMiner : "Inte definierad");
    console.log("XMRig:", typeof XMRig !== 'undefined' ? XMRig : "Inte definierad");
    console.log("--- DEBUGGING END ---");
    
    // Om någon av dessa finns, använd den
    if (typeof XMRigMiner !== 'undefined') {
        console.log("Hittade XMRigMiner!");
    } else if (typeof Module !== 'undefined') {
        console.log("Hittade Module, letar efter start...");
    }
};
