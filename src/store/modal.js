import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
    editPPM: false,
    editPH: false
}

const context = persist('modal', data)

export default context
