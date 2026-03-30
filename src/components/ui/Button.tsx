import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'outline' | 'white'
  size?: 'default' | 'sm'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  external?: boolean
}

const VARIANTS = {
  primary: 'bg-brand-purple text-white hover:bg-brand-purple-light hover:shadow-lg hover:shadow-brand-purple/30',
  outline: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white',
  white: 'bg-white text-brand-purple hover:bg-brand-purple-bg',
}

const SIZES = {
  default: 'px-7 py-3 text-base',
  sm: 'px-5 py-2 text-sm',
}

export default function Button({
  children, href, variant = 'primary', size = 'default',
  className = '', type = 'button', disabled, onClick, external,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-heading font-semibold transition-all duration-300 hover:-translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href && external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>
  }

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return <button type={type} disabled={disabled} onClick={onClick} className={classes}>{children}</button>
}
