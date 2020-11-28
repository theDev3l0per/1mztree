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
      cost() {return new Decimal(6).pow(getBuyableAmount(this.layer, 11)).times(10)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `Double your zero gain\n Cost: ${this.cost().round()}\n Effect: ${this.effect().round()}`},
      buy() {
        setBuyableAmount(this.layer, 11, new Decimal(getBuyableAmount(this.layer, 11)).add(1))
        player.points = player.points.sub(this.cost())
      },
      effect() {
        return new Decimal(2).pow(getBuyableAmount(this.layer, 11))
      }
    },
  },
    tabFormat: ["buyables",["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]]
})