export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    age?: number;

    // Social media accounts
    socialAccounts: {
        youtube?: SocialAccount;
        tiktok?: SocialAccount;
        instagram?: SocialAccount;
        facebook?: SocialAccount;
        snapchat?: SocialAccount;
        twitter?: SocialAccount;
        linkedin?: SocialAccount;
    };

    // Stats
    totalFollowers: number;
    avgViewsPerPost: number;
    newFollowersLast30Days: number;
    avgViewsLast30Days: number;
    engagementStatus: 'high' | 'medium' | 'low';

    // Links
    links?: UserLink[];
}

export interface SocialAccount {
    username: string;
    followers: number;
    connected: boolean;
    platform: SocialPlatform;
}

export type SocialPlatform =
    | 'youtube'
    | 'tiktok'
    | 'instagram'
    | 'facebook'
    | 'snapchat'
    | 'twitter'
    | 'linkedin'
    | 'twitch'
    | 'kick';

export interface UserLink {
    id: string;
    title: string;
    url: string;
}

export interface Deal {
    id: string;
    businessName: string;
    businessIcon?: string;
    companyBanner?: string; // New: Banner image
    companyBio?: string;    // New: Company bio
    category: string;
    totalAmount: number;
    description: string;
    status: 'available' | 'active' | 'completed' | 'cancelled';

    // Milestones
    milestones: Milestone[];
    currentMilestoneIndex: number;
    overallProgress: number; // 0-100

    // Dates
    createdAt: Date;
    startedAt?: Date;
    completedAt?: Date;
}

export interface Milestone {
    id: string;
    title: string;
    description: string;
    paymentAmount: number;
    deadline?: Date; // New: Task deadline
    completed: boolean;
    completedAt?: Date;
}

export interface Message {
    id: string;
    dealId: string;
    senderId: string;
    senderName: string;
    senderType: 'user' | 'brand';
    content: string;
    timestamp: Date;
    read: boolean;
}

export interface ChatThread {
    id: string;
    dealId: string;
    businessName: string;
    businessIcon?: string;
    category: string; // New
    lastMessage: Message;
    unreadCount: number;
}

// Navigation types
export type RootStackParamList = {
    GetStarted: undefined;
    Auth: undefined;
    Terms: undefined;
    Privacy: undefined;
    Onboarding: undefined;
    MainApp: undefined;
    Settings: undefined;
    Statements: undefined;
    QRCode: undefined;
    DealDetail: { deal: Deal };
    Withdraw: undefined;
    WithdrawSuccess: { method: 'bank' | 'paypal' | 'instant' };
    Chat: { threadId: string; businessName: string; businessIcon?: string, category: string }; // New
};

export type MainTabParamList = {
    Hub: undefined;
    Discover: undefined;
    Messages: undefined;
    Profile: undefined;
};

// Onboarding types
export interface OnboardingStep {
    id: string;
    type: 'age' | 'social-connect' | 'content-type' | 'brand-preference' | 'custom';
    title: string;
    subtitle?: string;
    component?: string;
    options?: string[]; // For selection steps
    multiSelect?: boolean;
    minSelection?: number;
}
