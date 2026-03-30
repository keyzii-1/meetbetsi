export interface Subscriber {
  email: string
  source_page: string
}

export interface ContactSubmission {
  name: string
  email: string
  subject?: string
  message: string
}
