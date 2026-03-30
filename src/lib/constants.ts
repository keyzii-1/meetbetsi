import { TeamMember, StoryCard, BlogPost, NavLink } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Stories', href: '/stories/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'The Team', href: '/team/' },
  { label: 'Contact', href: '/contact/' },
]

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/meet-besti' },
  { label: 'Instagram', href: 'https://instagram.com/meetbetsi' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61574102534685' },
  { label: 'X', href: 'https://x.com/meetbesti' },
  { label: 'YouTube', href: 'https://www.youtube.com/@meetbetsi' },
]

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Sergio M. Fernandez', title: 'Chief Executive Officer', image: '/images/team/sergio-m-fernandez.png' },
  { name: 'Rafael A. Yániz', title: 'Chief Operating Officer', image: '/images/team/rafael-yaniz.jpg', linkedin: 'https://www.linkedin.com/in/rafaelyaniz/' },
  { name: 'Dr. Sergio Fernandez, PhD', title: 'Chief Technical Officer', image: '/images/team/dr-sergio-fernandez.png' },
  { name: 'Dr. Kimberly Fernandez, MD', title: 'Chief Medical Officer', image: '/images/team/dr-kimberly-fernandez.jpg' },
  { name: 'Aaron Lyndon', title: 'Chief Product Officer', image: '/images/team/aaron-lyndon.png' },
  { name: 'Sophia Fernandez', title: 'Head of Brand Voice & Content', image: '/images/team/sophia-fernandez.png' },
  { name: 'Darice Gall', title: 'President of Meet Betsi Foundation', image: '/images/team/darice-gall.png' },
]

export const STORIES: StoryCard[] = [
  {
    title: "Ashley's Story",
    description: 'A mother shares the daily challenges of raising her son with SYNGAP1 and the constant struggle to train new caregivers who truly understand his needs.',
    href: '/stories/ashleys-story/',
    image: '/images/home/stories-teaser.png',
    videoId: 'dlH7-_sNMkM',
  },
  {
    title: "Lauren's Story",
    description: 'A full-time caregiver to both her nonverbal son and aging father, Lauren opens up about the emotional and physical toll of care.',
    href: '/stories/laurens-story/',
    image: '/images/home/stories-teaser.png',
    videoId: '0UeBLj2AGxo',
  },
  {
    title: "Betsy's Story",
    description: 'The story that started it all — how one family\'s need inspired a platform for every family.',
    href: '/stories/betsys-story/',
    image: '/images/home/betsy-story.png',
    videoId: 'S0fjls8OHeU',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How to Train Caregivers',
    author: 'Aaron Lyndon',
    date: 'March 12, 2019',
    description: 'If you have a loved one with special needs, you understand the enormous responsibility of ensuring their daily care.',
    href: '/blog/how-to-train-caregivers/',
    image: '/images/blog/caregiver-training-hero.png',
  },
]
