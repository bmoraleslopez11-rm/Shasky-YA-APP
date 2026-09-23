import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TabType,
  UserRole,
  Maestro,
  ReviewItem,
  ChatMessage,
  PushNotification,
  AppSettings,
  UserProfile,
} from '../types';

export const INITIAL_MAESTROS: Maestro[] = [
  {
    id: 'ricardo-lopez',
    name: 'Ricardo López',
    trade: 'Electricidad Domiciliaria e Industrial',
    badge: 'SEC V-419',
    badgeType: 'sec',
    secCode: 'SEC V-419',
    rating: 6.8,
    reviewCount: 48,
    completedJobs: 142,
    punctuality: 100,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCC5IYAKIv7gy2IDDKkFp4uhVkQ44rIy3s1b0sOhaIJqD_-tsbijCmBQn2dP7mOeDEXkkU7XvzhEMnMWqtlHPyFFDs-TtR7eZ6pLMwddLchWsOSIL1BSBDYJ_sw5JsFYLZ_UYfUwm9_Afc-EjpJWIQ01_coNmI6XWVRcLlXML15nj9s63IUQaOn3DHlBWvX1L_SbTLOYLlpPWa67cQVPPcu4s1rWXFHcGhIRnhXThCHz1sYpTl_Tvhb',
    phone: '+56 9 7381 2910',
    distanceKm: 1.8,
    availableStatus: 'ahora',
    availableText: 'Disponible ahora',
    responseTime: '< 5 min',
    diagnosticFee: 20000,
    guaranteeDays: 90,
    specialtyTag: 'Tableros, sobrecargas y certificación SEC',
    location: 'Providencia / Santiago',
    matchScore: 100,
    coordinates: { x: 33, y: 25 },
  },
  {
    id: 'matias-concha',
    name: 'Matías Concha',
    trade: 'Gasfitería General & Filtraciones',
    badge: 'Nuevo en Shasky Ya',
    badgeType: 'nuevo',
    rating: 6.2,
    reviewCount: 3,
    completedJobs: 12,
    punctuality: 98,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXKrwFHsbl0P6zD0wRFJa5QxDzK87htBxZD_tCFttvncl6FYBojQsyjqRdfyBiyn2Mng-XW7jBCdCzjVUvanog-4_rrbAx1xrHJJs4AvjaCq24kOQqZ1cD3Dw1H-_2-5Gkxrq0ysKVv29RXfVjMW4RJ3WAi1Z2Ioj6YODP_4Pkbpq7EFTk-ZO4VNsOrdthMcIDuBe9zUwQWf8q9jFZLdr25Wm610fXiZTy7noJGFXVwmW8xQIPS5eI',
    phone: '+56 9 6124 5087',
    distanceKm: 2.5,
    availableStatus: 'hoy',
    availableText: 'Disponible hoy',
    responseTime: '~10 min',
    diagnosticFee: 15000,
    guaranteeDays: 60,
    specialtyTag: 'Detección de fugas, destapes y calefón',
    location: 'Providencia, Santiago',
    matchScore: 89,
    coordinates: { x: 74, y: 50 },
    isNewFairQuota: true,
  },
  {
    id: 'manuel-silva',
    name: 'Don Manuel Silva',
    trade: 'Gasfíter Instalador SEC Clase 1',
    badge: 'Top Maestro',
    badgeType: 'top',
    rating: 6.9,
    reviewCount: 42,
    completedJobs: 215,
    punctuality: 100,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3Cyfd5nRsTEtEaJkgDW7A60pBQjg-c1yp32DrBmhWz_RGY9TMTq7_huAU-CGg2cYrD7BdnFIyEgp-CkrPDQ9Nqd9rFTfQtO4PDH2qs1xazHgoR4wPVJs0IdyTRgnn9ucZnCYgu1UhdmhC7luTRIYq_nDl0dGn909hCS7neauuYSF0OdjrHrr_5NIq2CfBPhI2MQvybUO67CKi0EURbo2OfdAtkAd7fneJYTuqRNg-v1ntVdc5ejt',
    phone: '+56 9 8450 2218',
    distanceKm: 2.1,
    availableStatus: 'ahora',
    availableText: 'Disponible ahora',
    responseTime: '< 5 min',
    diagnosticFee: 20000,
    guaranteeDays: 90,
    specialtyTag: 'Instalaciones a gas, calderas y redes sanitarias',
    location: 'Las Condes / Vitacura',
    matchScore: 98,
    coordinates: { x: 55, y: 35 },
  },
  {
    id: 'carlos-morales',
    name: 'Carlos Morales',
    trade: 'Maestro Albañil y Estructuras',
    badge: 'Validado',
    badgeType: 'validado',
    rating: 6.7,
    reviewCount: 28,
    completedJobs: 79,
    punctuality: 96,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsPUwadzF5FlPK9-DIyxjGZEtvGfTcbbXYXdCPguCcAAdNtSXIcXr-Plab7dy281NacSe6AwkIZbeg-mnlLxodFkOjlVTttEB6DYbi1_2i71iGCV-8DYf2fiT5EKmFpasN2KJZyqjvIWRn44lK1PC2CmTh441Khk38zvvgdW6-Nk1GRBA5TLDnmrlAidGxVdEa1RehHJbVRMRohY9Btc7xhArShMZvc62JESnF_b64Fd6IHC4emN-',
    phone: '+56 9 4322 7751',
    distanceKm: 3.4,
    availableStatus: 'hoy',
    availableText: 'Hoy desde 14:00',
    responseTime: '~15 min',
    diagnosticFee: 25000,
    guaranteeDays: 180,
    specialtyTag: 'Ampliaciones, radier, muros y tabiquería',
    location: 'Ñuñoa / La Reina',
    matchScore: 92,
    coordinates: { x: 60, y: 70 },
  },
  {
    id: 'javier-valenzuela',
    name: 'Javier Valenzuela',
    trade: 'Pintor & Terminaciones Finas',
    badge: 'Nuevo Verificado',
    badgeType: 'nuevo',
    rating: 6.3,
    reviewCount: 6,
    completedJobs: 18,
    punctuality: 100,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBz9NRGVT6Y1uBBNYm7rPsc1scd8T-XYVgwEp9m8mzv0KasYb7MJziRs_S4Oy1Z_oZ8TaUC_wmdarRQzk5O8OYXRc1SzXDS4Rqgv10RsQFuy0ynitv4tnaYwNP91X_-97OLXspTAy5D-9Y2Nd3lvUfVzlH9fVYGBynC1eRzCL_Q9iMmvNz4DhyI2lnZL9hdo7lQRUPBTXU63wjpD3FDN99lYXHlxWCUVHbqMVTUO5AyHg--zvyUFDoD',
    phone: '+56 9 5304 1186',
    distanceKm: 1.2,
    availableStatus: 'ahora',
    availableText: 'Disponible ahora',
    responseTime: '< 8 min',
    diagnosticFee: 10000,
    guaranteeDays: 90,
    specialtyTag: 'Pintura esmalte, látex, empastado y molduras',
    location: 'Providencia / Santiago Centro',
    matchScore: 90,
    coordinates: { x: 26, y: 68 },
    isNewFairQuota: true,
  },
  {
    id: 'roberto-fuenzalida',
    name: 'Roberto Fuenzalida',
    trade: 'Electricidad Domiciliaria & TE1',
    badge: 'SEC Clase B',
    badgeType: 'sec',
    secCode: 'SEC B-812',
    rating: 6.6,
    reviewCount: 19,
    completedJobs: 64,
    punctuality: 97,
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6HmEbnPIehVjPi2ODSDo6ZRB8W-cgpp_L2uRNAcMpUKLv0PgwSmMfIN3DCg-tyCbKQ_j9gFoqD4K0C-RzxkPAmzgApwWMZu9Q-jiyubDaHZ49bGqvsBQOnJK2c3vsefUJJVzAhM1ge1dLTFZXS7GfRQ5JnMKOjMkLWD18cBBlImGCsSs4s43viuG3OnRsEfj9aEFz1fNbuKBkSHB8kiIpxkTIXW7Bi7rPgqGZ0pzN-QF9bp2keWjx',
    phone: '+56 9 9218 3044',
    distanceKm: 4.8,
    availableStatus: 'hoy',
    availableText: 'Agendable hoy',
    responseTime: '~20 min',
    diagnosticFee: 20000,
    guaranteeDays: 90,
    specialtyTag: 'Tableros, sobrecargas y firma de planos SEC',
    location: 'Santiago Oriente',
    matchScore: 88,
    coordinates: { x: 80, y: 20 },
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Camila Edwards',
    authorInitials: 'CE',
    dateText: 'Hace 2 días',
    commune: 'Providencia',
    rating: 7.0,
    comment:
      '“Excelente trabajo. Llegó puntual, explicó el costo antes de empezar y dejó todo limpio.”',
  },
  {
    id: 'rev-2',
    authorName: 'Gonzalo Tapia',
    authorInitials: 'GT',
    dateText: 'Hace 1 semana',
    commune: 'Ñuñoa',
    rating: 6.5,
    comment:
      '“Muy buen maestro, respondió de inmediato a la emergencia un día sábado. Muy recomendado.”',
  },
  {
    id: 'rev-3',
    authorName: 'Francisca M.',
    authorInitials: 'FM',
    dateText: 'Hace 3 semanas',
    commune: 'Las Condes',
    rating: 6.8,
    comment: '“Cumplió en tiempo y presupuesto exacto. Muy confiable.”',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'maestro',
    text: '¡Hola Camila! Vi tu solicitud por la filtración del baño. Puedo pasar hoy a las 16:30 hrs a revisar la llave de paso, sifón y flexible.',
    timestamp: '14:02',
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Hola, qué bueno. Te adjunto una foto bajo el lavamanos para que veas por dónde gotea.',
    timestamp: '14:05',
  },
  {
    id: 'msg-3',
    sender: 'user',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCX4YemX-W6wxmElDx83sEal5Ydj8ZTAQci2C-PMrQgmw3FO72b8Bvtt00COTK8CwST2K_2aH0QB_BTZzV_kn-uUBOJ0619_aOt3HJn-jXyz6kypwbkXk1MLpDeb5Z2trgM-fmCfR4ibkGz-bLVAPwUTM1erRzoNHb5HbOckkFs4JQI7Nhl3Jp7QZKwwDmTjhn2iRncaTJkI0lNJgADDFSVhqtQFRcdGuEddUvOf-AWb_HM3I44k5rG',
    imageCaption: 'Filtración bajo lavamanos',
    imageSize: '1.8 MB',
    timestamp: '14:06',
  },
  {
    id: 'msg-4',
    sender: 'maestro',
    text: 'Perfecto, por la foto parece flexible dañado o unión suelta. ¿Te parece si hablamos dos minutos para estimar materiales y coordinar acceso?',
    timestamp: '14:08',
  },
  {
    id: 'msg-5',
    sender: 'maestro',
    isCallWidget: true,
    callDuration: '3 min 12 seg · Finalizada',
    callAgreement: 'Acuerdo: visita coordinada para hoy 16:30',
    timestamp: '14:12',
  },
  {
    id: 'msg-6',
    sender: 'user',
    text: '¡Listo! Ya avisé en conserjería. Te espero con la llave de paso despejada.',
    timestamp: '14:15',
  },
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'Nueva respuesta de maestro',
    body: 'Visita técnica coordinada para hoy a las 16:30 hrs.',
    time: 'Hace 5 min',
    icon: 'plumbing',
    read: false,
    type: 'chat',
    actionPath: 'chat',
  },
  {
    id: 'notif-2',
    title: 'Cambios guardados',
    body: 'Tus preferencias y conversaciones quedaron actualizadas en este dispositivo.',
    time: 'Hace 12 min',
    icon: 'cloud_done',
    read: true,
    type: 'sync',
    actionPath: 'ajustes',
  },
  {
    id: 'notif-3',
    title: 'Nuevos maestros cerca',
    body: 'Hay nuevos perfiles verificados disponibles en tu comuna.',
    time: 'Hace 1 hora',
    icon: 'balance',
    read: true,
    type: 'quote',
    actionPath: 'maestros',
  },
];

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  previousTab: TabType;
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedMaestro: Maestro;
  setSelectedMaestro: (m: Maestro) => void;
  maestros: Maestro[];
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'dateText'>) => void;
  chatMessages: ChatMessage[];
  sendMessage: (text: string, imageUrl?: string) => void;
  notifications: PushNotification[];
  unreadNotifsCount: number;
  addNotification: (notif: Omit<PushNotification, 'id' | 'time' | 'read'>) => void;
  markNotificationsAsRead: () => void;
  activePushBanner: PushNotification | null;
  dismissPushBanner: () => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  cloudSyncState: 'synced' | 'syncing' | 'offline';
  triggerCloudSync: () => Promise<void>;
  isBiometricModalOpen: boolean;
  setIsBiometricModalOpen: (open: boolean) => void;
  biometricSuccessAction: (() => void) | null;
  requestBiometricAuth: (onSuccess: () => void) => void;
  isSOSModalOpen: boolean;
  setIsSOSModalOpen: (open: boolean) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  previewImage: string | null;
  setPreviewImage: (url: string | null) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<TabType>('explorar');
  const [previousTab, setPreviousTab] = useState<TabType>('explorar');
  const [role, setRole] = useState<UserRole>('cliente');
  const [selectedMaestro, setSelectedMaestro] = useState<Maestro>(INITIAL_MAESTROS[1]);
  const [maestros] = useState<Maestro[]>(INITIAL_MAESTROS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [activePushBanner, setActivePushBanner] = useState<PushNotification | null>(null);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [cloudSyncState, setCloudSyncState] = useState<'synced' | 'syncing' | 'offline'>('synced');

  // Modals
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState(false);
  const [biometricSuccessAction, setBiometricSuccessAction] = useState<(() => void) | null>(null);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // App Settings with localStorage fallback
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('shasky_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      darkMode: false,
      pushEnabled: true,
      soundEnabled: true,
      hapticsEnabled: true,
      biometricLogin: true,
      e2eEncryption: true,
      searchRadiusKm: 5,
      autoCloudSync: true,
      notifyNewQuotes: true,
      notifyChatMessages: true,
      notifySosAlerts: true,
      userCommune: 'Providencia, Santiago',
      fontSize: 'normal',
    };
  });

  // User Profile with localStorage fallback
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('shasky_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Camila Edwards',
      rut: '16.482.910-4',
      email: 'camila.edwards@gmail.com',
      phone: '+56 9 8412 9043',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCq7pKhESJfhxHNmhQn3ujvTfDu0BaO1SM-ckcuuw0Urf0xijeWFVR1cTeOHnYSUVplfZeXkkX1Aqao7cdo_UhDj6CqiLcOE_w4D0k3oUuCdAWt4JlAV8QG5Ja4YqKDaI14cYCMsSBB4Fuyy-gZvKKHnD9cTgvQvoBXjMnYXISZ7pc6uEHoEORwv_Up2dr5LfqELERXC5HxmLKwS1uuSYvXasWlFovCzLUQqsbAaabRMVyWaIk9Btqm',
      role: 'cliente',
      isLoggedIn: true,
      isVerified: true,
      lastCloudSync: 'Ahora mismo',
    };
  });

  // Keep dark mode synced to <html> class
  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('shasky_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('shasky_profile', JSON.stringify(profile));
  }, [profile]);

  const setActiveTab = (tab: TabType) => {
    setPreviousTab(activeTab);
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      triggerCloudSync();
      return updated;
    });
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      triggerCloudSync();
      return updated;
    });
  };

  const addReview = (reviewData: Omit<ReviewItem, 'id' | 'dateText'>) => {
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      dateText: 'Ahora mismo',
      ...reviewData,
    };
    setReviews((prev) => [newRev, ...prev]);
    addNotification({
      title: '¡Reseña publicada con éxito!',
      body: `Tu calificación de ${reviewData.rating.toFixed(1)} fue publicada correctamente.`,
      icon: 'star',
      type: 'quote',
      actionPath: 'mi-perfil',
    });
    triggerCloudSync();
  };

  const sendMessage = (text: string, imageUrl?: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text || undefined,
      imageUrl: imageUrl || undefined,
      imageCaption: imageUrl ? 'Adjunto de cliente' : undefined,
      timestamp: timeNow,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    triggerCloudSync();

    // Simulated reply for the local prototype.
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const replies = [
        '¡Entendido Camila! Voy con herramientas y algunos repuestos habituales para revisar en terreno.',
        'Perfecto, por lo que cuentas primero revisaría la unión y después te confirmo el valor de materiales.',
        'Excelente, ya registré el acceso. Llego puntual a las 16:30.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const maestroMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'maestro',
        text: randomReply,
        timestamp: replyTime,
      };

      setChatMessages((prev) => [...prev, maestroMsg]);

      // Push notification if enabled
      if (settings.notifyChatMessages) {
        addNotification({
          title: `${selectedMaestro.name} respondió`,
          body: randomReply,
          icon: 'chat',
          type: 'chat',
          actionPath: 'chat',
        });
      }
    }, 2200);
  };

  const addNotification = (notifData: Omit<PushNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      time: 'Ahora',
      read: false,
      ...notifData,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Show slide-down banner if push is enabled
    if (settings.pushEnabled) {
      setActivePushBanner(newNotif);
      // Auto dismiss banner after 5.5 seconds
      setTimeout(() => {
        setActivePushBanner((curr) => (curr?.id === newNotif.id ? null : curr));
      }, 5500);
    }
  };

  const dismissPushBanner = () => {
    setActivePushBanner(null);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const triggerCloudSync = async () => {
    setCloudSyncState('syncing');
    await new Promise((res) => setTimeout(res, 600));
    setCloudSyncState('synced');
    setProfile((p) => ({
      ...p,
      lastCloudSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  const requestBiometricAuth = (onSuccess: () => void) => {
    setBiometricSuccessAction(() => onSuccess);
    setIsBiometricModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        previousTab,
        role,
        setRole,
        selectedMaestro,
        setSelectedMaestro,
        maestros,
        reviews,
        addReview,
        chatMessages,
        sendMessage,
        notifications,
        unreadNotifsCount,
        addNotification,
        markNotificationsAsRead,
        activePushBanner,
        dismissPushBanner,
        settings,
        updateSettings,
        profile,
        updateProfile,
        cloudSyncState,
        triggerCloudSync,
        isBiometricModalOpen,
        setIsBiometricModalOpen,
        biometricSuccessAction,
        requestBiometricAuth,
        isSOSModalOpen,
        setIsSOSModalOpen,
        isVideoModalOpen,
        setIsVideoModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        previewImage,
        setPreviewImage,
        isNotificationsDrawerOpen,
        setIsNotificationsDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
