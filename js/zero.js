var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    buyables: {
    rows: 2,
    cols: 2,
    11: {
      title: "Doubler",
      cost() {return new Decimal(hasUpgrade("o", 14) ? new Decimal(4) : new Decimal(5)).pow(getBuyableAmount(this.layer, 11)).times(10)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `Double your zero gain\n Cost: ${this.cost().round()}\n Effect: ${this.effect().round()}`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost())
        setBuyableAmount(this.layer, 11, new Decimal(getBuyableAmount(this.layer, 11)).add(1))
        
      },
      effect() {
        return new Decimal(2).pow(getBuyableAmount(this.layer, 11))
      }
    },
    12: {
      title: "Tripler",
      cost() {return new Decimal(hasChallenge("o", 12) ? 6 : 7).pow(getBuyableAmount(this.layer, 12)).times(100)},
      canAfford() {
        return (new Decimal(player.points).gte(this.cost()) && !inChallenge("o", 12))
      },
      unlocked() {return true},
      display() {return `Triple your zero gain\n Cost: ${this.cost().round()}\n Effect: ${this.effect().round()}`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost())
        setBuyableAmount(this.layer, 12, new Decimal(getBuyableAmount(this.layer, 12)).add(1))
        
      },
      effect() {
        return new Decimal(3).pow(getBuyableAmount(this.layer, 12))
      }
    },
  
  21: {
      title: "Quadrupler",
      cost() {return new Decimal(9).pow(getBuyableAmount(this.layer, 21)).times(10000)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return false},
      display() {return `Quadruple your zero gain\n Cost: ${this.cost().round()}\n Effect: ${this.effect().round()}`},
      buy() {
        player.points = new Decimal(player.points).sub(this.cost()) 
        setBuyableAmount(this.layer, 21, new Decimal(getBuyableAmount(this.layer, 21)).add(1))
        
      },
      effect() {
        return new Decimal(4).pow(getBuyableAmount(this.layer, 21))
      } // does it work?
    },
  },
    tabFormat: ["buyables",["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
  update(diff){
    goal = new Decimal(1e6)
    if (hasUpgrade("o", 12)) goal = goal.div(2)
    if (hasChallenge("o", 11)) goal = goal.div(2)
    if (!(inChallenge("o", 11))) player.points = player.points.min(goal)
    else player.points = player.points.min(2e6)
    
  }
})