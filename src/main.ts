import CommonBtn from "@/components/CommonBtn.vue"
import type { App } from "vue"

export default function (app: App, _opts: any) {
    app.component('CommonBtn', CommonBtn)
    app.directive('focus', (el: HTMLElement) => el.focus())
    app.config.globalProperties.myMessage = 'hi world'
}