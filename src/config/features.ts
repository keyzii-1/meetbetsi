/**
 * Master registry of all platform features.
 * Each feature has a key and is toggled per-org via OrgConfig.
 * Features are grouped by domain for readability.
 */

export const FEATURE_KEYS = {
  // Marketing & Public
  MARKETING_SITE: 'marketing_site',
  BLOG: 'blog',
  STORIES: 'stories',

  // Training
  TRAINING_MODULES: 'training_modules',
  VIDEO_UPLOAD: 'video_upload',
  AI_AVATAR_OVERLAYS: 'ai_avatar_overlays',
  MEDICAL_REVIEW_WORKFLOW: 'medical_review_workflow',
  CAREGIVER_ASSESSMENTS: 'caregiver_assessments',

  // Scheduling
  SHIFT_MANAGEMENT: 'shift_management',
  CHECK_IN_OUT: 'check_in_out',
  GEOFENCING: 'geofencing',
  TIMESHEET_EXPORT: 'timesheet_export',

  // Communications
  DIRECT_MESSAGES: 'direct_messages',
  GROUP_CHANNELS: 'group_channels',
  THREADED_REPLIES: 'threaded_replies',

  // Documents
  DOCUMENT_STORAGE: 'document_storage',
  DOCUMENT_VERSIONING: 'document_versioning',
  DOCUMENT_EXPIRATION_ALERTS: 'document_expiration_alerts',

  // AI
  AI_CARE_ASSISTANT: 'ai_care_assistant',
  ACTION_LOGGING: 'action_logging',
  ESCALATION_DETECTION: 'escalation_detection',

  // White-Label
  CUSTOM_BRANDING: 'custom_branding',
  CUSTOM_DOMAIN: 'custom_domain',
  WHITE_LABEL_EMAILS: 'white_label_emails',
} as const

export type FeatureKey = typeof FEATURE_KEYS[keyof typeof FEATURE_KEYS]

/** All feature keys as an array — useful for iteration */
export const ALL_FEATURE_KEYS = Object.values(FEATURE_KEYS)
