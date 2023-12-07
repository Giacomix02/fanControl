export enum Mode {
    Default = "0",
    Quiet = "1",
    Cool = "2",
    Performance = "3",
    Extreme = "4",
    Eco = "5"
}

const modeValues = {
    [Mode.Default]: "Default",
    [Mode.Quiet]: "Quiet",
    [Mode.Cool]: "Cool",
    [Mode.Performance]: "Performance",
    [Mode.Extreme]: "Extreme",
    [Mode.Eco]: "Eco"
}satisfies Record<Mode, string>

const modeArgument={
    [Mode.Default]: "0x00",
    [Mode.Quiet]: "0x03",
    [Mode.Cool]: "0x02",
    [Mode.Performance]: "0x01",
    [Mode.Extreme]: "0x04",
    [Mode.Eco]: "0x01"
}satisfies Record<Mode, string>


export function getModeValue(mode:Mode){
    return modeValues[mode]
}


export function getModeArgument(mode:Mode){
    return modeArgument[mode]
}
