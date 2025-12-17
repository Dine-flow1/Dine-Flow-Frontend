import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Check, AlertCircle, Info, Star, TrendingUp, Clock } from "lucide-react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  withIcon?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClose?: () => void
  closeable?: boolean
  pulse?: boolean
  dot?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    rounded = 'full',
    withIcon = false,
    icon,
    iconPosition = 'left',
    onClose,
    closeable = false,
    pulse = false,
    dot = false,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    const handleClose = () => {
      setIsVisible(false)
      onClose?.()
    }

    if (!isVisible) return null

    const variantClasses = {
      default: "bg-gray-100 text-gray-900 border border-gray-200",
      primary: "bg-blue-100 text-blue-900 border border-blue-200",
      secondary: "bg-purple-100 text-purple-900 border border-purple-200",
      destructive: "bg-red-100 text-red-900 border border-red-200",
      outline: "bg-transparent text-gray-700 border border-gray-300",
      success: "bg-green-100 text-green-900 border border-green-200",
      warning: "bg-yellow-100 text-yellow-900 border border-yellow-200",
      info: "bg-cyan-100 text-cyan-900 border border-cyan-200",
    }

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs gap-1",
      md: "px-3 py-1 text-sm gap-1.5",
      lg: "px-4 py-1.5 text-base gap-2",
    }

    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    }

    const iconSize = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }

    // Default icons based on variant
    const defaultIcons = {
      success: <Check className={iconSize[size]} />,
      warning: <AlertCircle className={iconSize[size]} />,
      destructive: <AlertCircle className={iconSize[size]} />,
      info: <Info className={iconSize[size]} />,
      default: null,
      primary: null,
      secondary: null,
      outline: null,
    }

    const badgeIcon = icon || defaultIcons[variant]

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          variantClasses[variant],
          sizeClasses[size],
          roundedClasses[rounded],
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <div className={cn(
            "rounded-full mr-1.5",
            variant === 'success' && "bg-green-500",
            variant === 'warning' && "bg-yellow-500",
            variant === 'destructive' && "bg-red-500",
            variant === 'info' && "bg-cyan-500",
            variant === 'primary' && "bg-blue-500",
            variant === 'secondary' && "bg-purple-500",
            variant === 'default' && "bg-gray-500",
            variant === 'outline' && "bg-gray-400",
            size === 'sm' && "w-1.5 h-1.5",
            size === 'md' && "w-2 h-2",
            size === 'lg' && "w-2.5 h-2.5",
          )} />
        )}

        {/* Left icon */}
        {withIcon && badgeIcon && iconPosition === 'left' && (
          <span className="flex-shrink-0">
            {badgeIcon}
          </span>
        )}

        {/* Badge text/content */}
        <span className="whitespace-nowrap">
          {children}
        </span>

        {/* Right icon */}
        {withIcon && badgeIcon && iconPosition === 'right' && (
          <span className="flex-shrink-0">
            {badgeIcon}
          </span>
        )}

        {/* Close button */}
        {closeable && (
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              "ml-1.5 flex-shrink-0 rounded-full p-0.5 hover:bg-black/5 focus:outline-none focus:ring-1 focus:ring-current",
              iconSize[size]
            )}
            aria-label="Remove badge"
          >
            <X className="w-full h-full" />
          </button>
        )}
      </div>
    )
  }
)
Badge.displayName = "Badge"

// Pre-styled badge variants for common use cases
export const BadgeTrending = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'variant' | 'withIcon' | 'icon'>>(
  ({ className, ...props }, ref) => (
    <Badge
      ref={ref}
      variant="destructive"
      withIcon
      icon={<TrendingUp className="w-3.5 h-3.5" />}
      className={cn("bg-gradient-to-r from-orange-500 to-red-500 text-white border-0", className)}
      {...props}
    />
  )
)
BadgeTrending.displayName = "BadgeTrending"

export const BadgeNew = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'variant'>>(
  ({ className, ...props }, ref) => (
    <Badge
      ref={ref}
      variant="success"
      className={cn("bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0", className)}
      {...props}
    />
  )
)
BadgeNew.displayName = "BadgeNew"

export const BadgePopular = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'variant' | 'withIcon' | 'icon'>>(
  ({ className, ...props }, ref) => (
    <Badge
      ref={ref}
      variant="warning"
      withIcon
      icon={<Star className="w-3.5 h-3.5 fill-current" />}
      className={cn("bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0", className)}
      {...props}
    />
  )
)
BadgePopular.displayName = "BadgePopular"

export const BadgeLimited = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'variant' | 'withIcon' | 'icon'>>(
  ({ className, ...props }, ref) => (
    <Badge
      ref={ref}
      variant="destructive"
      withIcon
      icon={<Clock className="w-3.5 h-3.5" />}
      className={cn("bg-gradient-to-r from-red-500 to-pink-500 text-white border-0", className)}
      {...props}
    />
  )
)
BadgeLimited.displayName = "BadgeLimited"

export { Badge }