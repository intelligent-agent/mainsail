<template>
    <v-container
        class="px-0 py-2">
        <v-row>
            <v-col :class="'pb-3'">
                <v-subheader class="_fan-slider-subheader">
                    <span>{{ name }}</span>
                    <v-spacer></v-spacer>
                    <v-icon @click="switchOutputPin">
                        {{ value ? mdiToggleSwitch : mdiToggleSwitchOffOutline }}
                    </v-icon>
                </v-subheader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import { mdiToggleSwitch, mdiToggleSwitchOffOutline } from '@mdi/js'

@Component
export default class RecoreSlider extends Mixins(BaseMixin) {
    mdiToggleSwitch = mdiToggleSwitch
    mdiToggleSwitchOffOutline = mdiToggleSwitchOffOutline

    @Prop({ type: String, required: true })
    declare name: string

    @Prop({ type: String, required: true })
    declare type: string

    @Prop({ type: String, required: true })
    declare initialValue: string

    get value(): string {
        if (this.type == 'ssh'){
          return this.initialValue == 'yes' ? 1 : 0
        }
        else if (this.type == 'media'){
          return this.initialValue == 'emmc' ? 1 : 0
        }
        else {
          console.log("Unknown type: "+this.type)
        }
    }

    switchOutputPin(): void {
        const newVal = this.type == 'ssh' ? (this.value ? 'false' : 'true') : this.value ? 'usb' : 'emmc'
        const cmd = this.type == 'ssh' ? 'recore.enable_ssh' : 'recore.set_boot_media'
        this.$socket.emit(cmd, { type: this.type, value: newVal }, { action: 'printer/updateRecoreState' })
    }
}
</script>

<style scoped>
._fan-slider-subheader {
    height: auto;
}
</style>
