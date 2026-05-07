import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Moon, Bell, Shield, Globe, Palette, Monitor } from 'lucide-react';

// ─────────────────────────────────────────────────
// SETTINGS PAGE – User preferences
// ─────────────────────────────────────────────────

const settingSections = [
  {
    title: 'Appearance',
    icon: Palette,
    items: [
      { label: 'Theme', description: 'Choose dark or light mode', icon: Moon, value: 'Dark' },
      { label: 'Display', description: 'Adjust display density', icon: Monitor, value: 'Comfortable' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    items: [
      { label: 'Price Alerts', description: 'Get notified on price movements', icon: Bell, value: 'Enabled' },
      { label: 'Trade Confirmations', description: 'Receive trade execution alerts', icon: Bell, value: 'Enabled' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    items: [
      { label: 'Two-Factor Auth', description: 'Extra layer of account security', icon: Shield, value: 'Active' },
      { label: 'API Access', description: 'Manage API keys and permissions', icon: Globe, value: '2 Keys' },
    ],
  },
] as const;

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>Settings – Proton Finance</title>
        <meta name="description" content="Manage your account preferences and settings." />
      </Helmet>

      <motion.div
        className="space-y-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-proton-50 tracking-tight">Settings</h1>
          <p className="text-sm text-proton-500 mt-1">
            Manage your account preferences and configuration.
          </p>
        </div>

        {settingSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
          >
            <Card padding="lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4 text-proton-400" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-border-secondary/50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-surface-tertiary">
                        <item.icon className="h-4 w-4 text-proton-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-proton-100">{item.label}</div>
                        <div className="text-xs text-proton-500">{item.description}</div>
                      </div>
                    </div>
                    <Badge variant="default" size="sm">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <Card padding="lg" className="border-accent-rose/20">
          <CardHeader>
            <CardTitle className="text-accent-rose">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-proton-100">Delete Account</div>
                <div className="text-xs text-proton-500">
                  Permanently delete your account and all associated data.
                </div>
              </div>
              <Button variant="danger" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
