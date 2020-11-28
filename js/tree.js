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
      cost() {return new Decimal(1500)},
      canAfford() {
        return new Decimal(player.points).gte(this.cost())
      },
      unlocked() {return true},
      display() {return `Double your zero gain`},
      buy() {
        
      },
      effect() {
        return new Decimal(0)
      }
    },
  },
    tabFormat: ["buyables",["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]]
})