const periodicElements = {
  // First period (1-2)
  1: { symbol: "H", name: "Hydrogen", position: 1, type: "NONMETAL" },
  2: { symbol: "He", name: "Helium", position: 2, type: "NOBLE_GAS" },
  // Second period (3-10)
  3: { symbol: "Li", name: "Lithium", position: 3, type: "ALKALI_METAL" },
  4: {
    symbol: "Be",
    name: "Beryllium",
    position: 4,
    type: "ALKALINE_EARTH_METAL",
  },
  5: { symbol: "B", name: "Boron", position: 5, type: "METALLOID" },
  6: { symbol: "C", name: "Carbon", position: 6, type: "NONMETAL" },
  7: { symbol: "N", name: "Nitrogen", position: 7, type: "NONMETAL" },
  8: { symbol: "O", name: "Oxygen", position: 8, type: "NONMETAL" },
  9: { symbol: "F", name: "Fluorine", position: 9, type: "HALOGEN" },
  10: { symbol: "Ne", name: "Neon", position: 10, type: "NOBLE_GAS" },
  // Third period (11-18)
  11: { symbol: "Na", name: "Sodium", position: 11, type: "ALKALI_METAL" },
  12: {
    symbol: "Mg",
    name: "Magnesium",
    position: 12,
    type: "ALKALINE_EARTH_METAL",
  },
  13: {
    symbol: "Al",
    name: "Aluminium",
    position: 13,
    type: "POST_TRANSITION_METAL",
  },
  14: { symbol: "Si", name: "Silicon", position: 14, type: "METALLOID" },
  15: { symbol: "P", name: "Phosphorus", position: 15, type: "NONMETAL" },
  16: { symbol: "S", name: "Sulfur", position: 16, type: "NONMETAL" },
  17: { symbol: "Cl", name: "Chlorine", position: 17, type: "HALOGEN" },
  18: { symbol: "Ar", name: "Argon", position: 18, type: "NOBLE_GAS" },
  // Fourth period
  19: { symbol: "K", name: "Potassium", position: 55, type: "ALKALI_METAL" },
  20: {
    symbol: "Ca",
    name: "Calcium",
    position: 56,
    type: "ALKALINE_EARTH_METAL",
  },
  21: {
    symbol: "Sc",
    name: "Scandium",
    position: 57,
    type: "TRANSITION_METAL",
  },
  22: {
    symbol: "Ti",
    name: "Titanium",
    position: 58,
    type: "TRANSITION_METAL",
  },
  23: { symbol: "V", name: "Vanadium", position: 59, type: "TRANSITION_METAL" },
  24: {
    symbol: "Cr",
    name: "Chromium",
    position: 60,
    type: "TRANSITION_METAL",
  },
  25: {
    symbol: "Mn",
    name: "Manganese",
    position: 61,
    type: "TRANSITION_METAL",
  },
  26: { symbol: "Fe", name: "Iron", position: 62, type: "TRANSITION_METAL" },
  27: { symbol: "Co", name: "Cobalt", position: 63, type: "TRANSITION_METAL" },
  28: { symbol: "Ni", name: "Nickel", position: 64, type: "TRANSITION_METAL" },
  29: { symbol: "Cu", name: "Copper", position: 65, type: "TRANSITION_METAL" },
  30: { symbol: "Zn", name: "Zinc", position: 66, type: "TRANSITION_METAL" },
  31: {
    symbol: "Ga",
    name: "Gallium",
    position: 67,
    type: "POST_TRANSITION_METAL",
  },
  32: { symbol: "Ge", name: "Germanium", position: 68, type: "METALLOID" },
  33: { symbol: "As", name: "Arsenic", position: 69, type: "METALLOID" },
  34: { symbol: "Se", name: "Selenium", position: 70, type: "NONMETAL" },
  35: { symbol: "Br", name: "Bromine", position: 71, type: "HALOGEN" },
  36: { symbol: "Kr", name: "Krypton", position: 72, type: "NOBLE_GAS" },
  // Fifth period
  37: { symbol: "Rb", name: "Rubidium", position: 73, type: "ALKALI_METAL" },
  38: {
    symbol: "Sr",
    name: "Strontium",
    position: 74,
    type: "ALKALINE_EARTH_METAL",
  },
  39: { symbol: "Y", name: "Yttrium", position: 75, type: "TRANSITION_METAL" },
  40: {
    symbol: "Zr",
    name: "Zirconium",
    position: 76,
    type: "TRANSITION_METAL",
  },
  41: { symbol: "Nb", name: "Niobium", position: 77, type: "TRANSITION_METAL" },
  42: {
    symbol: "Mo",
    name: "Molybdenum",
    position: 78,
    type: "TRANSITION_METAL",
  },
  43: {
    symbol: "Tc",
    name: "Technetium",
    position: 79,
    type: "TRANSITION_METAL",
  },
  44: {
    symbol: "Ru",
    name: "Ruthenium",
    position: 80,
    type: "TRANSITION_METAL",
  },
  45: { symbol: "Rh", name: "Rhodium", position: 81, type: "TRANSITION_METAL" },
  46: {
    symbol: "Pd",
    name: "Palladium",
    position: 82,
    type: "TRANSITION_METAL",
  },
  47: { symbol: "Ag", name: "Silver", position: 83, type: "TRANSITION_METAL" },
  48: { symbol: "Cd", name: "Cadmium", position: 84, type: "TRANSITION_METAL" },
  49: {
    symbol: "In",
    name: "Indium",
    position: 85,
    type: "POST_TRANSITION_METAL",
  },
  50: {
    symbol: "Sn",
    name: "Tin",
    position: 86,
    type: "POST_TRANSITION_METAL",
  },
  51: { symbol: "Sb", name: "Antimony", position: 87, type: "METALLOID" },
  52: { symbol: "Te", name: "Tellurium", position: 88, type: "METALLOID" },
  53: { symbol: "I", name: "Iodine", position: 89, type: "HALOGEN" },
  54: { symbol: "Xe", name: "Xenon", position: 90, type: "NOBLE_GAS" },
  // Sixth period
  55: { symbol: "Cs", name: "Caesium", position: 91, type: "ALKALI_METAL" },
  56: {
    symbol: "Ba",
    name: "Barium",
    position: 92,
    type: "ALKALINE_EARTH_METAL",
  },
  57: { symbol: "La", name: "Lanthanum", position: 93, type: "LANTHANIDE" },
  58: { symbol: "Ce", name: "Cerium", position: 94, type: "LANTHANIDE" },
  59: { symbol: "Pr", name: "Praseodymium", position: 95, type: "LANTHANIDE" },
  60: { symbol: "Nd", name: "Neodymium", position: 96, type: "LANTHANIDE" },
  61: { symbol: "Pm", name: "Promethium", position: 97, type: "LANTHANIDE" },
  62: { symbol: "Sm", name: "Samarium", position: 98, type: "LANTHANIDE" },
  63: { symbol: "Eu", name: "Europium", position: 99, type: "LANTHANIDE" },
  64: { symbol: "Gd", name: "Gadolinium", position: 100, type: "LANTHANIDE" },
  65: { symbol: "Tb", name: "Terbium", position: 101, type: "LANTHANIDE" },
  66: { symbol: "Dy", name: "Dysprosium", position: 102, type: "LANTHANIDE" },
  67: { symbol: "Ho", name: "Holmium", position: 103, type: "LANTHANIDE" },
  68: { symbol: "Er", name: "Erbium", position: 104, type: "LANTHANIDE" },
  69: { symbol: "Tm", name: "Thulium", position: 105, type: "LANTHANIDE" },
  70: { symbol: "Yb", name: "Ytterbium", position: 106, type: "LANTHANIDE" },
  71: { symbol: "Lu", name: "Lutetium", position: 107, type: "LANTHANIDE" },
  72: {
    symbol: "Hf",
    name: "Hafnium",
    position: 108,
    type: "TRANSITION_METAL",
  },
  73: {
    symbol: "Ta",
    name: "Tantalum",
    position: 109,
    type: "TRANSITION_METAL",
  },
  74: {
    symbol: "W",
    name: "Tungsten",
    position: 110,
    type: "TRANSITION_METAL",
  },
  75: {
    symbol: "Re",
    name: "Rhenium",
    position: 111,
    type: "TRANSITION_METAL",
  },
  76: { symbol: "Os", name: "Osmium", position: 112, type: "TRANSITION_METAL" },
  77: {
    symbol: "Ir",
    name: "Iridium",
    position: 113,
    type: "TRANSITION_METAL",
  },
  78: {
    symbol: "Pt",
    name: "Platinum",
    position: 114,
    type: "TRANSITION_METAL",
  },
  79: { symbol: "Au", name: "Gold", position: 115, type: "TRANSITION_METAL" },
  80: {
    symbol: "Hg",
    name: "Mercury",
    position: 116,
    type: "POST_TRANSITION_METAL",
  },
  81: {
    symbol: "Tl",
    name: "Thallium",
    position: 117,
    type: "POST_TRANSITION_METAL",
  },
  82: {
    symbol: "Pb",
    name: "Lead",
    position: 118,
    type: "POST_TRANSITION_METAL",
  },
  83: {
    symbol: "Bi",
    name: "Bismuth",
    position: 119,
    type: "POST_TRANSITION_METAL",
  },
  84: { symbol: "Po", name: "Polonium", position: 120, type: "METALLOID" },
  85: { symbol: "At", name: "Astatine", position: 121, type: "HALOGEN" },
  86: { symbol: "Rn", name: "Radon", position: 122, type: "NOBLE_GAS" },
  // Seventh period
  87: { symbol: "Fr", name: "Francium", position: 123, type: "ALKALI_METAL" },
  88: {
    symbol: "Ra",
    name: "Radium",
    position: 124,
    type: "ALKALINE_EARTH_METAL",
  },
  89: { symbol: "Ac", name: "Actinium", position: 125, type: "ACTINIDE" },
  90: { symbol: "Th", name: "Thorium", position: 126, type: "ACTINIDE" },
  91: { symbol: "Pa", name: "Protactinium", position: 127, type: "ACTINIDE" },
  92: { symbol: "U", name: "Uranium", position: 128, type: "ACTINIDE" },
  93: { symbol: "Np", name: "Neptunium", position: 129, type: "ACTINIDE" },
  94: { symbol: "Pu", name: "Plutonium", position: 130, type: "ACTINIDE" },
  95: { symbol: "Am", name: "Americium", position: 131, type: "ACTINIDE" },
  96: { symbol: "Cm", name: "Curium", position: 132, type: "ACTINIDE" },
  97: { symbol: "Bk", name: "Berkelium", position: 133, type: "ACTINIDE" },
  98: { symbol: "Cf", name: "Californium", position: 134, type: "ACTINIDE" },
  99: { symbol: "Es", name: "Einsteinium", position: 135, type: "ACTINIDE" },
  100: { symbol: "Fm", name: "Fermium", position: 136, type: "ACTINIDE" },
  101: { symbol: "Md", name: "Mendelevium", position: 137, type: "ACTINIDE" },
  102: { symbol: "No", name: "Nobelium", position: 138, type: "ACTINIDE" },
  103: { symbol: "Lr", name: "Lawrencium", position: 139, type: "ACTINIDE" },
  104: {
    symbol: "Rf",
    name: "Rutherfordium",
    position: 140,
    type: "TRANSITION_METAL",
  },
  105: {
    symbol: "Db",
    name: "Dubnium",
    position: 141,
    type: "TRANSITION_METAL",
  },
  106: {
    symbol: "Sg",
    name: "Seaborgium",
    position: 142,
    type: "TRANSITION_METAL",
  },
  107: {
    symbol: "Bh",
    name: "Bohrium",
    position: 143,
    type: "TRANSITION_METAL",
  },
  108: {
    symbol: "Hs",
    name: "Hassium",
    position: 144,
    type: "TRANSITION_METAL",
  },
  109: {
    symbol: "Mt",
    name: "Meitnerium",
    position: 145,
    type: "TRANSITION_METAL",
  },
  110: {
    symbol: "Ds",
    name: "Darmstadtium",
    position: 146,
    type: "TRANSITION_METAL",
  },
  111: {
    symbol: "Rg",
    name: "Roentgenium",
    position: 147,
    type: "TRANSITION_METAL",
  },
  112: {
    symbol: "Cn",
    name: "Copernicium",
    position: 148,
    type: "TRANSITION_METAL",
  },
  113: {
    symbol: "Nh",
    name: "Nihonium",
    position: 149,
    type: "POST_TRANSITION_METAL",
  },
  114: {
    symbol: "Fl",
    name: "Flerovium",
    position: 150,
    type: "POST_TRANSITION_METAL",
  },
  115: {
    symbol: "Mc",
    name: "Moscovium",
    position: 151,
    type: "POST_TRANSITION_METAL",
  },
  116: {
    symbol: "Lv",
    name: "Livermorium",
    position: 152,
    type: "POST_TRANSITION_METAL",
  },
  117: { symbol: "Ts", name: "Tennessine", position: 153, type: "HALOGEN" },
  118: { symbol: "Og", name: "Oganesson", position: 154, type: "NOBLE_GAS" },
};

const elementPositions = {
  // First 18 elements with corrected positions
  1: 1, // H
  2: 2, // He
  3: 3, // Li
  4: 4, // Be
  5: 5, // B
  6: 6, // C
  7: 7, // N
  8: 8, // O
  9: 9, // F
  10: 10, // Ne
  11: 11, // Na
  12: 12, // Mg
  13: 13, // Al
  14: 14, // Si
  15: 15, // P
  16: 16, // S
  17: 17, // Cl
  18: 18, // Ar
  // Fourth period
  19: 55, // K
  20: 56, // Ca
  21: 57, // Sc
  22: 58, // Ti
  23: 59, // V
  24: 60, // Cr
  25: 61, // Mn
  26: 62, // Fe
  27: 63, // Co
  28: 64, // Ni
  29: 65, // Cu
  30: 66, // Zn
  31: 67, // Ga
  32: 68, // Ge
  33: 69, // As
  34: 70, // Se
  35: 71, // Br
  36: 72, // Kr
  // Fifth period
  37: 73, // Rb
  38: 74, // Sr
  39: 75, // Y
  40: 76, // Zr
  41: 77, // Nb
  42: 78, // Mo
  43: 79, // Tc
  44: 80, // Ru
  45: 81, // Rh
  46: 82, // Pd
  47: 83, // Ag
  48: 84, // Cd
  49: 85, // In
  50: 86, // Sn
  51: 87, // Sb
  52: 88, // Te
  53: 89, // I
  54: 90, // Xe
  // Sixth period
  55: 91, // Cs
  56: 92, // Ba
  72: 108, // Hf
  73: 109, // Ta
  74: 110, // W
  75: 111, // Re
  76: 112, // Os
  77: 113, // Ir
  78: 114, // Pt
  79: 115, // Au
  80: 116, // Hg
  81: 117, // Tl
  82: 118, // Pb
  83: 119, // Bi
  84: 120, // Po
  85: 121, // At
  86: 122, // Rn
  // Seventh period
  87: 123, // Fr
  88: 124, // Ra
  104: 140, // Rf
  105: 141, // Db
  106: 142, // Sg
  107: 143, // Bh
  108: 144, // Hs
  109: 145, // Mt
  110: 146, // Ds
  111: 147, // Rg
  112: 148, // Cn
  113: 149, // Nh
  114: 150, // Fl
  115: 151, // Mc
  116: 152, // Lv
  117: 153, // Ts
  118: 154, // Og
};

// Create empty cells for periodic table layout
const emptyCells = {
  // f-block gaps in periods 6 and 7
  lanthanideGap: Array.from({ length: 15 }, (_, i) => 93 + i),
  actinideGap: Array.from({ length: 15 }, (_, i) => 125 + i),
};

const elementTypes = [
  "NONMETAL",
  "NOBLE_GAS",
  "ALKALI_METAL",
  "ALKALINE_EARTH_METAL",
  "METALLOID",
  "TRANSITION_METAL",
  "POST_TRANSITION_METAL",
  "HALOGEN",
  "LANTHANIDE",
  "ACTINIDE",
];

// Change export to window assignment for global access
window.periodicElements = periodicElements;
window.elementPositions = elementPositions;
window.elementTypes = elementTypes;
window.emptyCells = emptyCells;

// Make sure elements are available globally before game starts
if (
  !window.periodicElements ||
  !window.elementPositions ||
  !window.elementTypes
) {
  console.error("Elements data failed to load!");
}

// Add validation function
window.validateElementsData = function () {
  if (!window.periodicElements) {
    throw new Error("Periodic elements data not loaded");
  }
  if (!window.elementPositions) {
    throw new Error("Element positions not loaded");
  }
  if (!window.elementTypes) {
    throw new Error("Element types not loaded");
  }
  return true;
};
