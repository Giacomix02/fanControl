export enum Mode {
    Default = "0",
    Off = "1",
    Quiet = "2",
    Performance = "3",
    Extreme = "4",
    Unset = "5"
}

const modeValues = {
    [Mode.Off]: "Off",
    [Mode.Quiet]: "Quiet",
    [Mode.Default]: "Default",
    [Mode.Performance]: "Performance",
    [Mode.Extreme]: "Max",
    [Mode.Unset]: "Unset"
}satisfies Record<Mode, string>

const modeArgument={
    [Mode.Off]: "0000",
    [Mode.Quiet]: "0f0f",
    [Mode.Default]: "1e1e",
    [Mode.Performance]: "2828",
    [Mode.Extreme]: "3232",
    [Mode.Unset]: "unset"
}satisfies Record<Mode, string>


export function getModeValue(mode:Mode){
    return modeValues[mode]
}


export function getModeArgument(mode:Mode){
    return modeArgument[mode]
}
