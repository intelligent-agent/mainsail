<template>
    <panel
        v-if="socketIsConnected && klipperState !== 'disconnected'"
        :icon="mdiCubeOutline"
        :title="$t('Panels.RecorePanel.Headline')"
        :collapsible="true"
        card-class="miscellaneous-panel">
        <div v-for="(object, index) of recore" :key="index">
            <v-divider v-if="index"></v-divider>
            <recore-slider :name="object.name" :type="object.type" :initial_value="object.value"></recore-slider>
        </div>
    </panel>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '../mixins/base'
import Panel from '@/components/ui/Panel.vue'
import { mdiCubeOutline } from '@mdi/js'
@Component({
    components: { Panel },
})
export default class RecorePanel extends Mixins(BaseMixin) {
    mdiCubeOutline = mdiCubeOutline

    get recore() {
        return this.$store.getters['server/getRecore'] ?? []
    }
}
</script>
