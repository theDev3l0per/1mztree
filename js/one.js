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

  baseResource: "zeroes", // The name of the resource your prestige gain is based on.
  baseAmount() {
    return player.points;
  }, // A function to return the current amount of baseResource.

  requires() {
    goal = new Decimal(1e6)
    if (hasUpgrade("o", 12)) goal = goal.div(2)
    if (hasChallenge("o", 11)) goal = goal.div(2)
    return goal
  }, // The amount of the base needed to  gain 1 of the prestige currency.
  // Also the amount required to unlock the layer.

  type: "normal", // Determines the formula used for calculating prestige currency.
  exponent: 0.5, // "normal" prestige gain is (currency^exponent).

  gainMult() {
    
    mult = new Decimal(1);
    if (hasChallenge("o", 21)) mult = mult.mul(2)
    return mult
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
  challenges: {
    rows: 2,
    cols: 2,
    11: {
      name: "Goal++",
      challengeDescription: "The goal for this is 2 million zeroes, thats it",
      rewardDescription: "Devide the goal for one resets by 2",
      goal: new Decimal(2e6),
      unlocked() {return hasUpgrade("o", 15)}
    },
    12: {
      name: "No more inflation",
      challengeDescription: "You cant buy triplers, have fun getting to the goal.",
      rewardDescription: "Triplers cost scaling goes from 7x to 6x",
      goal() {
        goal = new Decimal(1e6)
        if (hasUpgrade("o", 12)) goal = goal.div(2)
        if (hasChallenge("o", 11)) goal = goal.div(2)
        return goal
      },
      unlocked() {return hasUpgrade("o", 15)}
    },
    21: {
      name: "Inactivity",
      challengeDescription: "Zero production is divided by 10",
      rewardDescription: "you gain 2x one points",
      goal() {
        goal = new Decimal(1e6)
        if (hasUpgrade("o", 12)) goal = goal.div(2)
        if (hasChallenge("o", 11)) goal = goal.div(2)
        return goal
      },
      unlocked() {return hasUpgrade("o", 15)}
    }
  },
  upgrades: {
    rows: 2,
    cols: 5,
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
    },
    15: {
      cost: new Decimal(3),
      title: "Challenger",
      description: "Unlock Challenges"
    },
    21: {
      cost: new Decimal(4),
      title: "1+1 = 0",
      description:"Boost zeroes based on ones",
      effect() {
        return hasUpgrade("o",21) ? new Decimal(player.o.points).add(1).root(2).min(10) : new Decimal(1)
      },
      effectDisplay() {return this.effect().round()}
    },
    22: {
      cost: new Decimal(5),
      title: "Even more free stuff",
      description:"Gain one free tripler and one free doubler",
      effect() {
        return hasUpgrade("o",22) ? new Decimal(6) : new Decimal(1)
      },
      effectDisplay() {return this.effect().round()}
    }
  }
});
