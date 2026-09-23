export type UserRole = 'cliente' | 'maestro';

export type TabType = 'explorar' | 'maestros' | 'mi-perfil' | 'metricas' | 'ajustes' | 'chat';

export interface Maestro {
  id: string;
  name: string;
  trade: string;
  badge?: string;
  badgeType?: 'top' | 'sec' | 'nuevo' | 'validado';
  secCode?: string;
  rating: number; // 1.0 to 7.0
  reviewCount: number;
  completedJobs: number;
  punctuality: number; // e.g. 100%
  avatar: string;
  phone: string;
  distanceKm: number;
  availableStatus: 'ahora' | 'hoy' | '24h';
  availableText: string;
  responseTime: string;
  diagnosticFee?: number;
  guaranteeDays?: number;
  specialtyTag: string;
  location: string;
  matchScore: number; // internal ordering score 0 - 100
  coordinates: { x: number; y: number }; // percentage on map
  isNewFairQuota?: boolean;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorInitials: string;
  dateText: string;
  commune: string;
  rating: number; // 1.0 to 7.0
  comment: string;
}

export interface ChatMessage {
  id: string;
  sender: 'maestro' | 'user';
  text?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageSize?: string;
  timestamp: string;
  isCallWidget?: boolean;
  callDuration?: string;
  callAgreement?: string;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: string;
  read: boolean;
  type: 'chat' | 'quote' | 'sos' | 'sync' | 'security';
  actionPath?: TabType;
}

export interface AppSettings {
  darkMode: boolean;
  pushEnabled: boolean;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  biometricLogin: boolean;
  e2eEncryption: boolean;
  searchRadiusKm: number;
  autoCloudSync: boolean;
  notifyNewQuotes: boolean;
  notifyChatMessages: boolean;
  notifySosAlerts: boolean;
  userCommune: string;
  fontSize: 'normal' | 'large';
}

export interface UserProfile {
  name: string;
  rut: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isLoggedIn: boolean;
  isVerified: boolean;
  lastCloudSync: string;
}
