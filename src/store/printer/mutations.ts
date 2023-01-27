import Vue from 'vue'
import { getDefaultState } from './index'
import { MutationTree } from 'vuex'
import { PrinterState } from '@/store/printer/types'
import { setDataDeep } from '@/plugins/helpers'

export const mutations: MutationTree<PrinterState> = {
    reset(state) {
        const defaultState = getDefaultState()

        for (const key of Object.keys(state)) {
            if (!(key in defaultState) && key !== 'tempHistory') {
                delete state[key]
            }
        }

        for (const [key, value] of Object.entries(defaultState)) {
            Vue.set(state, key, value)
        }
    },

    setData(state, payload) {
        setDataDeep(state, payload)
    },

    setBedMeshProfiles(state, payload) {
        if ('bed_mesh' in state) {
            Vue.set(state.bed_mesh, 'profiles', payload)
        }
    },

    setHelplist(state, payload) {
        const helplist = []

        for (const [command, description] of Object.entries(payload)) {
            helplist.push({
                commandLow: command.toLowerCase(),
                command: command,
                description: description,
            })
        }

        Vue.set(state, 'helplist', helplist)
    },

    clearCurrentFile(state) {
        Vue.set(state, 'current_file', {})
    },

    setEndstopStatus(state, payload) {
        delete payload.requestParams

        Vue.set(state, 'endstops', payload)
    },

    removeBedMeshProfile(state, payload) {
        if ('bed_mesh ' + payload.name in state.configfile.config) {
            Object.assign(state.configfile.config['bed_mesh ' + payload.name], { deleted: true })
        }
    },

    setRecoreSshEnabled(state, is_enabled){
      Vue.set(state, 'recore_state', {
        'ssh_enabled': is_enabled,
        'boot_media': state.recore_state.boot_media
      })
    },

    setRecoreBootMedia(state, boot_media){
      Vue.set(state, 'recore_state', {
        'ssh_enabled': state.recore_state.ssh_enabled,
        'boot_media': boot_media
      })
    },

    setRecoreState(state, payload) {
        Vue.set(state, 'recore_state', {
          'ssh_enabled': payload.ssh_enabled,
          'boot_media': payload.boot_media
        })
    },
}
