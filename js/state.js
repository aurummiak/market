let currentCategory = "accounts";
let viewerImages = [];
let modalImageIndex = 0;
let viewerIndex = 0;

let activeFilters = {
    region: [],
    drop: [],
    stats: {
        def: { min: 0, max: 0 },
        reduction: { min: 0, max: 0 },
        resist: { min: 0, max: 0 },
        damage: { min: 0, max: 0 },
        accuracy: { min: 0, max: 0 }
    }
};