import { invoke } from '@tauri-apps/api/tauri'


let on = document.getElementById('turboOn')! as HTMLButtonElement

let off = document.getElementById('turboOff')! as HTMLButtonElement

let slider = document.getElementById('mode-slider')! as HTMLInputElement

let infoMode = document.getElementById('mode-info')! as HTMLAnchorElement

let applyButton = document.getElementById('mode-button') as HTMLButtonElement


on.addEventListener('click', () => {
    invoke('turbo_on')
})

off.addEventListener('click', () => {
    invoke('turbo_off')
})

slider.addEventListener('input', () => {
    infoMode.innerHTML = values[slider.value as Mode]
})

applyButton.addEventListener("click",()=>{
    console.log("test")
    invoke('manual',{ mode: modeArgument[slider.value as Mode] })
})


enum Mode {
    Default = "0",
    Quiet = "1",
    Cool = "2",
    Performance = "3",
    Extreme = "4",
    Eco = "5"
}

const values = {
    [Mode.Default]: "Default",
    [Mode.Quiet]: "Quiet",
    [Mode.Cool]: "Cool",
    [Mode.Performance]: "Performance",
    [Mode.Extreme]: "Extreme",
    [Mode.Eco]: "Eco"
}satisfies Record<Mode, string>

const modeArgument={
    [Mode.Default]: "0x0000",
    [Mode.Quiet]: "0x0003",
    [Mode.Cool]: "0x0002",
    [Mode.Performance]: "0x0001",
    [Mode.Extreme]: "0x0004",
    [Mode.Eco]: "0x0100"
}satisfies Record<Mode, string>



