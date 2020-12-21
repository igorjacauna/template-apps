import Vue from 'vue'
import Vuedl from 'vuedl/src/index'
import NotificationLayout from 'vuedl/src/components/NotificationLayout.vue'
import DialogLayout from '~/components/dialogs/DialogLayout'
import Notification from '~/components/dialogs/Notification'
import Toast from '~/components/dialogs/Toast'
import ToastLayout from '~/components/dialogs/ToastLayout'

export default (context, inject) => {
  if (!process.client) {
    return
  }

  const keys = Object.keys(context.app).filter(key =>
    key.startsWith('$') || ['router', 'i18n', 'store', 'vuetify', 'apollo'].includes(key))

  const contextVuedl = Object.assign({}, ...keys.map((prop) => {
    if (context.app[prop]) {
      return {
        [prop]: context.app[prop]
      }
    }
    return {}
  }))
  contextVuedl.route = context.route

  Vue.use(Vuedl, {
    context: contextVuedl,
    container: '[data-app=true]'
  })
  const instance = Vue.prototype.$dialog
  instance.layout('default', DialogLayout)
  instance.layout('notification', NotificationLayout)
  instance.layout('snackbar', ToastLayout)

  // eslint-disable-next-line vue/one-component-per-file
  instance.component('notification', Notification, {
    waitForResult: true
  })

  // eslint-disable-next-line vue/one-component-per-file
  instance.component('toast', Toast, {
    waitForResult: true
  })

  instance.message = {
    info: (message, options) => instance.toast({ text: message, color: 'info', ...options }),
    error: (message, options) => instance.toast({ text: message, color: 'error', ...options }),
    success: (message, options) => instance.toast({ text: message, color: 'success', ...options }),
    warning: (message, options) => instance.toast({ text: message, color: 'warning', ...options })
  }

  instance.notify = {
    info: async (message, options) => await instance.notification({ text: message, color: 'info', ...options }),
    error: async (message, options) => await instance.notification({ text: message, color: 'error', ...options }),
    success: async (message, options) => await instance.notification({ text: message, color: 'success', ...options }),
    warning: async (message, options) => await instance.notification({ text: message, color: 'warning', ...options })
  }

  if (instance) {
    inject('$dialog', instance)
  }
}
