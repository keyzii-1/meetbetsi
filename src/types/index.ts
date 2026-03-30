export interface TeamMember {
  name: string
  title: string
  image: string
  linkedin?: string
}

export interface StoryCard {
  title: string
  description: string
  href: string
  image: string
  videoId?: string
}

export interface BlogPost {
  title: string
  author: string
  date: string
  description: string
  href: string
  image: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}
