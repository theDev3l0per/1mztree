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
    rows: 1,
    cols: 2,
    11: {
      title: "Doubler",
      cost() {return new Decimal(5).pow(getBuyableAmount(this.layer, 11)).times(10)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `Double your zero gain\n Cost: ${this.cost().round()}\n Effect: ${this.effect().round()}`},
      buy() {
        setBuyableAmount(this.layer, 11, new Decimal(getBuyableAmount(this.layer, 11)).add(1))
        player.points = new Decimal(player.points).sub(this.cost())
      },
      effect() {
        return new Decimal(2).pow(getBuyableAmount(this.layer, 11))
      }
    },
    12: {
      title: "Tripler",
      cost() {return new Decimal(7).pow(getBuyableAmount(this.layer, 12)).times(100)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `Triple your zero gain\n Cost: ${this.cost().round()}\n Effect: ${this.effect().round()}`},
      buy() {
        setBuyableAmount(this.layer, 12, new Decimal(getBuyableAmount(this.layer, 12)).add(1))
        player.points = new Decimal(player).points.sub(this.cost())
      },
      effect() {
        return new Decimal(3).pow(getBuyableAmount(this.layer, 12))
      }
    },
  },
    tabFormat: ["buyables",["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
  update(diff){
    player.points = player.points.min(1e6)
  }
})