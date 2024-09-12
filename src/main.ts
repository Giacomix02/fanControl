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

let resetButton = document.getElementById('reset-button') as HTMLButtonElement

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
    if(slider.value as Mode === Mode.Off){
        alert("Pay attention! Turning off the fan can cause overheating of the system.")
    }
    //await invoke('manual',{ mode: getModeArgument(slider.value as Mode)})
    //db.setMode(slider.value as Mode) 
}


on.addEventListener('click', turboOn)

off.addEventListener('click', turboOff)


slider.addEventListener('input', () => {
    infoMode.innerHTML = getModeValue(slider.value as Mode)
    if(slider.value as Mode === Mode.Unset){
        applyButton.disabled = true
    }else{
        applyButton.disabled = false
    }
})

applyButton.addEventListener("click", modeActivation)

resetButton.addEventListener("click", async ()=>{
    db.deleteAll();
    slider.value = "5"
    infoMode.innerHTML = getModeValue(slider.value as Mode)
    on.classList.remove("button-red-border")
    off.classList.add("button-red-border")
})


window.addEventListener("load", () => {
    if(db.getTurbo()){
        on.classList.add("button-red-border")
        off.classList.remove("button-red-border")
    }else{
        off.classList.add("button-red-border")
    }

    console.log(db.getMode())

    if(slider.value !== db.getMode() && db.getMode() !== Mode.Unset){ 
        slider.value = db.getMode()!
        infoMode.innerHTML = getModeValue(slider.value as Mode)
        modeActivation()
    }else{
        applyButton.disabled = true
        slider.value = "5"
        infoMode.innerHTML = getModeValue(slider.value as Mode)
    }
    
});

