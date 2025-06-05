const gymMembership = {
  buyMembership(membershipType, months, hasDiscount) {
    const prices = { basic: 50, premium: 80, vip: 120 };

    if (membershipType !== "basic" && membershipType !== "premium" && membershipType !== "vip") {
      throw new Error("Invalid membership type!");
    }
    if (months <= 0 || months >= 13) {
      throw new Error("Invalid number of months!");
    }
    if (typeof hasDiscount !== "boolean") {
      throw new Error("Invalid discount parameter!");
    }

    let total = prices[membershipType] * months;
    if (hasDiscount) {
      total *= 0.9;
    }

    return `You bought a ${membershipType} membership for ${months} months. Total price: ${total.toFixed(2)}$.`;
  },

  checkAccess(membershipType, facility) {
    const access = {
      basic: ["gym"],
      premium: ["gym", "pool"],
      vip: ["gym", "pool", "spa"],
    };

    if (!access.hasOwnProperty(membershipType)) {
      throw new Error("Invalid membership type!");
    }
    if (!["gym", "pool", "spa"].includes(facility)) {
      throw new Error("Invalid facility!");
    }

    if (access[membershipType].includes(facility)) {
      return `Access granted to ${facility}.`;
    } else {
      return `Access denied to ${facility}.`;
    }
  },

  buySupplements(supplements){
    const prices = { shake: 3, bar: 2, water: 1 };
    if (supplements !== "shake" && supplements !== "bar" && supplements !== "water") {
      throw new Error("Invalid supplement!");
    }
    let total = prices[supplements]
    return `You bought a ${supplements} for ${total.toFixed(2)}$.`;
  }
};

module.exports = gymMembership;

export default gymMembership
