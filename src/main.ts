import { invoke } from '@tauri-apps/api/tauri'


let on = document.getElementById('turboOn')! as HTMLButtonElement

let off = document.getElementById('turboOff')! as HTMLButtonElement


on.addEventListener('click', () => {
    invoke('turbo_on')
})

off.addEventListener('click', () => {
    invoke('turbo_off')
})

