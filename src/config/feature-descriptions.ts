import { FEATURE_KEYS, type FeatureKey } from './features'

interface FeatureMeta {
  label: string
  description: string
  domain: string
}

export const FEATURE_DESCRIPTIONS: Record<FeatureKey, FeatureMeta> = {
  [FEATURE_KEYS.MARKETING_SITE]: { label: 'Marketing Site', description: 'Public-facing marketing pages', domain: 'Marketing' },
  [FEATURE_KEYS.BLOG]: { label: 'Blog', description: 'Blog posts and content', domain: 'Marketing' },
  [FEATURE_KEYS.STORIES]: { label: 'Stories', description: 'Family and caregiver stories', domain: 'Marketing' },
  [FEATURE_KEYS.TRAINING_MODULES]: { label: 'Training Modules', description: 'Create and assign caregiver training with video', domain: 'Training' },
  [FEATURE_KEYS.VIDEO_UPLOAD]: { label: 'Video Upload', description: 'Upload training videos', domain: 'Training' },
  [FEATURE_KEYS.AI_AVATAR_OVERLAYS]: { label: 'AI Avatar Overlays', description: 'AI-generated avatar overlays on training videos', domain: 'Training' },
  [FEATURE_KEYS.MEDICAL_REVIEW_WORKFLOW]: { label: 'Medical Review', description: 'Doctor review workflow for training content', domain: 'Training' },
  [FEATURE_KEYS.CAREGIVER_ASSESSMENTS]: { label: 'Assessments', description: 'Quizzes and assessments after training', domain: 'Training' },
  [FEATURE_KEYS.SHIFT_MANAGEMENT]: { label: 'Shift Management', description: 'Create and manage caregiver shifts', domain: 'Scheduling' },
  [FEATURE_KEYS.CHECK_IN_OUT]: { label: 'Check-in/out', description: 'Caregiver shift check-in and check-out', domain: 'Scheduling' },
  [FEATURE_KEYS.GEOFENCING]: { label: 'Geofencing', description: 'Location-based check-in verification', domain: 'Scheduling' },
  [FEATURE_KEYS.TIMESHEET_EXPORT]: { label: 'Timesheet Export', description: 'Export timesheets for payroll', domain: 'Scheduling' },
  [FEATURE_KEYS.DIRECT_MESSAGES]: { label: 'Direct Messages', description: 'One-on-one messaging', domain: 'Communications' },
  [FEATURE_KEYS.GROUP_CHANNELS]: { label: 'Group Channels', description: 'Team chat channels', domain: 'Communications' },
  [FEATURE_KEYS.THREADED_REPLIES]: { label: 'Threaded Replies', description: 'Reply threads on messages', domain: 'Communications' },
  [FEATURE_KEYS.DOCUMENT_STORAGE]: { label: 'Document Storage', description: 'Upload and store documents', domain: 'Documents' },
  [FEATURE_KEYS.DOCUMENT_VERSIONING]: { label: 'Document Versioning', description: 'Track document versions', domain: 'Documents' },
  [FEATURE_KEYS.DOCUMENT_EXPIRATION_ALERTS]: { label: 'Expiration Alerts', description: 'Alerts when documents expire', domain: 'Documents' },
  [FEATURE_KEYS.AI_CARE_ASSISTANT]: { label: 'AI Care Assistant', description: 'AI-powered care recommendations', domain: 'AI' },
  [FEATURE_KEYS.ACTION_LOGGING]: { label: 'Action Logging', description: 'Log all care actions automatically', domain: 'AI' },
  [FEATURE_KEYS.ESCALATION_DETECTION]: { label: 'Escalation Detection', description: 'AI detects care escalation situations', domain: 'AI' },
  [FEATURE_KEYS.CUSTOM_BRANDING]: { label: 'Custom Branding', description: 'Custom colors, logos, and fonts', domain: 'White-Label' },
  [FEATURE_KEYS.CUSTOM_DOMAIN]: { label: 'Custom Domain', description: 'Use your own domain', domain: 'White-Label' },
  [FEATURE_KEYS.WHITE_LABEL_EMAILS]: { label: 'White-Label Emails', description: 'Emails sent from your domain', domain: 'White-Label' },
}

/** Get features grouped by domain */
export function getFeaturesByDomain() {
  const groups: Record<string, Array<FeatureMeta & { key: FeatureKey }>> = {}
  for (const [key, meta] of Object.entries(FEATURE_DESCRIPTIONS)) {
    if (!groups[meta.domain]) groups[meta.domain] = []
    groups[meta.domain].push({ ...meta, key: key as FeatureKey })
  }
  return groups
}
