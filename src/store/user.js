import { persist } from '@/assets/library/CommonFunctions.js'

const data = {
    username: '',
}

const context = persist('user', data)

export default context
