/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { NotificationBanner } from './components/NotificationBanner';
import { BiometricModal } from './components/BiometricModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { VideoDiagnosticModal } from './components/VideoDiagnosticModal';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { AuthModal } from './components/AuthModal';

import { ExplorarView } from './views/ExplorarView';
import { MaestrosView } from './views/MaestrosView';
import { PerfilView } from './views/PerfilView';
import { ChatView } from './views/ChatView';
import { MetricasView } from './views/MetricasView';
import { AjustesView } from './views/AjustesView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'explorar':
        return <ExplorarView />;
      case 'maestros':
        return <MaestrosView />;
      case 'mi-perfil':
        return <PerfilView />;
      case 'chat':
        return <ChatView />;
      case 'metricas':
        return <MetricasView />;
      case 'ajustes':
        return <AjustesView />;
      default:
        return <ExplorarView />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f4fb] dark:bg-[#030712] flex justify-center selection:bg-[#79f7e3] selection:text-[#00201c] transition-colors duration-200">
      {/* Mobile/Tablet Centered Frame Container */}
      <div className="w-full max-w-2xl bg-[#faf8ff] dark:bg-[#070d18] text-[#001026] dark:text-[#eef0ff] min-h-screen flex flex-col relative shadow-2xl border-x border-[#eaedff]/60 dark:border-[#1e293b]/60">
        {/* Top App Bar & Status Header */}
        <Navbar />

        {/* Dynamic Screen View */}
        <main className="flex-1 w-full flex flex-col">{renderCurrentView()}</main>

        {/* Bottom Tab Navigation Bar */}
        <BottomNav />

        {/* Global Floating Modals & Toasts */}
        <NotificationBanner />
        <BiometricModal />
        <EmergencySOSModal />
        <VideoDiagnosticModal />
        <ImagePreviewModal />
        <AuthModal />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
