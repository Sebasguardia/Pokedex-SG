interface TypeSvgIconProps {
    type: string
    size?: number
    className?: string
    style?: React.CSSProperties
}

// Types that have a local SVG in /public/icons/
const TYPES_WITH_SVG = new Set([
    "bug", "dark", "dragon", "electric", "fairy", "fighting",
    "fire", "flying", "ghost", "grass", "ground", "ice",
    "normal", "poison", "psychic", "rock", "steel", "water"
])

export function TypeSvgIcon({ type, size = 24, className = "", style }: TypeSvgIconProps) {
    if (!TYPES_WITH_SVG.has(type)) return null

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`/icons/${type}.svg`}
            alt={`${type} type`}
            width={size}
            height={size}
            className={className}
            style={style}
            aria-hidden="true"
        />
    )
}
