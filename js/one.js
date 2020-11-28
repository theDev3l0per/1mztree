addLayer("o", {
  startData() {
    return {
      best: new Decimal(0), // startData is a function that returns default data for a layer.
      unlocked() {
        return new Decimal(player.o.best).gte(1) || player.points.gte(2e5);
      }, // You can add more variables here to add them to your layer.
      points: new Decimal(0) // "points" is the internal name for the main resource of the layer.
    };
  },

  color: "#ff0000", // The color for this layer, which affects many elements.
  resource: "one points", // The name of this layer's main prestige resource.
  row: 0, // The row this layer is on (0 is the first row).

  baseResource: "points", // The name of the resource your prestige gain is based on.
  baseAmount() {
    return player.points;
  }, // A function to return the current amount of baseResource.

  requires() {return hasUpgrade("o", 12) ? new Decimal(5e5) : new Decimal(1e6)}, // The amount of the base needed to  gain 1 of the prestige currency.
  // Also the amount required to unlock the layer.

  type: "normal", // Determines the formula used for calculating prestige currency.
  exponent: 0.5, // "normal" prestige gain is (currency^exponent).

  gainMult() {
    // Returns your multiplier to your gain of the prestige resource.
    return new Decimal(1); // Factor in any bonuses multiplying gain here.
  },
  gainExp() {
    // Returns your exponent to your gain of the prestige resource.
    return new Decimal(1);
  },
  doReset(x) {
    if (x == "o") {
      setBuyableAmount("tree-tab", 11, new Decimal(0));
      setBuyableAmount("tree-tab", 12, new Decimal(0));
    }
  },
  layerShown() {
    return player.o.unlocked();
  }, // Returns a bool for if this layer's node should be visible in the tree.
  upgrades: {
    rows: 1,
    cols: 4,
    11: {
      cost: new Decimal(1),
      title: "Extra Tripler",
      description: "Multiply zero gain by 3",
      effect() {
        return hasUpgrade("o", 11) ? new Decimal(3) : new Decimal(1)
      }
    },
    12: {
      cost: new Decimal(1),
      title: "0 + 0 = 1",
      description: "Half the amount of zeroes needed to one reset",
    },
    13: {
      cost: new Decimal(2),
      title: "Extra Doubler",
      description: "Multiply zero gain by 2",
      effect() {
        return hasUpgrade("o", 13) ? new Decimal(2) : new Decimal(1)
      }
    },
    14: {
      cost: new Decimal(2),
      title: "Faster Scaling?",
      description: "The first buyables scaling goes from 5x to 4x",
    }
  }
});
