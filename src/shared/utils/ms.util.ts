const s =1000
const m = 60 * s
const h = 60 * m
const d = 24 * h
const w = 7 * d
const y = 365.25 * d

type Unit = 
    | 'Years'
    | 'Year'
    | 'Yrs'
    | 'Yr'
    | 'Y'
    | 'Weeks'
    | 'Week'
    | 'W'
    | 'Days'
    | 'Day'
    | 'D'
    | 'Hours'
    | 'Hour'
    | 'Hrs'
    | 'Hr'
    | 'H'
    | 'Minutes'
    | 'Minute'
    | 'Mins'
    | 'Min'
    | 'M'
    | 'Seconds'
    | 'Second'
    | 'Secs'
    | 'Sec'
    | 'S'
    | 'Milliseconds'
    | 'Millisecond'
    | 'Msecs'
    | 'Msec'
    | 'Ms'
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

export type StringValue =
    | `${number}`
    | `${number}${UnitAnyCase}`
    | `${number} ${UnitAnyCase}`

export function ms(str: StringValue): number {
    if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
        throw new Error(`Invalid input: ${str}`);
    }

    const match=
        /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str)
    
    const groups = match?.groups as { value: string; type?: string } | undefined
    if (!groups) {
        throw new Error(`Invalid input: ${str}`);
    }
    const num = parseFloat(groups.value)
    const type = (groups.type ?? 'ms').toLowerCase() as Lowercase<Unit>

    switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return num * y
        case 'weeks':
        case 'week':
        case 'w':
            return num * w
        case 'days':
        case 'day':
        case 'd':
            return num * d
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return num * h
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
            return num * m
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return num * s
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return num
        default:
            throw new Error(`Invalid input: ${str}`);
    }
}