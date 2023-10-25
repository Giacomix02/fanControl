import { invoke } from '@tauri-apps/api/tauri'
import { db } from './database'
import {Mode} from './modes'
import { getModeValue } from './modes'
import { getModeArgument } from './modes'

let on = document.getElementById('turboOn')! as HTMLButtonElement

let off = document.getElementById('turboOff')! as HTMLButtonElement

let slider = document.getElementById('mode-slider')! as HTMLInputElement

let infoMode = document.getElementById('mode-info')! as HTMLAnchorElement

let applyButton = document.getElementById('mode-button') as HTMLButtonElement

const turboOn = async ()=>{
    await invoke('turbo_on')
    db.setTurbo(true)
    on.classList.add("button-red-border")
    off.classList.remove("button-red-border")
}

const turboOff = async ()=>{
    await invoke('turbo_off')
    db.setTurbo(false)
    off.classList.add("button-red-border")
    on.classList.remove("button-red-border")
}

const modeActivation = async ()=>{
    await invoke('manual',{ mode: getModeArgument(slider.value as Mode)})
    db.setMode(slider.value as Mode) 
    
}


on.addEventListener('click', turboOn)

off.addEventListener('click', turboOff)


slider.addEventListener('input', () => {
    infoMode.innerHTML = getModeValue(slider.value as Mode)
})

applyButton.addEventListener("click", modeActivation)


window.addEventListener("load", () => {
    if(db.getTurbo()){
        on.classList.add("button-red-border")
        off.classList.remove("button-red-border")
    }else{
        off.classList.add("button-red-border")
    }
    if(slider.value !== db.getMode()){ 
        slider.value = db.getMode()!
        modeActivation()
    }
    
});



