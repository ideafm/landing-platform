<template>
  <div>
    <div v-if="id !== 'root'" class="relative" :class="{'is-active': devActive, 'no-children': !children}" @mouseenter="devActive = true" @mouseleave="devActive = false">
      <slot/>
      <div class="absolute right-0 top-0 bg-white text-blue-500 text-xl flex space-x-2" :style="{zIndex}" v-if="devActive">
        <font-awesome-icon :icon="down" @click.prevent.stop="moveDown()" class="icon cursor-pointer " />
        <font-awesome-icon :icon="up" @click.prevent.stop="moveUp()" class="icon cursor-pointer " />
        <font-awesome-icon :icon="cog" @click.prevent.stop="edit()" class="icon cursor-pointer " />
        <font-awesome-icon :icon="trash" @click.prevent.stop="remove()" class="icon cursor-pointer " />
        <font-awesome-icon :icon="plus" @click.prevent.stop="addChild()" class="icon cursor-pointer " />
      </div>
    </div>
    <div v-else>
      <slot />
    </div>
    <modal v-if="editNode" @close="editNode = null">
      <config-component :component="currentRegItem" mode="edit" :currentNode="currentNode" @save="save" />
    </modal> 
    <modal v-if="pathModal" @close="pathModal = false"> 
      <path-modal :path="currentIdPath" @select="pathModalSelect" />
    </modal>
    <modal v-if="registryModal" @close="registryModal = false"> 
      <registry-modal @close="registryModalClose" :parentId="addChildParentId" />
    </modal>
  </div>
</template>

<script>
import { faCog, faArrowUp, faArrowDown, faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { storeActions } from '../store';
import registry from '../helpers/registry';
import registryModal from './registryModal.vue';

export default {
  components: { registryModal },
  props: ['id'],
  data() {
    return {
      devActive: false,
      editNode: false,
      currentNode: null,
      currentRegItem: null,
      registryModal: false,
      pathModal: false,
      currentIdPath: [],
      addChildParentId: null,
    }
  },
  computed: {
    cog() {
      return faCog
    },
    up() {
      return faArrowUp
    },
    down() {
      return faArrowDown
    },
    trash() {
      return faTrash
    },
    plus() {
      return faPlusCircle
    },
    children() {
      return !!this.$slots.default[0].children
    },
    zIndex() {
      if(this.currentIdPath.length) {
        return this.currentIdPath.length * 10;
      }
      return 0;
    }
  },
  mounted() {
    if(this.id !== 'root') {
      let { path, node } = storeActions.getInfoById(this.id);
      this.currentIdPath = path;
      this.currentNode = node;
      this.addChildParentId = this.id;
    }
  },
  methods: {
    pathModalSelect(id) {
      this.pathModal = false;
      this.pathModalAction && this[this.pathModalAction](id);
      this.pathModalAction = null;
    },
    registryModalClose() {
      this.registryModal = false;
      this.addChildParentId = this.id;
    },
    edit(selectedId = null) {
      if(!selectedId && this.currentIdPath.length !== 1) {
        this.pathModal = true;
        this.pathModalAction = 'edit';
        return;
      }
      let id = selectedId || this.id;
      let { node } = storeActions.getInfoById(id);
      let regItem = registry.find(item => {
        return node.tag === this.$state.prefix + item.name;
      })
      if(regItem) {
        this.currentRegItem = regItem;
        this.currentNode = node;
        this.editNode = true;
      }
    },
    addChild(selectedId = null) {
      console.log('selected id ', selectedId, this.id);
      if(!selectedId && this.currentIdPath.length !== 1) {
        this.pathModal = true;
        this.pathModalAction = 'addChild';
        return;
      }
      this.addChildParentId = selectedId || this.id;
      console.log(this.addChildParentId);
      this.registryModal = true;
    },
    save() {
      this.currentRegItem = null;
      this.currentNode = null;
      this.editNode = false;
    },
    moveUp() {
      storeActions.moveUp(this.id);
    },
    moveDown() {
      storeActions.moveDown(this.id);
    },
    remove(selectedId = null) {
      if(!selectedId && this.currentIdPath.length !== 1) {
        this.pathModal = true;
        this.pathModalAction = 'remove';
        return;
      }
      let id = selectedId || this.id;
      storeActions.remove(id);
    }
  }
}
</script>

<style scoped>
.is-active {
  box-shadow: inset 0 0 0 2px red;
}
</style>