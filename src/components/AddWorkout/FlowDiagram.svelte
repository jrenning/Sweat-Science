<script lang="ts">
  import { Node, Svelvet, Minimap, Controls, type NodeConfig } from 'svelvet';


  let nodes: NodeConfig[] = []

    let current_y = 0
  function addLastNode() {
    current_y += 150
    let new_node: NodeConfig = {position: {x: 80, y: current_y}, width: 175, height: 100}
    nodes = [...nodes, new_node]
    console.log("Here")
    console.log(nodes)
  }
</script>


<button class="rounded-md bg-red-300 px-2 py-2 mb-8"
on:click={()=> addLastNode()}>
    Add Exercise
</button>
<Svelvet id="my-canvas" locked={true} width="{350}" height="{500}">
    {#each nodes as node, index}
    <Node {...node} id={index} />
    {/each}
  
</Svelvet>