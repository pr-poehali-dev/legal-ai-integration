import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import LibrarySection from '@/components/LibrarySection';
import AIAssistant from '@/components/AIAssistant';
import MonitoringSection from '@/components/MonitoringSection';
import StrategiesSection from '@/components/StrategiesSection';
import IntegrationsSection from '@/components/IntegrationsSection';
import CabinetSection from '@/components/CabinetSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AnalyticsSection />
      <LibrarySection />
      <AIAssistant />
      <MonitoringSection />
      <StrategiesSection />
      <IntegrationsSection />
      <CabinetSection />
      <FooterSection />
    </div>
  );
};

export default Index;
